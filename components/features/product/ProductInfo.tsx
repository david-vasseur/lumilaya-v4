"use client"

import ReviewProduct from "@/components/ui/ReviewProduct";
import ProductInteract from "./ProductInteract";
import { Dispatch, SetStateAction } from "react";
import Secure from "@/components/ui/Secure";
import { IProduct } from "@/types/product";

type Props = {
    product: IProduct, 
    variant: number, 
    averageRating: number, 
    reviewCount: number,
    selectedSize: string,
    quantity: number,
    setSelectedSize: Dispatch<SetStateAction<string>>;
    setQuantity: Dispatch<SetStateAction<number>>; 
}

function ProductInfo({ product, selectedSize, setSelectedSize, quantity, setQuantity, variant, averageRating, reviewCount }: Props) {

    return (
        <div>
            <div className="flex items-center gap-2 mb-4">
                <span className="bg-[#F5F1EB] text-[#7A9B8E] text-sm px-3 py-1 rounded-full">
                    {product.meta.collection === "Emotion" ? "Collection Emotions & Plaisirs" : "Collection Entre Terre & Ciel"}
                </span>
                <span className="text-[#2C2C2C]/40">•</span>
                <span className="text-sm text-[#2C2C2C]/60">{product.meta.stock === true ? "En stock" : "Rupture - Livraison sous 7 jours"}</span>
            </div>

            <h1 className="text-5xl font-light text-[#2C2C2C] mb-4 leading-tight">
                {product?.meta.name}
            </h1>

            <ReviewProduct productId={product.meta.id} productSlug={product.meta.slug} productName={product.meta.name} averageRating={averageRating} reviewCount={reviewCount} />

            <p className="text-lg text-[#2C2C2C]/70 leading-relaxed mb-8">
                {product?.meta.intro}
            </p>

            {product && product.variants && product.variants[variant] && (
                <div className="flex items-baseline gap-3 mb-8">
                {product.meta.promo && product.meta.promo !== 0 ? (
                    <>
                    <span className="text-4xl font-light text-[#2C2C2C]">
                        {(product.variants[variant].price * (1 - product.meta.promo / 100)).toFixed(2)} €
                    </span>
                    <span className="text-xl text-[#2C2C2C]/40 line-through">
                        {product.variants[variant].price.toFixed(2)} €
                    </span>
                    </>
                ) : (
                    <span className="text-4xl font-light text-[#2C2C2C]">
                        {product.variants[variant].price.toFixed(2)} €
                    </span>
                )}

                {product.meta.promo !== 0 && (
                    <span className="bg-[#7A9B8E]/10 text-[#7A9B8E] text-sm px-3 py-1 rounded-full">
                        {product.meta.promo} %
                    </span>
                )}
                </div>
            )}

            {/* Interaction produit */}
            <ProductInteract product={product} quantity={quantity} setQuantity={setQuantity} selectedSize={selectedSize} setSelectedSize={setSelectedSize} variant={variant} />

            {/* Points de réassurance */}
            <Secure />

        </div>
    )
}

export default ProductInfo;