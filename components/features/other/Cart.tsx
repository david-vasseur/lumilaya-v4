"use client"

import { useCartStore } from "@/lib/store/cartStore";
import Link from "next/link";
import { useModalStore } from "@/lib/store/modalStore";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import CartItem from "@/components/ui/CarItem";
import ShipItem from "@/components/ui/ShipItem";
import { 
    ShoppingBag, 
    ArrowRight, 
    Sparkles, 
    Lock, 
    Truck,
    CheckCircle2
} from "lucide-react";

// Seuil de livraison offerte (à ajuster selon tes règles métier)
const FREE_SHIPPING_THRESHOLD = 65;

function Cart() {
    const [totalwithShip, setTotalWithShip] = useState<number>(0);
    const { items, ship, total } = useCartStore();
    const { closeModal, isOpen } = useModalStore();
    const path = usePathname();

    const subtotal = total();
    const totalArticlesCount = items.reduce((acc, i) => acc + i.qty, 0);
    const remainingForFreeShip = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
    const progressPercent = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);

    useEffect(() => {
        if (ship.shipping) {
            setTotalWithShip(total() + ship.fee);
        } else {
            setTotalWithShip(total());
        }
    }, [ship.shipping, ship.fee, total, items]);

    return (
        <div className="flex flex-col max-h-[85dvh] w-full overflow-hidden text-[#2C2C2C]">
            
            {/* 1. EN-TÊTE FIXE */}
            <div className="shrink-0 space-y-3 pb-3 border-b border-[#2C2C2C]/10">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-[#7A9B8E]/15 text-[#5A7B6E] flex items-center justify-center">
                            <ShoppingBag className="w-4 h-4" />
                        </div>
                        <div>
                            <h2 className="text-base sm:text-lg font-semibold tracking-tight text-[#2C2C2C]">
                                Mon panier
                            </h2>
                        </div>
                    </div>

                    <span className="text-xs font-medium px-3 py-1 rounded-full bg-[#7A9B8E]/12 text-[#5A7B6E]">
                        {totalArticlesCount} {totalArticlesCount > 1 ? "créations" : "création"}
                    </span>
                </div>

                {/* BARRE DE PROGRESSION LIVRAISON OFFERTE */}
                {items.length > 0 && (
                    <div className="bg-[#FDFBF7] border border-[#7A9B8E]/25 rounded-xl p-3 space-y-2">
                        <div className="flex items-center gap-2 text-xs">
                            {remainingForFreeShip === 0 ? (
                                <>
                                    <CheckCircle2 className="w-4 h-4 text-[#5A7B6E] shrink-0" />
                                    <span className="font-medium text-[#34423d]">
                                        Félicitations ! Vous bénéficiez d'un{" "}
                                        <strong className="font-semibold text-[#5A7B6E]">
                                            cadeau offert !!!
                                        </strong>
                                    </span>
                                </>
                            ) : (
                                <>
                                    <Truck className="w-4 h-4 text-[#7A9B8E] shrink-0" />
                                    <span className="text-[#2C2C2C]/80">
                                        Plus que{" "}
                                        <strong className="font-semibold text-[#2C2C2C]">
                                            {remainingForFreeShip.toFixed(2)} €
                                        </strong>{" "}
                                        pour obtenir votre cadeau
                                    </span>
                                </>
                            )}
                        </div>

                        {/* Jauge */}
                        <div className="w-full h-1.5 bg-[#7A9B8E]/15 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-[#7A9B8E] to-[#5A7B6E] rounded-full transition-all duration-500 ease-out"
                                style={{ width: `${progressPercent}%` }}
                            />
                        </div>
                    </div>
                )}
            </div>

            {/* 2. ZONE SCROLLABLE DES ARTICLES */}
            <div className="flex-1 min-h-0 max-h-[42dvh] sm:max-h-[48dvh] overflow-y-auto overscroll-contain py-3 pr-1 flex flex-col gap-3">
                {items.length === 0 ? (
                    <div className="py-12 px-4 flex flex-col items-center justify-center text-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-[#FDFBF7] border border-[#7A9B8E]/20 text-[#7A9B8E] flex items-center justify-center shadow-2xs">
                            <Sparkles className="w-7 h-7" />
                        </div>
                        <div className="space-y-1 max-w-xs">
                            <p className="text-base font-semibold text-[#2C2C2C]">
                                Votre panier est encore vide
                            </p>
                            <p className="text-xs sm:text-sm text-[#2C2C2C]/60 leading-relaxed">
                                Laissez-vous guider par nos bougies artisanales en cire naturelle et nos créations énergétiques.
                            </p>
                        </div>
                        {isOpen && (
                            <button
                                type="button"
                                onClick={() => closeModal()}
                                className="mt-1 px-5 py-2.5 rounded-xl bg-[#7A9B8E]/15 text-[#5A7B6E] hover:bg-[#7A9B8E]/25 text-xs sm:text-sm font-semibold transition cursor-pointer"
                            >
                                Découvrir la collection
                            </button>
                        )}
                    </div>
                ) : (
                    <>
                        {items.map((item, index) => (
                            <div
                                key={`${item.id}-${index}`}
                                className="bg-white rounded-xl border border-[#2C2C2C]/8 p-2.5 sm:p-3 shadow-2xs hover:border-[#7A9B8E]/40 transition-colors"
                            >
                                <CartItem
                                    productId={item.productId}
                                    id={item.id}
                                    name={item.name}
                                    option={item.options}
                                    image={item.image}
                                    price={Number((item.price * item.qty).toFixed(2))}
                                    qty={item.qty}
                                />
                            </div>
                        ))}

                        {ship.shipping && (
                            <div className="bg-[#FDFBF7] rounded-xl border border-[#2C2C2C]/8 p-2.5 sm:p-3">
                                <ShipItem />
                            </div>
                        )}
                    </>
                )}
            </div>

            {/* 3. PIED DE PAGE FIXE (RÉCAPITULATIF & ACTION) */}
            {items.length > 0 && (
                <div className="shrink-0 pt-3.5 mt-1 border-t border-[#2C2C2C]/10 flex flex-col gap-3">
                    
                    {/* Carte de total */}
                    <div className="w-full rounded-2xl bg-[#FDFBF7] border border-[#2C2C2C]/10 px-4 py-3 space-y-1.5">
                        {ship.shipping && (
                            <div className="flex items-center justify-between text-xs text-[#2C2C2C]/65">
                                <span>Sous-total créations</span>
                                <span>{subtotal.toFixed(2)} €</span>
                            </div>
                        )}

                        <div className="flex items-baseline justify-between">
                            <div>
                                <span className="text-sm sm:text-base font-semibold text-[#2C2C2C]">
                                    Total
                                </span>
                                {!ship.shipping && (
                                    <span className="block text-[11px] text-[#2C2C2C]/55">
                                        Hors frais de livraison
                                    </span>
                                )}
                            </div>
                            <span className="text-lg sm:text-xl font-bold tracking-tight text-[#2C2C2C]">
                                {totalwithShip.toFixed(2)} €
                            </span>
                        </div>
                    </div>

                    {/* Bouton principal */}
                    {path !== "/checkout" && isOpen && (
                        <Link
                            href="/checkout"
                            onClick={() => closeModal()}
                            className="group w-full cursor-pointer bg-[#7A9B8E] hover:bg-[#68897C] active:scale-[0.99] text-white py-3.5 sm:py-4 px-5 rounded-xl font-semibold text-sm sm:text-base transition-all duration-200 flex items-center justify-center gap-2.5 shadow-md shadow-[#7A9B8E]/20"
                        >
                            <span>Valider ma commande</span>
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                        </Link>
                    )}

                    {/* Micro-réassurance */}
                    <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#2C2C2C]/50">
                        <Lock className="w-3 h-3 text-[#7A9B8E]" />
                        <span>Paiement 100 % sécurisé • Expédition soignée</span>
                    </div>
                </div>
            )}

        </div>
    );
}

export default Cart;
