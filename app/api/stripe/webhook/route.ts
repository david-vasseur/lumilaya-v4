import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { prisma } from "@/lib/prisma/prisma";
import { sendOrderEmailToCompany } from "@/lib/action/order.action";
import { Prisma } from "@/lib/generated/prisma/client";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-02-25.clover",
});

export async function POST(req: NextRequest) {
    const sig = req.headers.get("stripe-signature");

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
        const products = JSON.parse(metadata.products);
        const shipping = JSON.parse(metadata.shipping);

        // Enregistrer la commande dans la BDD
        const order = await prisma.order.create({
            data: {
                stripeSessionId: session.id,
                firstName: metadata.firstName,
                lastName: metadata.lastName,
                email: metadata.email,
                phone: metadata.phone,
                shippingAddress: metadata.shippingAddress,
                billingAddress: metadata.shippingAddress,
                shippingCity: metadata.shippingCity,
                billingCity: metadata.shippingCity,
                shippingPostalCode: metadata.shippingPostalCode,
                billingPostalCode: metadata.shippingPostalCode,
                shippingCountry: metadata.shippingCountry,
                billingCountry: metadata.shippingCountry,
                shippingType: shipping.type,
                shippingPrice: new Prisma.Decimal(shipping.price),
                acceptCGV: true,
                total: session.amount_total! / 100,
                createdAt: new Date(),
                items: {
                create: products.map((p: any) => ({
                    name: p.name,
                    price: p.price,
                    qty: p.qty,
                })),
                },
            },
        });

        // Envoie de l'email
        try {
            await sendOrderEmailToCompany(order, products);
            console.log("Email envoyé avec succès");
        } catch (err) {
            console.error("Erreur lors de l'envoi de l'email:", err);
        }
    }

    return NextResponse.json({ received: true });
}
