"use client";

import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import { useFavoritesStore } from "@/lib/store/favoriteStore";
import ProductCard, { ProductCardProps } from "@/components/ui/ProductCard";
import { getFavoriteProductsByIds } from "@/lib/action/product.action";


export default function FavoritesPage() {
    const { favorites } = useFavoritesStore();
    const [products, setProducts] = useState<ProductCardProps[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadFavorites = async () => {
            if (!favorites.length) {
                setProducts([]);
                setLoading(false);
                return;
            }

            const ids = favorites.map((f) => f.id);
            const result = await getFavoriteProductsByIds(ids);
            setProducts(result)
            setLoading(false);
        };

        loadFavorites();
    }, []);

    if (loading) {
        return (
        <div className="container mx-auto py-20 text-center text-[#2C2C2C]/60">
            Chargement de vos favoris…
        </div>
        );
    }

    if (!products.length) {
        return (
        <div className="container min-h-svh mx-auto py-20 text-center">
            <Heart className="w-12 h-12 mx-auto mb-4 text-[#7A9B8E]" />
            <h1 className="text-2xl font-light text-[#2C2C2C] mb-2">
                Aucun favori pour le moment
            </h1>
            <p className="text-[#2C2C2C]/60">
                Ajoutez des bougies à vos favoris pour les retrouver ici.
            </p>
        </div>
        );
    }

    return (
        <div className="container min-h-svh mx-auto py-16 px-5">
            <h1 className="text-4xl my-10 text-center text-[#7A9B8E]">
                Mes favoris
            </h1>

            <div className="products-grid grid grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
                {products.map((product) => (
                    <ProductCard  {...product} />
                ))}
            </div>
        </div>
    );
}
