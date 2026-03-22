"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock, Heart } from "lucide-react";
import { useFavoritesStore } from "@/lib/store/favoriteStore";
import { IProduct } from "@/type/product";
import { GetFavoriteProducts } from "../components/actions/product.action";
import { transformProduct } from "@/lib/utils/utilsFunction";

export default function FavoritesPage() {
    const { favorites } = useFavoritesStore();
    const [products, setProducts] = useState<IProduct[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadFavorites = async () => {
        if (!favorites.length) {
            setProducts([]);
            setLoading(false);
            return;
        }

        const ids = favorites.map((f) => f.id);
        const result = await GetFavoriteProducts(ids);
        const finalResult = result.map(transformProduct);

        setProducts(finalResult);
        setLoading(false);
        };

        loadFavorites();
    }, [favorites]);

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
            <Link
                key={product.id}
                href={`/bougies-emotions/${product.slug}`}
                className="product-grid-card group"
            >
                <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500">
                    <div className="relative w-full aspect-square overflow-hidden">
                        <Image
                        fill
                        src={product.images[0]}
                        alt={product.name}
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                        />

                        <div className="absolute inset-0 bg-linear-to-t from-[#2C2C2C]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>

                    <div className="p-6">
                        <h3 className="text-base lg:text-xl font-light text-center text-[#2C2C2C] mb-2 group-hover:text-[#7A9B8E] transition-colors">
                            Bougie<br/><strong>{product.name}</strong>
                        </h3>
                    </div>
                </div>
            </Link>
            ))}
        </div>
        </div>
    );
}
