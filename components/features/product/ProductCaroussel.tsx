"use client"

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';


function ProductCaroussel({ images }: { images: string[] }) {

    if (!images || images.length === 0) return null;

    const [currentImage, setCurrentImage] = useState<number>(0)

    const nextImage = () => {
        setCurrentImage((prev) => (prev + 1) % images.length);
    };

    const prevImage = () => {
        setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
    };

    return (
        <div className="product-gallery">
            {/* Image principale avec carousel */}
            <div className="relative rounded-2xl overflow-hidden mb-6 w-full aspect-square lg:h-150 bg-white shadow-xl">
                <img 
                    src={images[currentImage] || ""} 
                    alt={`Image ${currentImage + 1}`} 
                    className="absolute inset-0 object-cover" 
                />
                {/* Navigation carousel */}
                <button 
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-all shadow-lg z-10"
                    aria-label="Image précédente"
                >
                    <ChevronLeft className="w-6 h-6 text-[#2C2C2C]" />
                </button>
                <button 
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-all shadow-lg z-10"
                    aria-label="Image suivante"
                >
                    <ChevronRight className="w-6 h-6 text-[#2C2C2C]" />
                </button>

                {/* Indicateurs */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                    {images.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentImage(index)}
                            className={`w-2 h-2 rounded-full transition-all ${
                            currentImage === index ? 'bg-white w-8' : 'bg-white/50'
                            }`}
                        ></button>
                    ))}
                </div>

                {/* Badge */}
                <div className="absolute top-6 left-6 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full z-10">
                    <span className="text-sm font-medium text-[#7A9B8E]">100% Naturel</span>
                </div>
            </div>

            {/* Miniatures */}
            <div className="grid grid-cols-5 gap-4">
                {images.map((img, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentImage(index)}
                        className={`relative aspect-square h-15 lg:h-24 rounded-xl overflow-hidden transition-all ${
                            currentImage === index ? 'ring-2 ring-[#7A9B8E] scale-105' : 'opacity-60 hover:opacity-100'
                        }`}
                        aria-label={`Voir l'image ${index + 1}`}
                    >
                        <img
                            src={img} 
                            alt="image d'une bougie" 
                            className="absolute inset-0 object-cover" />
                    </button>
                ))}
            </div>
        </div>
    )
}

export default ProductCaroussel;