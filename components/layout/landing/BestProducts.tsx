"use client"

import Best from "@/components/features/other/Best"

export interface IBestProduct {
    id: number,
    collection: string,
    name: string,
    slug: string,
    image: string,
    variants: IBestVariant[]
}

export interface IBestVariant {
    id: number,
    name: string,
    duration: number,
    price: number
}

function BestProducts() {
    const products: IBestProduct[] = [    
        {
            id: 1,
            collection: "Emotion",
            name: "Magie",
            slug: "bougie-magie",            
            image: "/images/products/magie.webp",            
            variants: [
                { id: 1, name: "Bougie Magie 150g", duration: 25, price: 19.90 } // sera affiché 25 -30h
            ]
        },
        {
            id: 2,
            collection: "Terre",
            name: "Libération",
            slug: "bougie-liberation",
            image: "/images/products/liberation.webp",
            variants: [
                { id: 1, name: "Bougie Libération 200g", duration: 30, price: 32 }
            ],
        },
        {
            id: 3,
            collection: "Terre",
            name: "Protection",
            slug: "bougie-protection",
            image: "/images/products/protection.webp",
            variants: [
                { id: 1, name: "Bougie Protection 200g", duration: 30, price: 32 }
            ]
        }
    ]

    return <Best products={products} />
}

export default BestProducts