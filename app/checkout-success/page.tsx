import Link from "next/link";
import { clientCheckout } from "@/lib/action/checkout.action";
import ClearCart from "@/components/features/other/ClearCart";
import { CheckCircle2, Mail, ArrowRight, Sparkles, AlertCircle } from "lucide-react";

export default async function CheckoutSuccessPage({
    searchParams,
}: {
    searchParams: Promise<{ session_id?: string }>;
}) {
    const params = await searchParams;
    const sessionId = params?.session_id;

    if (sessionId) {
        const { orderId, customerName, amountTotal } = await clientCheckout(sessionId);
        const amountTotalEuro = (amountTotal / 100).toFixed(2).replace(".", ",");

        return (
            <main className="min-h-screen w-full bg-[#FDFBF7] text-[#2C2C2C] flex items-center justify-center px-4 pt-28 pb-16">
                <div className="w-full max-w-xl bg-white rounded-3xl border border-[#EAE5DC] shadow-sm p-8 sm:p-10 text-center space-y-6">
                    {/* Icône de validation */}
                    <div className="mx-auto w-16 h-16 rounded-full bg-[#7A9B8E]/15 text-[#5A7B6E] flex items-center justify-center">
                        <CheckCircle2 className="w-9 h-9" />
                    </div>

                    {/* Titre & message de remerciement */}
                    <div className="space-y-2">
                        <p className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-[#7A9B8E]">
                            <Sparkles className="w-3.5 h-3.5" />
                            Paiement confirmé
                        </p>
                        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#2C2C2C]">
                            Merci pour votre commande{customerName ? `, ${customerName}` : ""}
                        </h1>
                        <p className="text-sm sm:text-base text-[#2C2C2C]/75 leading-relaxed">
                            Votre règlement a bien été validé. Nous préparons vos créations artisanales avec soin.
                        </p>
                    </div>

                    {/* Récapitulatif commande */}
                    <div className="bg-[#FDFBF7] rounded-2xl border border-[#EAE5DC] p-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
                        <div className="text-center sm:text-left">
                            <span className="block text-xs uppercase tracking-wider text-[#2C2C2C]/50">
                                Numéro de commande
                            </span>
                            <span className="font-mono font-semibold text-[#2C2C2C] break-all">
                                #{orderId}
                            </span>
                        </div>

                        <div className="h-px w-full sm:h-8 sm:w-px bg-[#EAE5DC]" />

                        <div className="text-center sm:text-right">
                            <span className="block text-xs uppercase tracking-wider text-[#2C2C2C]/50">
                                Montant réglé
                            </span>
                            <span className="text-lg font-bold text-[#5A7B6E]">
                                {amountTotalEuro} €
                            </span>
                        </div>
                    </div>

                    {/* Encart confirmation email + rappel spam */}
                    <div className="rounded-2xl bg-[#7A9B8E]/10 border border-[#7A9B8E]/25 p-4 flex items-start gap-3.5 text-left">
                        <div className="w-9 h-9 rounded-xl bg-white text-[#5A7B6E] flex items-center justify-center shrink-0 shadow-2xs">
                            <Mail className="w-4 h-4" />
                        </div>
                        <div className="space-y-1 text-xs sm:text-sm">
                            <p className="font-semibold text-[#2C2C2C]">
                                Un e-mail de confirmation vient de vous être envoyé
                            </p>
                            <p className="text-[#2C2C2C]/70 leading-relaxed">
                                Vous y retrouverez le détail complet de votre commande. Si vous ne le voyez pas d&apos;ici quelques minutes, pensez à vérifier votre dossier{" "}
                                <strong className="font-semibold text-[#2C2C2C]">Spams / Courriers indésirables</strong>.
                            </p>
                        </div>
                    </div>

                    {/* CTA retour boutique */}
                    <div className="pt-2">
                        <Link
                            href="/"
                            className="inline-flex items-center justify-center gap-2 bg-[#5A7B6E] hover:bg-[#4A6B5E] text-[#FDFBF7] font-medium text-sm px-8 py-3.5 rounded-full transition-colors duration-300 shadow-xs"
                        >
                            <span>Retour à la boutique</span>
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>

                    <ClearCart />
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen w-full bg-[#FDFBF7] text-[#2C2C2C] flex items-center justify-center px-4 pt-28 pb-16">
            <div className="w-full max-w-md bg-white rounded-3xl border border-[#EAE5DC] shadow-sm p-8 text-center space-y-5">
                <div className="mx-auto w-14 h-14 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center">
                    <AlertCircle className="w-7 h-7" />
                </div>
                <div className="space-y-1.5">
                    <h1 className="text-xl font-bold text-[#2C2C2C]">
                        Paiement introuvable
                    </h1>
                    <p className="text-sm text-[#2C2C2C]/70">
                        Aucune session de paiement valide n&apos;a été détectée.
                    </p>
                </div>
                <Link
                    href="/"
                    className="inline-flex items-center justify-center gap-2 bg-[#5A7B6E] hover:bg-[#4A6B5E] text-[#FDFBF7] font-medium text-sm px-7 py-3 rounded-full transition-colors"
                >
                    <span>Retour à l&apos;accueil</span>
                    <ArrowRight className="w-4 h-4" />
                </Link>
            </div>
        </main>
    );
}
