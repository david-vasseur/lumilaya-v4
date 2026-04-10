"use client"

import { ChevronRight } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef } from 'react';
import Link from 'next/link';

function CoffretDecouverte() {

    const imageRef = useRef(null);
    const img1Ref = useRef<HTMLImageElement>(null);
    const img2Ref = useRef<HTMLImageElement>(null);

    useGSAP(() => {

        if (!img1Ref.current || !img2Ref.current) return

        gsap.set(img2Ref.current, { opacity: 0 })

        const tl = gsap.timeline({ repeat: -1 })

        tl.to(img2Ref.current, {
            opacity: 1,
            duration: 1.5,
            ease: 'power1.inOut'
        }, "+=3")

        tl.to(img1Ref.current, {
            opacity: 0,
            duration: 1.5,
            ease: 'power1.inOut'
        }, "<")

        tl.to(img2Ref.current, {
            opacity: 0,
            duration: 1.5,
            ease: 'power1.inOut'
        }, "+=3")

        tl.to(img1Ref.current, {
            opacity: 1,
            duration: 1.5,
            ease: 'power1.inOut'
        }, "<")

    }, [])

    useGSAP(() => {

        const elements = gsap.utils.toArray('.coffret-content > *')

        gsap.fromTo(
            elements,
            {
                y: 40,
                opacity: 0,
                scale: 0.95,
                filter: "blur(6px)"
            },
            {
                y: 0,
                opacity: 1,
                scale: 1,
                filter: "blur(0px)",
                stagger: 0.15,
                duration: 0.9,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".coffret-section",
                    start: "top 70%",
                    end: "bottom 30%",
                    toggleActions: "play reverse play reverse"
                }
            }
        )

    }, [])

    return (
        <>
            <section className="coffret-section py-20 px-6 bg-[#FDFBF7]">
                <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">

                    {/* Badge + Titre : au-dessus de l'image sur mobile, dans le contenu sur desktop */}
                    <div className="flex flex-col gap-4 md:hidden">
                        <span className="text-xs tracking-widest uppercase text-[#5A7B6E] border border-[#5A7B6E] rounded-full px-4 py-1 w-fit">
                            Idée cadeau
                        </span>
                        <h3 className="text-4xl font-light text-[#3a4a44] leading-snug">
                            L'essentiel{' '}
                            <span className="font-ballet text-5xl text-[#5A7B6E]">Lumi'laya</span>
                        </h3>
                    </div>

                    {/* Image avec fondu enchaîné */}
                    <div ref={imageRef} className="relative rounded-lg overflow-hidden aspect-4/3 shadow-xl">
                        <img
                            ref={img1Ref}
                            src="/images/landing/coffret.webp"
                            alt="Coffret découverte Lumi'laya"
                            className="absolute inset-0 w-full h-full object-cover"
                            loading="lazy"
                        />
                        <img
                            ref={img2Ref}
                            src="/images/landing/coffret1.webp"
                            alt="Coffret découverte Lumi'laya vue 2"
                            className="absolute inset-0 w-full h-full object-cover"
                            loading="lazy"
                        />
                        <div className="absolute inset-0 bg-[#5A7B6E]/10" />
                    </div>

                    {/* Contenu */}
                    <div className="coffret-content flex flex-col gap-6">

                        {/* Badge + Titre : caché sur mobile (affiché au-dessus), visible sur desktop */}
                        <span className="hidden md:inline-flex text-xs tracking-widest uppercase text-[#5A7B6E] border border-[#5A7B6E] rounded-full px-4 py-1 w-fit">
                            Idée cadeau
                        </span>
                        <h3 className="hidden md:block text-4xl font-light text-[#3a4a44] leading-snug">
                            L'essentiel{' '}
                            <span className="font-ballet text-5xl text-[#5A7B6E]">Lumi'laya</span>
                        </h3>

                        <p className="text-gray-500 leading-relaxed max-w-md">
                            Offrez une expérience sensorielle complète avec notre coffret découverte : quatre bougies soigneusement sélectionnées pour s'initier en douceur à l'univers <em>Émotions & Plaisirs</em>.
                        </p>

                        <ul className="flex flex-col gap-2 text-sm text-gray-600">
                            {[
                                '4 bougies issues de la collection "emotions et Plaisirs"',
                                'Coffret recyclable premium',
                                'Livraison soignée, prête à offrir',
                            ].map((item) => (
                                <li key={item} className="flex items-center gap-3">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#5A7B6E] shrink-0" />
                                    {item}
                                </li>
                            ))}
                        </ul>

                        <Link
                            href="/coffret-decouverte"
                            className="group mt-2 inline-flex items-center gap-2 bg-[#5A7B6E] hover:bg-[#4a6b5e] text-[#FDFBF7] rounded-full px-8 py-3.5 text-sm tracking-wide transition-colors duration-300 w-fit"
                        >
                            Configurez votre coffret
                            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                        </Link>

                    </div>
                </div>
            </section>
        </>
    )
}

export default CoffretDecouverte;