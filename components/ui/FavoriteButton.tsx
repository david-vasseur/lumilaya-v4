"use client";

import { Heart } from "lucide-react";
import { IProduct } from "@/types/product";
import { toast } from "sonner";
import { useFavoritesStore } from "@/lib/store/favoriteStore";

export default function FavoriteButton({ product }: { product: IProduct }) {
	const { toggleFavorite, isFavorite } = useFavoritesStore();
	const favorite = isFavorite(product.id);

	const handleClick = () => {
		toggleFavorite(product);
		toast.success(
		favorite ? "Retiré des favoris" : "Ajouté aux favoris"
		);
	};

	return (
		<button 
			onClick={handleClick} 
			aria-label="Ajouter aux favoris"
			className="flex-1 border-2 border-[#2C2C2C]/10 text-[#2C2C2C] py-3 rounded-lg hover:border-[#7A9B8E] hover:text-[#7A9B8E] transition-all flex items-center justify-center gap-2"
		>
			<Heart className={`w-5 h-5 ${favorite ? "fill-red-500" : ""}`} />
			Favoris
		</button>
	);
}
