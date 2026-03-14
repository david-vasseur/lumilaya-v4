"use client"

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ArrowRight, Leaf } from 'lucide-react';
import Link from 'next/link';
import { useRef } from 'react';

interface HeroProps {
    image: string,
    url: string,
    title: string
}

function Hero({ image, url, title }: HeroProps) {

    const heroRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        gsap.from('.hero-content', {
            y: 100,
            opacity: 0,
            duration: 1.2,
            ease: 'power3.out',
            delay: 0.3
        });

        gsap.from('.hero-badge', {
            scale: 0,
            opacity: 0,
            duration: 0.8,
            ease: 'back.out(1.7)',
            delay: 0.5
        });
    }, {scope: heroRef});

    return (
        <div ref={heroRef} className="relative h-[80vh] overflow-hidden">
            <img
                src={image} // variable contenant le chemin de l'image
                alt="image d'une bougie"
                className="w-full h-full object-cover object-bottom"
                loading="lazy"
            />
            {/* Contenu Hero */}
            <div className="relative h-full flex items-center justify-center">
                <div className="hero-content text-center px-6 max-w-4xl">
                    <div className="hidden hero-badge md:inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-5 py-2 rounded-full mb-8">
                        <Leaf className="w-4 h-4" />
                        <span className="text-sm font-medium">Collection 100% Naturelle</span>
                    </div>

                    <h1 
                        className="text-6xl md:text-7xl font-extrabold text-white mb-6 leading-tight tracking-wide"
                        dangerouslySetInnerHTML={{ __html: title }}
                    />
                    <Link href={`/${url}/#produits`} className="inline-flex items-center gap-3 bg-white text-[#7A9B8E] px-8 py-4 rounded-full hover:bg-white/90 transition-all shadow-lg hover:shadow-xl group">
                        <span className="font-medium">Découvrir la collection</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Hero;