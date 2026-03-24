"use client";


import { IProduct } from "@/types/product";
import { Share2 } from "lucide-react";
import { toast } from "sonner";

export default function ShareButton({ product }: { product: IProduct }) {

    const url = `https://www.lumilaya.fr/${
        product.meta.collection === "Terre"
        ? "bougies-rituel"
        : "bougies-emotions"
    }/${product.meta.slug}`;

    const handleShare = async () => {
        if (navigator.share) {
        try {
            await navigator.share({
            title: `Bougie ${product.meta.name} - LumiLaya`,
            text: `Découvre cette bougie ${product.meta.name} de la marque Lumilaya`,
            url,
            });
        } catch {
            
        }
        } else {
        try {
            await navigator.clipboard.writeText(url);
            toast.success("Lien copié dans le presse-papiers");
        } catch {
            toast.error("Impossible de copier le lien");
        }
        }
    };

    return (
        <button
            onClick={handleShare}
            className="flex-1 border-2 border-[#2C2C2C]/10 text-[#2C2C2C] py-3 rounded-lg hover:border-[#7A9B8E] hover:text-[#7A9B8E] transition-all flex items-center justify-center gap-2"
        >
            <Share2 className="w-5 h-5" />
            Partager
        </button>
    );
}
