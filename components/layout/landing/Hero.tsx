"use client"

import { ArrowDown } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';

function Hero() {

    const heroRef = useRef<HTMLDivElement>(null)
    const imageRef = useRef<HTMLDivElement>(null)
    const overlayRef = useRef<HTMLDivElement>(null)

    return (
        <section ref={heroRef} className="relative h-screen overflow-hidden">
            {/* IMAGE */}
            <div ref={imageRef} className="absolute inset-0 z-0">
                <Image
                    width={939}
                    height={704}
                    src="/images/landing/hero.webp"
                    alt="Himalaya avec bougie naturelle"
                    className="w-full h-full object-cover object-bottom-right"
                />
            </div>
            {/* OVERLAY */}
            <div
                ref={overlayRef}
                className="absolute inset-0 pointer-events-none bg-linear-to-br from-[#2C2C2C]/60 via-[#2C2C2C]/40 to-transparent z-10"
            />
            {/* CONTENT */}
            <div className="relative z-20 w-full h-full flex flex-col items-center justify-center text-center px-6">

                <h1 className="text-[7rem] md:text-9xl lg:text-[10rem] xl:text-[12rem] font-ballet text-white mb-4">
                    <em>Lumi'laya</em>
                </h1>

                <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-8">
                    <strong className="text-xl md:text-2xl">
                        Naturelle, enivrante et sacrée
                    </strong>
                    <br />
                        La bougie qui élève votre ambiance
                </p>

                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                    <Link
                        href="/#boutique"
                        className="group relative inline-flex items-center gap-3 bg-white text-[#2C2C2C] px-8 py-4 rounded-full font-medium hover:bg-white/90 transition-colors"
                    >
                        Découvrir la collection
                        <ArrowDown className="w-5 h-5 -rotate-90" />
                    </Link>

                    <Link
                        href="/#best-seller"
                        className="bg-white/10 text-white px-8 py-4 rounded-full font-medium hover:bg-white/20 transition-colors"
                    >
                        Nos meilleures ventes
                    </Link>
                </div>

                <div className="flex flex-wrap justify-center gap-6 text-white/70 text-sm md:text-base">
                    <span>Fabrication française</span>
                    <span>Cire 100% végétale</span>
                    <span>Parfums naturels</span>
                </div>
            </div>
        </section>
    )
}

export default Hero;