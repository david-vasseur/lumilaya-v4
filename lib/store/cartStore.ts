"use client"

import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
    productId: number;
    id: string;
    name: string;
    price: number;
    qty: number;
    promo: number;
    image: string;
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
    deleteItem: (id: string) => void;
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
            const existing = state.items.find((i) => i.id === item.id);
            if (existing) {
                return {
                items: state.items.map((i) =>
                    i.id === item.id ? { ...i, qty: i.qty + item.qty } : i
                ),
                };
            }
            return { items: [...state.items, item] };
            }),
        deleteItem: (id) =>
            set((state) => {
            const existing = state.items.find((i) => i.id === id);
            if (!existing) return state;
            if (existing.qty > 1) {
                return {
                items: state.items.map((i) =>
                    i.id === id ? { ...i, qty: i.qty - 1 } : i
                ),
                };
            }
            return { items: state.items.filter((i) => i.id !== id) };
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
