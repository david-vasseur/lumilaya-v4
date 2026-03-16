"use client"

import { useDeviceStore } from '@/lib/store/deviceStore';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { ArrowDown } from 'lucide-react';
import Link from 'next/link';
import { useRef } from 'react';

function Hero() {

    const isMobile = useDeviceStore((state) => state.isMobile)

    const heroRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLParagraphElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);
    const buttonsRef = useRef<HTMLDivElement>(null);
    const tipsRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!textRef.current) return

        const split = new SplitText(textRef.current, { type: "words" })

        const tl = gsap.timeline({ defaults: { ease: "power2.out" } })

        tl.from(heroRef.current, { opacity: 0, duration: 0.8 })

        tl.from(
            split.words,
            { y: 50, opacity: 0, stagger: 0.15, duration: 0.6 },
            "<0.2"
        )

        if (buttonsRef.current) {
            tl.from(
                buttonsRef.current.children,
                { y: 20, opacity: 0, stagger: 0.2, duration: 0.6 },
                "<0.3"
            )
            
        }

        tl.from(tipsRef.current, { opacity: 0, duration: 0.8 }, ">")
        

        return () => split.revert()
    }, { scope: heroRef })

    useGSAP(() => {
        if (!heroRef.current || !imageRef.current || !overlayRef.current) return

        gsap.to(imageRef.current, {
        scale: 1.4,
        ease: "none",
        scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
        },
        })

        gsap.to(overlayRef.current, {
        backgroundColor: "rgba(0,0,0,0.7)",
        ease: "none",
        scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
        },
        })
    }, { scope: heroRef })

    return (
        <section ref={heroRef} className="relative h-screen overflow-hidden">
            {/* IMAGE */}
            <div ref={imageRef} className="absolute inset-0 z-0">
                <img
                    src={`${isMobile ? "/images/landing/hero_mobile1.webp" : "/images/landing/hero_desktop.webp"}`}
                    alt="Himalaya avec bougie naturelle"
                    width={939}
                    height={704}
                    className="w-full h-full object-cover object-bottom"
                    loading="lazy"
                />
            </div>
            {/* OVERLAY */}
            <div
                ref={overlayRef}
                className="absolute inset-0 pointer-events-none bg-linear-to-br from-[#2C2C2C]/60 via-[#2C2C2C]/40 to-transparent z-10"
            />
            {/* CONTENT */}
            <div className="relative z-20 w-full h-full flex flex-col items-center justify-start pt-20 xl:pt-32 text-center px-6">

                <h1 className="text-[7rem] md:text-9xl lg:text-[10rem] xl:text-[12rem] font-ballet text-white mb-8">
                    <em>Lumi'laya</em>
                </h1>

                <p ref={textRef} className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-8">
                    <strong className="text-xl md:text-2xl">
                        Naturelle, enivrante et sacrée
                    </strong>
                    <br />
                        La bougie qui élève votre ambiance
                </p>

                <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-4 my-8 xl:my-30">
                    <Link
                        href="/#boutique"
                        className="group relative inline-flex items-center gap-3 bg-white text-[#2C2C2C] 
                        px-6 py-3 text-lg
                        md:px-8 md:py-4 md:text-base
                        xl:px-10 xl:py-5 xl:text-2xl
                        rounded-full font-medium hover:bg-white/90 transition-colors"
                    >
                        Découvrir la collection
                        <ArrowDown className="w-5 h-5 -rotate-90 xl:w-6 xl:h-6" />
                    </Link>

                    <Link
                        href="/#best-seller"
                        className="bg-white/10 text-white 
                        px-6 py-3 text-lg
                        md:px-8 md:py-4 md:text-base
                        xl:px-10 xl:py-5 xl:text-2xl
                        rounded-full font-medium hover:bg-white/20 transition-colors"
                    >
                        Nos meilleures ventes
                    </Link>
                </div>

                <div ref={tipsRef} className="absolute bottom-30 xl:bottom-10 flex flex-wrap justify-center gap-6 text-white/70 text-sm md:text-base">
                    <span>Fabrication française</span>
                    <span>Cire 100% végétale</span>
                    <span>Parfums naturels</span>
                </div>
            </div>
        </section>
    )
}

export default Hero;