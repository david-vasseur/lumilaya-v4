"use client";

import { useCartStore } from "@/lib/store/cartStore";
import { getImageUrl } from "@/utils/image";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

interface ICartItem {
    productId: number;
    id: number;
    image: string;
    name: string;
    price: number;
    qty: number;
    option?: string[];
}

function resolveCartImage(rawUrl?: string): string {
    if (!rawUrl) return "/images/landing/coffret.webp";
    if (
        rawUrl.startsWith("http://") ||
        rawUrl.startsWith("https://") ||
        rawUrl.startsWith("/")
    ) {
        return rawUrl;
    }
    try {
        return getImageUrl(rawUrl);
    } catch {
        return rawUrl;
    }
}

function CartItem({
    productId,
    id,
    image,
    name,
    option,
    price,
    qty = 1,
}: ICartItem) {
    const { deleteItem } = useCartStore();

    const handleDelete = () => {
        deleteItem(productId, id, option);
        toast.info("Création retirée du panier");
    };

    return (
        <div className="flex items-start sm:items-center justify-between gap-3 w-full">
            {/* GAUCHE : VIGNETTE + NOM + OPTIONS */}
            <div className="flex items-start sm:items-center gap-3 min-w-0 flex-1">
                {/* Vignette produit avec badge quantité */}
                <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden bg-[#FDFBF7] border border-[#2C2C2C]/10 shrink-0">
                    <img
                        src={resolveCartImage(image)}
                        alt={name}
                        className="w-full h-full object-cover"
                    />
                    {qty > 1 && (
                        <span className="absolute -top-0.5 -right-0.5 min-w-[20px] h-5 px-1.5 rounded-bl-lg bg-[#7A9B8E] text-white text-[11px] font-bold flex items-center justify-center shadow-2xs">
                            x{qty}
                        </span>
                    )}
                </div>

                {/* Détails texte */}
                <div className="min-w-0 flex-1 space-y-1">
                    <p className="text-sm sm:text-base font-semibold text-[#2C2C2C] leading-snug line-clamp-2">
                        {name}
                    </p>

                    {/* Affichage des options (ex: sélection coffret découverte) */}
                    {option && option.length > 0 && (
                        <div className="flex flex-wrap gap-1 pt-0.5">
                            {option.map((opt, index) => (
                                <span
                                    key={index}
                                    className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-medium bg-[#7A9B8E]/10 text-[#34423d]"
                                >
                                    1× {opt}
                                </span>
                            ))}
                        </div>
                    )}

                    {/* Rappel quantité si > 1 */}
                    <p className="text-xs text-[#2C2C2C]/55">
                        Quantité : <span className="font-medium text-[#2C2C2C]">{qty}</span>
                    </p>
                </div>
            </div>

            {/* DROITE : PRIX + SUPPRESSION */}
            <div className="flex flex-col sm:flex-row items-end sm:items-center gap-2 sm:gap-3 shrink-0">
                <span className="text-sm sm:text-base font-bold text-[#2C2C2C] whitespace-nowrap">
                    {Number(price).toFixed(2)} €
                </span>

                <button
                    type="button"
                    onClick={handleDelete}
                    aria-label={`Retirer ${name} du panier`}
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-[#2C2C2C]/40 hover:text-rose-600 hover:bg-rose-50 active:bg-rose-100 transition-colors cursor-pointer"
                >
                    <Trash2 className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
}

export default CartItem;
