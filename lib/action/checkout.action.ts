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

// export const getPricesForStripe = async (items: CartItem[]) => {
// 	const results = await Promise.all(
// 		items.map(async (item) => {
// 			const product = await prisma.product.findUnique({
// 				where: { id: item.id },
// 				select: {
// 				meta: {
// 					select: {
// 					promo: true,
// 					},
// 				},
// 				variants: {
// 					where: { id: item.productId },
// 					select: {
// 					price: true,
// 					},
// 				},
// 				},
// 			})

// 			if (!product) {
// 				throw new Error(`Produit introuvable: ${item.id}`);
// 			}

// 			const variant = product.variants[0];

// 			if (!variant) {
// 				throw new Error("Variant introuvable");
// 			}

// 			const price = variant.price.toNumber();
// 			const promo = product.meta.promo ?? 0;

// 			const discountFactor = Math.max(0, 1 - promo / 100);

// 			const unitPrice = Math.round(price * discountFactor * 100);

// 			return {
// 				productId: item.id,
// 				qty: item.qty,
// 				price: unitPrice,
// 			}
// 		})
// 	)

// 	return results;
// }


export const getPricesForStripe = async (items: CartItem[]) => {
	const results = await Promise.all(
		items.map(async (item) => {
		const product = await prisma.product.findUnique({
			where: { id: item.id },
			select: {
			meta: { select: { name: true, promo: true } },
			variants: { 
				where: { id: item.productId },
				select: { id: true, price: true },
			},
			},
		});

		if (!product) throw new Error(`Produit introuvable: ${item.id}`);
		const variant = product.variants[0];
		if (!variant) throw new Error("Variant introuvable");

		const price = variant.price.toNumber();
		const promo = product.meta.promo ?? 0;
		const discountFactor = Math.max(0, 1 - promo / 100);
		const unitPrice = Math.round(price * discountFactor * 100); // en euros

		return {
			productId: item.id,
			variantId: variant.id,        // ⚡ ajouter variantId
			qty: item.qty,
			price: unitPrice,             // en euros, Decimal-friendly
			name: product.meta.name,      // ⚡ ajouter name pour Prisma
		};
		})
	);

	return results;
};


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
		console.log(securePrices);
		

		if (!securePrices.length) {
			throw new Error("Panier invalide.");
		}

		const totalProducts = securePrices.reduce((acc, item) => acc + item.price * item.qty, 0);



		// 2️⃣ Recalculer le shipping côté serveur ////////////
		const isFreeShipping = customer.shippingCountry === "FR" && totalProducts > 5000

		let shippingPrice = 0

		if (!isFreeShipping) {
			shippingPrice = await getShippingPrice(customer.shippingCountry, customer.shippingType)
		}

		const shippingLineItem = {
			name: isFreeShipping ? "Livraison offerte" : "Livraison",
			price: Math.round(shippingPrice * 100),
		}
		console.log(shippingLineItem);

		

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
				shippingType: customer.shippingType,
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

///////////// RECUPERER LES INFOS DE LA COMMANDE POUR LE CLIENT //////////////////


export async function clientCheckout(session_id: string) {
	try {
		if (!session_id) {
		throw new Error("Session ID manquant");
		}

		// Récupération de la session
		const session = await stripe.checkout.sessions.retrieve(session_id, {
		expand: ["line_items"], // pour récupérer les produits commandés
		});

		// Numéro de commande : à récupérer depuis metadata ou client_reference_id
		const orderId =
		(session.metadata && session.metadata.order_id) ||
		session.client_reference_id ||
		null;

		// Nom du client
		const customerName = session.customer_details?.name || "Client inconnu";

		// Montant payé (en centimes)
		const amountTotal = session.amount_total || 0;

		// Produits commandés
		const lineItems =
		session.line_items?.data.map((item) => ({
			name: item.description,
			quantity: item.quantity,
			price: item.price?.unit_amount,
		})) || [];

		return {
		orderId,
		customerName,
		amountTotal,
		lineItems,
		};
	} catch (err: any) {
		console.error("❌ Erreur dans clientCheckout :", err?.message ?? err);
		return {
		orderId: null,
		customerName: "Erreur",
		amountTotal: 0,
		lineItems: [],
		};
	}
}