"use client"

import { IProduct } from "@/types/product";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type FavoritesStore = {
	favorites: number[];
	toggleFavorite: (productId: number) => void;
	isFavorite: (productId: number) => boolean;
};

export const useFavoritesStore = create<FavoritesStore>()(
	persist(
		(set, get) => ({
			favorites: [],

			toggleFavorite: (productId) =>
				set((state) => {
					const exists = state.favorites.includes(productId);

					return {
						favorites: exists
							? state.favorites.filter((id) => id !== productId)
							: [...state.favorites, productId],
					};
				}),

			isFavorite: (productId) =>
				get().favorites.includes(productId),
		}),
		{
			name: "lumilaya-favorites",
		}
	)
);
