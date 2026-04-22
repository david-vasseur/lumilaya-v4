"use client"

import ProductCaroussel from '@/components/features/product/ProductCaroussel';
import ProductInfo from '@/components/features/product/ProductInfo';
import { useState } from 'react';
import Description from './Description';
import { IProduct } from '@/types/product';
import { IReview } from '@/schema/review';
import { log } from 'console';

function Principal({ product, reviews }: { product: IProduct, reviews: IReview[] }) {

    const [quantity, setQuantity] = useState(1);
    const [selectedSize, setSelectedSize] = useState(product.variants[0].weight);
    const variantIndex = product.variants.findIndex(
        v => v.weight === selectedSize
    );
    

    const average = reviews.length ? reviews.reduce((acc, review) => acc + review.note, 0) / reviews.length : 0

    return (
        <>
            <div className="grid lg:grid-cols-2 gap-5 mb-20">
            
                {/* Galerie images */}
                <ProductCaroussel images={product.images} />

                {/* Informations produit */}
                <ProductInfo product={product} quantity={quantity} setQuantity={setQuantity} selectedSize={selectedSize} setSelectedSize={setSelectedSize} variant={variantIndex} averageRating={average} reviewCount={reviews.length} />

            </div>

            <Description product={product} variant={variantIndex} />
          </>
    )
}

export default Principal;