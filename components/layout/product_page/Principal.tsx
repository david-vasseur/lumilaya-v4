"use client"

import ProductCaroussel from '@/components/features/product/ProductCaroussel';
import ProductInfo from '@/components/features/product/ProductInfo';
import { useState } from 'react';
import Description from './Description';
import { IProduct } from '@/types/product';
import { IReview } from '@/schema/review';

function Principal({ product, reviews }: { product: IProduct, reviews: IReview[] }) {

    const [quantity, setQuantity] = useState(1);
    const [selectedSize, setSelectedSize] = useState(150);
    let variant: number = selectedSize === 150 ? 0 : 1; 

    const average = reviews.length ? reviews.reduce((acc, review) => acc + review.note, 0) / reviews.length : 0

    return (
        <>
            <div className="grid lg:grid-cols-2 gap-5 mb-20">
            
                {/* Galerie images */}
                <ProductCaroussel images={product.images} />

                {/* Informations produit */}
                <ProductInfo product={product} quantity={quantity} setQuantity={setQuantity} selectedSize={selectedSize} setSelectedSize={setSelectedSize} variant={variant} averageRating={average} reviewCount={reviews.length} />

            </div>

            <Description product={product} variant={0} />
          </>
    )
}

export default Principal;