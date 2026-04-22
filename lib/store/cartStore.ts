"use client"

import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
    productId: number;
    id: number;
    name: string;
    price: number;
    qty: number;
    promo: number;
    image: string;
    options?: string[]
}

interface ShipItem {
    shipping: boolean,
    code: string,
    fee: number
}

interface CartState {
    items: CartItem[];
    ship: ShipItem;
    addItem: (item: CartItem) => void;
    deleteItem: (productId: number, id: number, options?: string[]) => void;
    clearCart: () => void;
    total: () => number;
    setShip: (value: ShipItem) => void;
}

export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
        items: [],
        ship: { shipping: false, code: "", fee: 0 },
        setShip: (value: ShipItem) => set({ ship: value }),
        addItem: (item) =>
            set((state) => {

                // 👉 comportement normal pour les autres produits
                const existing = state.items.find((i) =>
                    i.id === item.id &&
                    i.productId === item.productId &&
                    JSON.stringify(i.options ?? []) === JSON.stringify(item.options ?? [])
                );

                if (existing) {
                    return {
                        items: state.items.map((i) =>
                            i.id === item.id && i.productId === item.productId
                                ? { ...i, qty: i.qty + item.qty }
                                : i
                        ),
                    };
                }

                return { items: [...state.items, item] };
            }),
        deleteItem: (productId: number, id: number, options?: string[]) =>
            set((state) => {

                const match = (i: CartItem) =>
                    i.id === id &&
                    i.productId === productId &&
                    JSON.stringify(i.options ?? []) === JSON.stringify(options ?? []);

                const existing = state.items.find(match);

                if (!existing) return state;

                if (existing.qty > 1) {
                    return {
                        items: state.items.map((i) =>
                            match(i) ? { ...i, qty: i.qty - 1 } : i
                        ),
                    };
                }

                return {
                    items: state.items.filter((i) => !match(i)),
                };
            }),
        clearCart: () => set({ items: [] }),
        total: () => get().items.reduce((acc, item) => {
            const price = item.promo !== 0
                ? item.price - (item.price * item.promo / 100)
                : item.price;

            return acc + price * item.qty;
        }, 0),
        }),
        {
        name: "cart",
        partialize: (state) => ({ items: state.items }), 
        }
    )
);
