"use client";

import BackButton from "@/components/ui/BackButton";
import { getAllProducts } from "@/lib/action/admin.action";
import { generateFingerprint } from "@/utils/dbFunction";
import { getImageUrl } from "@/utils/image";
import { useEffect, useState, useMemo, useCallback } from "react";
import Link from "next/link";
import ProductForm from "@/components/form/admin/ProductForm";
import {
    Plus,
    X,
    Search,
    Package,
    Layers,
    ChevronRight,
    Heart,
} from "lucide-react";

interface IAdminProductVariant {
    id: number;
    name: string;
    price: number | string;
}

interface IAdminProduct {
    id: number;
    images: string[];
    variants?: IAdminProductVariant[];
    meta?: {
        name: string;
        slug: string;
        collection: string;
        intro?: string;
        stock?: boolean;
        promo?: number;
        like?: number;
    };
}

const COLLECTION_TABS = [
    { key: "ALL", label: "Tous les produits" },
    { key: "Emotion", label: "Émotion & Plaisir" },
    { key: "Terre", label: "Entre Terre & Ciel" },
    { key: "Coffret", label: "Coffrets" },
    { key: "Autre", label: "Accessoires / Autre" },
];

function resolveProductImage(rawUrl?: string): string {
    if (!rawUrl) return "";
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

export default function AdminProductsPage() {
    const [products, setProducts] = useState<IAdminProduct[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [creating, setIsCreating] = useState<boolean>(false);
    const [collectionFilter, setCollectionFilter] = useState<string>("ALL");
    const [searchQuery, setSearchQuery] = useState<string>("");

    const loadProducts = useCallback(async () => {
        setLoading(true);
        const fingerprint = generateFingerprint();
        const token = sessionStorage.getItem("admin-token");

        if (!fingerprint || !token) {
            setLoading(false);
            return;
        }

        try {
            const data = await getAllProducts(token, fingerprint);
            setProducts(data || []);
        } catch (error) {
            console.error("Error loading products", error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadProducts();
    }, [loadProducts]);

    const filteredProducts = useMemo(() => {
        return products.filter((p: IAdminProduct) => {
            const col = p.meta?.collection || "";
            const matchesCol =
                collectionFilter === "ALL" ||
                col.toLowerCase() === collectionFilter.toLowerCase();

            if (!searchQuery.trim()) return matchesCol;

            const q = searchQuery.toLowerCase();
            const matchesSearch =
                (p.meta?.name || "").toLowerCase().includes(q) ||
                (p.meta?.slug || "").toLowerCase().includes(q) ||
                col.toLowerCase().includes(q);

            return matchesCol && matchesSearch;
        });
    }, [products, collectionFilter, searchQuery]);

    return (
        <div className="min-h-screen bg-slate-50/70 text-slate-900 p-4 sm:p-6 md:p-10 pb-24">
            <div className="fixed inset-0 -z-10 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] bg-size-[20px_20px] opacity-50 pointer-events-none" />

            <div className="max-w-6xl mx-auto pt-4 sm:pt-8 space-y-6 sm:space-y-8">
                
                {/* NAVIGATION & EN-TÊTE */}
                <div className="space-y-4">
                    <div className="self-start">
                        <BackButton />
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200/80 pb-6">
                        <div>
                            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
                                Catalogue Produits
                            </h1>
                            <p className="text-sm sm:text-base text-slate-500 mt-1">
                                Gérez vos bougies, coffrets, stocks et déclinaisons ({products.length} références).
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={() => setIsCreating((prev) => !prev)}
                            className={`self-start sm:self-auto inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition shadow-xs cursor-pointer ${
                                creating
                                    ? "bg-white text-slate-700 border border-slate-200 hover:bg-slate-100"
                                    : "bg-slate-900 text-white hover:bg-slate-800"
                            }`}
                        >
                            {creating ? (
                                <>
                                    <X className="w-4 h-4" />
                                    <span>Fermer le formulaire</span>
                                </>
                            ) : (
                                <>
                                    <Plus className="w-4 h-4" />
                                    <span>Nouveau produit</span>
                                </>
                            )}
                        </button>
                    </div>
                </div>

                {/* TIROIR DE CRÉATION DE PRODUIT */}
                {creating && (
                    <div className="animate-in fade-in slide-in-from-top-2 duration-200">
                        <ProductForm
                            onSuccess={() => {
                                setIsCreating(false);
                                loadProducts();
                            }}
                        />
                    </div>
                )}

                {/* BARRE DE RECHERCHE & FILTRES DE COLLECTION */}
                <div className="space-y-4">
                    <div className="relative">
                        <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Rechercher un produit par nom, slug ou collection..."
                            className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200/90 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 transition shadow-2xs"
                        />
                    </div>

                    <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
                        {COLLECTION_TABS.map((t) => {
                            const isActive = collectionFilter === t.key;
                            return (
                                <button
                                    key={t.key}
                                    type="button"
                                    onClick={() => setCollectionFilter(t.key)}
                                    className={`shrink-0 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition cursor-pointer border ${
                                        isActive
                                            ? "bg-slate-900 text-white border-slate-900 shadow-xs"
                                            : "bg-white text-slate-600 border-slate-200/80 hover:bg-slate-100"
                                    }`}
                                >
                                    {t.label}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* GRILLE DES PRODUITS */}
                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {Array.from({ length: 6 }).map((_, idx: number) => (
                            <div
                                key={idx}
                                className="h-72 rounded-2xl bg-white border border-slate-200/70 p-4 animate-pulse flex flex-col justify-between"
                            >
                                <div className="h-44 w-full bg-slate-200 rounded-xl" />
                                <div className="space-y-2">
                                    <div className="h-5 w-2/3 bg-slate-200 rounded" />
                                    <div className="h-4 w-1/3 bg-slate-100 rounded" />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : filteredProducts.length === 0 ? (
                    <div className="bg-white rounded-2xl border border-slate-200/80 p-12 text-center max-w-md mx-auto space-y-3">
                        <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-500 flex items-center justify-center mx-auto">
                            <Package className="w-6 h-6" />
                        </div>
                        <h3 className="text-base font-bold text-slate-900">
                            Aucun produit trouvé
                        </h3>
                        <p className="text-sm text-slate-500">
                            Modifiez votre filtre ou cliquez sur « Nouveau produit » pour ajouter une référence.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {filteredProducts.map((product: IAdminProduct) => {
                            const mainImg = resolveProductImage(product.images?.[0]);
                            const inStock = product.meta?.stock !== false;
                            const promo = Number(product.meta?.promo || 0);
                            const variantsCount = product.variants?.length || 0;
                            const firstPrice = product.variants?.[0]?.price
                                ? Number(product.variants[0].price)
                                : null;

                            return (
                                <Link
                                    key={product.id}
                                    href={`/admin/dashboard/product/${product.id}`}
                                    className="group bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-2xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
                                >
                                    <div>
                                        {/* IMAGE + BADGES */}
                                        <div className="relative h-52 w-full bg-slate-100 overflow-hidden">
                                            {mainImg ? (
                                                <img
                                                    src={mainImg}
                                                    alt={product.meta?.name || "Produit"}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-slate-300">
                                                    <Package className="w-10 h-10" />
                                                </div>
                                            )}

                                            {/* Collection Badge */}
                                            <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-white/95 text-slate-800 shadow-2xs">
                                                {product.meta?.collection || "Sans collection"}
                                            </span>

                                            {/* Stock & Promo Badges */}
                                            <div className="absolute top-3 right-3 flex items-center gap-1.5">
                                                {promo > 0 && (
                                                    <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-amber-500 text-white">
                                                        -{promo}%
                                                    </span>
                                                )}
                                                <span
                                                    className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                                                        inStock
                                                            ? "bg-emerald-500/95 text-white"
                                                            : "bg-rose-600/95 text-white"
                                                    }`}
                                                >
                                                    {inStock ? "En stock" : "Rupture"}
                                                </span>
                                            </div>
                                        </div>

                                        {/* INFOS PRODUIT */}
                                        <div className="p-5 space-y-1.5">
                                            <div className="flex items-start justify-between gap-2">
                                                <h2 className="font-bold text-lg text-slate-900 group-hover:text-slate-700 transition-colors">
                                                    {product.meta?.name || `Produit #${product.id}`}
                                                </h2>
                                                {firstPrice !== null && (
                                                    <span className="font-bold text-sm text-slate-900 bg-slate-100 px-2.5 py-1 rounded-lg shrink-0">
                                                        {firstPrice.toFixed(2)} €
                                                    </span>
                                                )}
                                            </div>

                                            {product.meta?.intro && (
                                                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                                                    {product.meta.intro}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    {/* PIED DE CARTE */}
                                    <div className="px-5 py-3.5 bg-slate-50/70 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                                        <div className="flex items-center gap-3">
                                            <span className="inline-flex items-center gap-1 font-medium">
                                                <Layers className="w-3.5 h-3.5 text-slate-400" />
                                                {variantsCount} format{variantsCount > 1 ? "s" : ""}
                                            </span>
                                            {(product.meta?.like ?? 0) > 0 && (
                                                <span className="inline-flex items-center gap-1">
                                                    <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
                                                    {product.meta?.like}
                                                </span>
                                            )}
                                        </div>

                                        <span className="inline-flex items-center gap-1 font-semibold text-slate-900 group-hover:translate-x-0.5 transition-transform">
                                            Modifier
                                            <ChevronRight className="w-3.5 h-3.5" />
                                        </span>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                )}

            </div>
        </div>
    );
}
