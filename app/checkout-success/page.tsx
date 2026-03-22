import Link from "next/link";
import { clientCheckout } from "../components/features/form/CheckOut.action";
import ClearCart from "../components/features/ClearCart";

export default async function CheckoutSuccessPage({
    searchParams,
    }: {
    searchParams: { session_id?: string };
    }) {
    const params = await searchParams;
    const sessionId = params?.session_id;

    if (sessionId) {
        const { orderId, customerName, amountTotal } = await clientCheckout(sessionId);
        const amountTotalEuro = (amountTotal / 100).toFixed(2);

        return (
            <div className="h-screen w-screen flex flex-col gap-10 items-center justify-center">
                <h1 className="text-4xl text-gray-600">✅ Paiement confirmé</h1>
                <p className="text-2xl text-gray-600">Merci pour votre commande Mme/Mr {customerName}</p>
                <p className="text-2xl text-gray-600">
                    Le paiement de la commande <strong>{orderId}</strong> de <strong>{amountTotalEuro} €</strong> a bien été validé.
                </p>
                <Link href={"/"} className="bg-gray-300 px-6 py-3 rounded-lg shadow-2xl text-gray-600">Retour à l'accueil</Link>
                <ClearCart />
            </div>
        );
    }

    

    if (!sessionId) {
        return (
            <div className="h-screen flex flex-col gap-10 items-center justify-center">
                <p className="text-2xl text-gray-600">Paiement introuvable.</p>
                <Link href={"/"} className="bg-gray-300 px-6 py-3 rounded-lg shadow-2xl text-gray-600">Retour à l'accueil</Link>
            </div>
        )

    }
}
