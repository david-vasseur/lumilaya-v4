"use client";

import BackButton from "@/components/ui/BackButton";
import { getAllProducts } from "@/lib/action/admin.action";
import { generateFingerprint } from "@/utils/dbFunction";
import { useEffect, useState } from "react";
import Link from "next/link";

function Page() {
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadProducts = async () => {
        const fingerprint = generateFingerprint();
        const token = sessionStorage.getItem("admin-token");

        if (!fingerprint || !token) return;

        try {
            const data = await getAllProducts(token, fingerprint);
            setProducts(data || []);
        } catch (error) {
            console.error("Error loading products", error);
        } finally {
            setLoading(false);
        }
        };

        loadProducts();
    }, []);

    return (
        <div className="pt-24 px-6 min-h-screen bg-gray-50">
        <BackButton />

        <h1 className="text-2xl font-bold mb-6">Produits</h1>

        {loading ? (
            <p className="text-gray-500">Chargement...</p>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map((product) => (
                <Link
                key={product.id}
                href={`/admin/dashboard/product/${product.id}`}
                className="bg-white rounded-xl shadow-sm p-4 hover:shadow-md transition"
                >
                {/* Image */}
                {product.images?.[0] && (
                    <img
                    src={product.images[0]}
                    alt={product.meta?.name}
                    className="w-full h-40 object-cover rounded-lg mb-3"
                    />
                )}

                {/* Name */}
                <h2 className="font-semibold text-lg">
                    {product.meta?.name}
                </h2>

                {/* Collection */}
                <p className="text-sm text-gray-500">
                    {product.meta?.collection}
                </p>
                </Link>
            ))}
            </div>
        )}
        </div>
    );
}

export default Page;