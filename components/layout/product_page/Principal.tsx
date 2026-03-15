"use client"

import ProductCaroussel from '@/components/features/product/ProductCaroussel';
import ProductInfo from '@/components/features/product/ProductInfo';
import { useState } from 'react';
import Description from './Description';
import { IProduct } from '@/types/product';

function Principal({ product }: { product: IProduct }) {

    const [quantity, setQuantity] = useState(1);
    const [selectedSize, setSelectedSize] = useState('150g');
    let variant: number = selectedSize === '150g' ? 0 : 1; 

    return (
        <>
            <div className="grid lg:grid-cols-2 gap-5 mb-20">
            
                {/* Galerie images */}
                <ProductCaroussel images={product.images.images} />

                {/* Informations produit */}
                <ProductInfo product={product} quantity={quantity} setQuantity={setQuantity} selectedSize={selectedSize} setSelectedSize={setSelectedSize} variant={variant} averageRating={4.5} reviewCount={8} />

            </div>

            <Description product={product} variant={0} />
          </>
    )
}

export default Principal;