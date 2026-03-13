"use client"

import { ArrowRight, Clock } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export interface ProductCardProps {
    slug: string
    collection: string,
    image: string
    name: string
    duration: string
    intro: string
    price: number
}

function ProductCard({ slug, collection, image, name, duration, intro, price }: ProductCardProps) {
    return (
        <Link
            href={`/${collection}/${slug}`}
            className="product-grid-card group"
        >
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500">
                <div className="relative h-80 overflow-hidden">
                    <Image 
                        fill 
                        src={image} 
                        alt={name}
                        className="object-cover group-hover:scale-110 transition-transform duration-700" 
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-[#2C2C2C]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Badge */}
                    <div className="absolute top-4 left-4">
                        <span className="inline-block bg-white/95 backdrop-blur-sm text-[#7A9B8E] text-xs font-medium px-3 py-1.5 rounded-full shadow-lg">
                            100% Naturel
                        </span>
                    </div>

                    {/* Durée */}
                    <div className="absolute bottom-4 left-4 right-4">
                        <div className="flex items-center justify-between text-white">
                            <div className="flex items-center gap-2 bg-[#2C2C2C]/50 backdrop-blur-sm px-3 py-1.5 rounded-full">
                                <Clock className="w-4 h-4" />
                                <span className="text-sm">{duration}h</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-6">
                    <h3 className="text-xl font-light text-[#2C2C2C] mb-2 group-hover:text-[#7A9B8E] transition-colors">
                        {name}
                    </h3>
                    <p className="text-[#2C2C2C]/60 text-sm mb-4 line-clamp-2 leading-relaxed">
                        {intro}
                    </p>
                    <div className="flex items-center justify-between pt-4 border-t border-[#2C2C2C]/5">
                        <div>
                            <span className="text-xs text-[#2C2C2C]/50 block mb-1">À partir de</span>
                            <span className="text-2xl font-light text-[#2C2C2C]">{price.toFixed(2)} €</span>
                        </div>
                        <div className="flex items-center gap-2 text-[#7A9B8E] text-sm font-medium group-hover:gap-3 transition-all">
                            Découvrir
                            <ArrowRight className="w-4 h-4" />
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default ProductCard;