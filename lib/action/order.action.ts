"use server"

import { OrderEmailData } from "@/types/orderEmail";
import { OrderProduct } from "@/types/orderProduct";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

export const sendOrderEmailToCompany = async (order: OrderEmailData, products: OrderProduct[]) => {
    const productsListHtml = products
        .map(
            (p) => `
            <li style="margin-bottom: 10px;">
                <strong>${p.qty} x ${p.name}</strong> — ${p.price}€
                ${
                    p.options?.length
                        ? `<div style="font-size: 12px; color: #666; margin-top: 4px;">
                            <strong>Parfums :</strong> ${p.options.join(" • ")}
                           </div>`
                        : ""
                }
            </li>`
        )
        .join("");

    // 1. E-mail interne pour Lumilaya
    const companyHtml = `
        <html>
            <body style="font-family: Arial, sans-serif; background-color: #f7f7f7; padding: 20px;">
                <div style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.1); padding: 20px;">
                    <h1 style="color: #FF6600; text-align: center;">Nouvelle commande #${order.stripeSessionId}</h1>
                    <p style="font-size: 16px; color: #333;">Bonjour, une nouvelle commande a été passée :</p>

                    <h2 style="font-size: 18px; margin-top: 20px; color: #333;">Détails du client</h2>
                    <p style="margin: 4px 0;"><strong>Nom :</strong> ${order.firstName} ${order.lastName}</p>
                    <p style="margin: 4px 0;"><strong>Email :</strong> ${order.email}</p>
                    <p style="margin: 4px 0;"><strong>Téléphone :</strong> ${order.phone || "Non renseigné"}</p>

                    <h2 style="font-size: 18px; margin-top: 20px; color: #333;">Détails de la commande</h2>
                    <p style="margin: 4px 0;"><strong>Total :</strong> ${order.total}€</p>
                    <ul style="padding-left: 20px; color: #333;">
                        ${productsListHtml}
                    </ul>

                    <h2 style="font-size: 18px; margin-top: 20px; color: #333;">Adresse de livraison</h2>
                    <p style="margin: 4px 0;">${order.shippingAddress}</p>
                    <p style="margin: 4px 0;">${order.shippingPostalCode} ${order.shippingCity}</p>
                    <p style="margin: 4px 0;">${order.shippingCountry}</p>

                    <p style="text-align: center; margin-top: 30px; font-size: 12px; color: #999;">
                        Ceci est un email automatique, merci de ne pas répondre.
                    </p>
                </div>
            </body>
        </html>
    `;

    // 2. E-mail de confirmation client (aux couleurs Lumilaya)
    const clientHtml = `
        <html>
            <body style="font-family: Arial, sans-serif; background-color: #FDFBF7; padding: 20px; color: #2C2C2C;">
                <div style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 12px; border: 1px solid #EAE5DC; padding: 28px;">
                    <h1 style="color: #5A7B6E; text-align: center; font-size: 24px; margin-bottom: 8px;">Merci pour votre commande, ${order.firstName} ✨</h1>
                    <p style="font-size: 15px; color: #555; text-align: center; margin-top: 0;">
                        Votre commande <strong>#${order.stripeSessionId}</strong> a bien été enregistrée. Nous préparons vos créations artisanales avec le plus grand soin.
                    </p>

                    <hr style="border: none; border-top: 1px solid #EAE5DC; margin: 24px 0;" />

                    <h2 style="font-size: 16px; color: #2C2C2C;">Récapitulatif de votre commande</h2>
                    <ul style="padding-left: 20px; color: #333; font-size: 14px;">
                        ${productsListHtml}
                    </ul>
                    <p style="font-size: 16px; margin-top: 16px;"><strong>Total réglé :</strong> ${order.total}€</p>

                    <h2 style="font-size: 16px; margin-top: 24px; color: #2C2C2C;">Adresse de livraison</h2>
                    <p style="margin: 4px 0; font-size: 14px; color: #444;">
                        ${order.firstName} ${order.lastName}<br />
                        ${order.shippingAddress}<br />
                        ${order.shippingPostalCode} ${order.shippingCity}<br />
                        ${order.shippingCountry}
                    </p>

                    <p style="text-align: center; margin-top: 32px; font-size: 12px; color: #888;">
                        Une question sur votre commande ? Répondez simplement à cet e-mail.<br />
                        <strong>Lumi'laya</strong> — Bougies naturelles artisanales
                    </p>
                </div>
            </body>
        </html>
    `;

    const [companyResult, clientResult] = await Promise.allSettled([
        resend.emails.send({
            from: "Commandes <no-reply@lumilaya.fr>",
            to: ["entreprise.lumilaya@outlook.fr"],
            subject: `Nouvelle commande #${order.stripeSessionId}`,
            html: companyHtml,
        }),
        resend.emails.send({
            from: "Lumi'laya <no-reply@lumilaya.fr>",
            replyTo: "entreprise.lumilaya@outlook.fr",
            to: [order.email],
            subject: `Confirmation de votre commande Lumi'laya #${order.stripeSessionId}`,
            html: clientHtml,
        }),
    ]);

    if (companyResult.status === "rejected") {
        console.error("Erreur envoi mail entreprise :", companyResult.reason);
    }
    if (clientResult.status === "rejected") {
        console.error("Erreur envoi mail client :", clientResult.reason);
    }
};
