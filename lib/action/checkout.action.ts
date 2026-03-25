"use server"

import Stripe from "stripe";
import { headers } from "next/headers";
import { prisma } from "../prisma/prisma";
import { CartItem } from "../store/cartStore";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2026-02-25.clover",
});

type PricePerProduct = {
	productId: number;
	variantId: number;
	price: number; 
	qty: number;
};

type CustomerInfo = {
	firstName: string;
	lastName: string;
	email: string;
	phone?: string;
	shippingAddress: string;
	shippingCity: string;
	shippingPostalCode: string;
	shippingCountry: string;
	shippingType: "OFF" | "DOM" | "REL";
	billingAddress: string;
	billingCity: string;
	billingPostalCode: string;
	billingCountry: string;
	acceptCGV: boolean;
};

type ServerItem = {
	productId: number;
	variantId: number;
	qty: number;
	name: string;
};

////////////////////// OBTENIR PRIX DE LIVRAISON ///////////////////////////

export const getShippingPrice = async (zone: string, type: "OFF" | "DOM" | "REL") => {
	
	const price = await prisma.shippingPrice.findFirst({
		where: {
			zone: zone,
			shippingType: type
		}
	})

	return Number(price?.price) ?? 0;
}


////////////////////// OBTENIR LE TOTAL DU PANIER AVEC PROMO A PARTIR DU SERVEUR ///////////////////////////

export const getPricesForStripe = async (items: CartItem[]) => {
	const results = await Promise.all(
		items.map(async (item) => {
			const product = await prisma.product.findUnique({
				where: { id: item.id },
				select: {
				meta: {
					select: {
					promo: true,
					},
				},
				variants: {
					where: { id: item.productId },
					select: {
					price: true,
					},
				},
				},
			})

			if (!product) {
				throw new Error(`Produit introuvable: ${item.id}`);
			}

			const variant = product.variants[0];

			if (!variant) {
				throw new Error("Variant introuvable");
			}

			const price = variant.price.toNumber();
			const promo = product.meta.promo ?? 0;

			const discountFactor = Math.max(0, 1 - promo / 100);

			const finalPrice = Math.round(price * item.qty * discountFactor * 100);

			return {
				productId: item.id,
				qty: item.qty,
				price: finalPrice,
			}
		})
	)

	return results;
}



////////////////////// VALIDER LE CHECKOUT ///////////////////////////

export async function handleCheckout(clientItems: CartItem[], customer: CustomerInfo) {
	try {

		const h = await headers();
		const ipRaw = (h.get("x-forwarded-for") || h.get("x-real-ip") || "0.0.0.0").split(",")[0].trim();

		// try {
		// 	await rateLimiter.consume(ipRaw); // Throws si dépasse le quota
		// } catch (rejRes) {
		// 	console.warn("Rate limit atteint pour", ipRaw);
		// 	return { url: null, error: "Trop de requêtes, essayez plus tard." };
		// }


		if (!clientItems || clientItems.length === 0) {
			throw new Error("Le panier est vide.");
		}

		// 1️⃣ Recalculer TOUS les prix côté serveur ////////////
		const securePrices = await getPricesForStripe(clientItems);
		if (!securePrices.length) {
			throw new Error("Panier invalide.");
		}

		const totalProducts = securePrices.reduce((acc, item) => acc + item.price, 0);



		// 2️⃣ Recalculer le shipping côté serveur ////////////
		const isFreeShipping = customer.shippingCountry === "FR" && totalProducts > 500

		let shippingPrice = 0

		if (!isFreeShipping) {
			shippingPrice = await getShippingPrice(customer.shippingCountry, customer.shippingType)
		}

		const shippingLineItem = {
			name: isFreeShipping ? "Livraison offerte" : "Livraison",
			price: shippingPrice * 100,
		}
		// const shippingResult = await AddShippingPrice(customer.shippingCountry, totalProducts);
		// let shippingLineItem = { name: "", price: 0 };

		// if (shippingResult.status === "free") {
		// 	shippingLineItem = { name: shippingResult.shipping?.name ?? "Livraison", price: 0 };
		// } else if (shippingResult.status === "not free" && shippingResult.shipping) {
		// 	shippingLineItem = {
		// 		name: shippingResult.shipping.name,
		// 		price: shippingResult.shipping.price,
		// 	};
		// } else {
		// 	throw new Error("Impossible de calculer la livraison.");
		// }



		// 3️⃣ Récupérer les produits pour Stripe
		const productIds = securePrices.map((p) => p.productId);
		const products = await prisma.product.findMany({
			where: { id: { in: productIds } },
			select: { 
				id: true,
				meta: {
					select: {
						name: true
					}
				}
			},
		});

		const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [
		...securePrices.map((item) => {
			const product = products.find((p) => p.id === item.productId);
			const productName = product ? `Bougie ${product.meta.name}` : `Produit ${item.productId}`;
			return {
				price_data: {
					currency: "eur",
					product_data: { name: productName },
					unit_amount: item.price,
				},
				quantity: item.qty,
			};
		}),
		{
			price_data: {
			currency: "eur",
			product_data: { name: shippingLineItem.name },
			unit_amount: shippingLineItem.price,
			},
			quantity: 1,
		},
		];

		const orderId = `ORD-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;




		// 4️⃣ Créer la session Stripe
		const session = await stripe.checkout.sessions.create({
			payment_method_types: ["card"],
			line_items: lineItems,
			mode: "payment",
			allow_promotion_codes: true,
			success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout-success?session_id={CHECKOUT_SESSION_ID}`,
			cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout-cancel`,
			client_reference_id: orderId,
			customer_email: customer.email,
			metadata: {
				firstName: customer.firstName,
				lastName: customer.lastName,
				email: customer.email,
				phone: customer.phone || "",
				shippingAddress: customer.shippingAddress,
				shippingCity: customer.shippingCity,
				shippingPostalCode: customer.shippingPostalCode,
				shippingCountry: customer.shippingCountry,
				billingAddress: customer.billingAddress,
				billingCity: customer.billingCity,
				billingPostalCode: customer.billingPostalCode,
				billingCountry: customer.billingCountry,
				products: JSON.stringify(securePrices),
				shipping: JSON.stringify(shippingLineItem),
			},
		});

		return { url: session.url };
	} catch (err: any) {
		console.error("❌ Erreur dans handleCheckout :", err?.message ?? err);
		return { url: null };
	}
}