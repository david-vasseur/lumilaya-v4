"use server"

import { OrderEmailData } from "@/types/orderEmail";
import { OrderProduct } from "@/types/orderProduct";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

export const sendOrderEmailToCompany = async (order: OrderEmailData, products: OrderProduct[]) => {

    const html = `
        <html>
            <body style="font-family: Arial, sans-serif; background-color: #f7f7f7; padding: 20px;">
                <div style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.1); padding: 20px;">
                <h1 style="color: #FF6600; text-align: center;">Nouvelle commande #${order.id}</h1>
                <p style="font-size: 16px; color: #333;">Bonjour, une nouvelle commande a été passée :</p>

                <h2 style="font-size: 18px; margin-top: 20px; color: #333;">Détails du client</h2>
                <p style="margin: 4px 0;"><strong>Nom :</strong> ${order.firstName} ${order.lastName}</p>
                <p style="margin: 4px 0;"><strong>Email :</strong> ${order.email}</p>
                <p style="margin: 4px 0;"><strong>Téléphone :</strong> ${order.phone || "Non renseigné"}</p>

                <h2 style="font-size: 18px; margin-top: 20px; color: #333;">Détails de la commande</h2>
                <p style="margin: 4px 0;"><strong>Total :</strong> ${order.total}€</p>
                <ul style="padding-left: 20px; color: #333;">
                    ${products.map(p => `<li>${p.qty} x ${p.name} : ${p.price}€</li>`).join('')}
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


    await resend.emails.send({
        from: "Commandes <contact@david-vasseur.fr>",
        to: ["entreprise.lumilaya@outlook.fr"],
        subject: `Nouvelle commande #${order.id}`,
        html
    });
}