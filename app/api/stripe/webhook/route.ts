import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { prisma } from "@/lib/prisma/prisma";
import { sendOrderEmailToCompany } from "@/lib/action/order.action";
import { Prisma, ShippingType } from "@/lib/generated/prisma/client";

type ServerItem = {
	productId: number;
	variantId: number;
	qty: number;
	name: string;
    price: number;
    options?: string[];
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-02-25.clover",
});

export async function POST(req: NextRequest) {
    const sig = req.headers.get("stripe-signature");

    const ALLOWED_OPTIONS = [
        "Harmonie",
        "Vitalité",
        "Tendresse",
        "Douceur",
        "Magie"
    ];

    if (!sig) {
        return NextResponse.json({ error: "Missing signature" }, { status: 400 });
    }

    const body = await req.text();

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(
        body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET!
        );
    } catch (err) {
        console.error("Webhook signature error", err);
        return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    if (event.type === "checkout.session.completed") {
        const session = event.data.object as Stripe.Checkout.Session;

        const metadata = session.metadata!;
        const metadataProducts: ServerItem[] = JSON.parse(metadata.products);

        // Enregistrer la commande dans la BDD
        const orderItemsForPrisma = metadataProducts.map(p => ({
            name: p.name || `Produit ${p.productId}`,
            price: new Prisma.Decimal(p.price),
            quantity: p.qty,
            productId: p.productId,
            variantId: p.variantId,
            options: Array.isArray(p.options) ? p.options.filter(opt => ALLOWED_OPTIONS.includes(opt)).slice(0, 4) : []
        }));

        const orderForEmail = orderItemsForPrisma.map(({ name, price, quantity, options }) => ({
            name,
            price: Number(price),
            qty: quantity,
            options
        }));

        const order = await prisma.order.create({
            data: {
                stripeSessionId: metadata.orderId,
                firstName: metadata.firstName,
                lastName: metadata.lastName,
                email: metadata.email,
                phone: metadata.phone,
                shippingAddress: metadata.shippingAddress,
                billingAddress: metadata.billingAddress,
                shippingCity: metadata.shippingCity,
                billingCity: metadata.billingCity,
                shippingPostalCode: metadata.shippingPostalCode,
                billingPostalCode: metadata.billingPostalCode,
                shippingCountry: metadata.shippingCountry,
                billingCountry: metadata.billingCountry,
                shippingType: metadata.shippingType as ShippingType,
                shippingPrice: new Prisma.Decimal(JSON.parse(metadata.shipping).price / 100),
                acceptCGV: true,
                total: new Prisma.Decimal(session.amount_total! / 100),
                createdAt: new Date(),
                items: { create: orderItemsForPrisma },
            },
            });

        // Envoie de l'email
        try {
            await sendOrderEmailToCompany(order, orderForEmail);
            console.log("Email envoyé avec succès");
        } catch (err) {
            console.error("Erreur lors de l'envoi de l'email:", err);
        }
    }

    return NextResponse.json({ received: true });
}
