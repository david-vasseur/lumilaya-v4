"use client"

import { IProduct } from "@/types/product";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type FavoritesStore = {
	favorites: IProduct[];
	toggleFavorite: (product: IProduct) => void;
	isFavorite: (productId: number) => boolean;
};

export const useFavoritesStore = create<FavoritesStore>()(
	persist(
		(set, get) => ({
		favorites: [],

		toggleFavorite: (product) =>
			set((state) => {
			const exists = state.favorites.some(
				(p) => p.id === product.id
			);

			return {
				favorites: exists
				? state.favorites.filter((p) => p.id !== product.id)
				: [...state.favorites, product],
			};
			}),

		isFavorite: (productId) =>
			get().favorites.some((p) => p.id === productId),
		}),
		{
			name: "lumilaya-favorites", 
		}
	)
);
