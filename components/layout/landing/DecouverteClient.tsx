"use client";

import { ChevronRight } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, useState } from "react";
import Link from "next/link";


export interface ShowcaseSlide {
    id: string | number;
    title: string;
    description: string;
    bullets: string[];
    ctaLabel: string;
    ctaHref: string;
    images: string[];
    discountPercent?: number;
    originalPrice?: string;
    finalPrice?: string;
}

interface CoffretDecouverteClientProps {
    mode: "promo" | "coffret";
    badge: string;
    headingRegular: string;
    headingScript: string;
    slides: ShowcaseSlide[];
}

export default function CoffretDecouverteClient({
    mode,
    badge,
    headingRegular,
    headingScript,
    slides,
}: CoffretDecouverteClientProps) {
    const sectionRef = useRef<HTMLElement>(null);
    const imagesRef = useRef<HTMLImageElement[]>([]);
    const slideRefs = useRef<HTMLDivElement[]>([]);
    const [activeSlide, setActiveSlide] = useState(0);

    const flatImages = slides.flatMap((slide, slideIdx) =>
        slide.images.map((src) => ({
            src,
            slideIdx,
            alt: slide.title,
            discountPercent: slide.discountPercent,
        }))
    );

    // 1. Carrousel d'images uniquement (pilote activeSlide proprement)
    useGSAP(
        () => {
            const images = imagesRef.current.filter(Boolean);
            if (!images.length) return;

            gsap.set(images, { opacity: 0 });
            gsap.set(images[0], { opacity: 1 });

            if (flatImages.length <= 1) return;

            const tl = gsap.timeline({ repeat: -1 });

            flatImages.forEach((_, i) => {
                const nextIndex = (i + 1) % flatImages.length;
                const nextSlideIdx = flatImages[nextIndex].slideIdx;

                tl.to(
                    images[nextIndex],
                    {
                        opacity: 1,
                        duration: 1.2,
                        ease: "power2.inOut",
                        onStart: () => setActiveSlide(nextSlideIdx),
                    },
                    "+=3.5"
                ).to(
                    images[i],
                    {
                        opacity: 0,
                        duration: 1.2,
                        ease: "power2.inOut",
                    },
                    "<"
                );
            });
        },
        { scope: sectionRef, dependencies: [slides.length, flatImages.length] }
    );

    // 2. Transition fluide du texte à chaque changement de activeSlide (aucun conflit de boucle)
    useGSAP(
        () => {
            const contents = slideRefs.current.filter(Boolean);
            if (!contents.length) return;

            contents.forEach((el, idx) => {
                if (idx === activeSlide) {
                    gsap.to(el, {
                        autoAlpha: 1,
                        y: 0,
                        duration: 0.65,
                        ease: "power3.out",
                        overwrite: "auto",
                    });
                } else {
                    gsap.to(el, {
                        autoAlpha: 0,
                        y: 12,
                        duration: 0.35,
                        ease: "power2.in",
                        overwrite: "auto",
                    });
                }
            });
        },
        { scope: sectionRef, dependencies: [activeSlide, slides.length] }
    );

    // 3. Animation d'entrée de la section au scroll (sans reverse brutal qui masque le texte)
    useGSAP(
        () => {
            gsap.fromTo(
                ".coffret-reveal",
                {
                    y: 35,
                    opacity: 0,
                },
                {
                    y: 0,
                    opacity: 1,
                    stagger: 0.12,
                    duration: 0.85,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 75%",
                        once: true,
                    },
                }
            );
        },
        { scope: sectionRef }
    );

    const currentSlideData = slides[activeSlide] ?? slides[0];

    return (
        <section
            ref={sectionRef}
            className="coffret-section py-20 px-6 bg-[#FDFBF7] overflow-hidden mt-[500svh]"
            id="coffrets"
        >
            <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
                {/* Badge + Titre mobile */}
                <div className="flex flex-col gap-4 md:hidden coffret-reveal">
                    <span
                        className={`text-xs tracking-widest uppercase rounded-full px-4 py-1 w-fit border ${
                            mode === "promo"
                                ? "bg-[#5A7B6E] text-[#FDFBF7] border-[#5A7B6E]"
                                : "text-[#5A7B6E] border-[#5A7B6E]"
                        }`}
                    >
                        {badge}
                    </span>
                    <h3 className="text-4xl font-light text-[#3a4a44] leading-snug">
                        {headingRegular}{" "}
                        <span className="font-ballet text-5xl text-[#5A7B6E]">
                            {headingScript}
                        </span>
                    </h3>
                </div>

                {/* Image avec fondu enchaîné */}
                <div className="relative rounded-lg overflow-hidden aspect-4/3 shadow-xl coffret-reveal">
                    {flatImages.map((img, idx) => (
                        <img
                            key={`${img.src}-${idx}`}
                            ref={(el) => {
                                if (el) imagesRef.current[idx] = el;
                            }}
                            src={img.src}
                            alt={img.alt}
                            className="absolute inset-0 w-full h-full object-cover"
                            loading="lazy"
                        />
                    ))}

                    <div className="absolute inset-0 bg-[#5A7B6E]/10 pointer-events-none" />

                    {/* Badge pourcentage en mode promo */}
                    {mode === "promo" && currentSlideData?.discountPercent && (
                        <span className="absolute top-4 right-4 z-10 px-3.5 py-1.5 rounded-full bg-[#5A7B6E] text-[#FDFBF7] text-sm font-semibold shadow-md">
                            -{currentSlideData.discountPercent}%
                        </span>
                    )}

                    {/* Indicateurs cliquables */}
                    {slides.length > 1 && (
                        <div className="absolute bottom-4 left-4 z-10 flex items-center gap-1.5 bg-white/85 backdrop-blur-xs px-3 py-1.5 rounded-full">
                            {slides.map((s, idx) => (
                                <button
                                    key={s.id}
                                    type="button"
                                    aria-label={`Voir ${s.title}`}
                                    onClick={() => setActiveSlide(idx)}
                                    className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                                        activeSlide === idx
                                            ? "w-6 bg-[#5A7B6E]"
                                            : "w-1.5 bg-[#5A7B6E]/35 hover:bg-[#5A7B6E]/60"
                                    }`}
                                />
                            ))}
                        </div>
                    )}
                </div>

                {/* Contenu */}
                <div className="flex flex-col gap-6 coffret-reveal">
                    {/* Badge + Titre desktop */}
                    <span
                        className={`hidden md:inline-flex text-xs tracking-widest uppercase rounded-full px-4 py-1 w-fit border ${
                            mode === "promo"
                                ? "bg-[#5A7B6E] text-[#FDFBF7] border-[#5A7B6E]"
                                : "text-[#5A7B6E] border-[#5A7B6E]"
                        }`}
                    >
                        {badge}
                    </span>

                    <h3 className="hidden md:block text-4xl font-light text-[#3a4a44] leading-snug">
                        {headingRegular}{" "}
                        <span className="font-ballet text-5xl text-[#5A7B6E]">
                            {headingScript}
                        </span>
                    </h3>

                    {/* Grille superposée (tous les slides gardent la hauteur max, zéro saut) */}
                    <div className="grid grid-cols-1 grid-rows-1 w-full">
                        {slides.map((slide, idx) => (
                            <div
                                key={slide.id}
                                ref={(el) => {
                                    if (el) slideRefs.current[idx] = el;
                                }}
                                style={{
                                    opacity: idx === 0 ? 1 : 0,
                                    visibility: idx === 0 ? "visible" : "hidden",
                                }}
                                className={`col-start-1 row-start-1 flex flex-col gap-5 ${
                                    activeSlide === idx
                                        ? "pointer-events-auto z-10"
                                        : "pointer-events-none z-0"
                                }`}
                            >
                                <div className="flex flex-wrap items-baseline gap-3">
                                    <h4 className="text-xl font-medium text-[#2C2C2C]">
                                        {slide.title}
                                    </h4>

                                    {slide.finalPrice && (
                                        <div className="flex items-baseline gap-2">
                                            <span className="text-lg font-bold text-[#5A7B6E]">
                                                {slide.finalPrice}
                                            </span>
                                            {slide.originalPrice && (
                                                <span className="text-sm text-gray-400 line-through">
                                                    {slide.originalPrice}
                                                </span>
                                            )}
                                        </div>
                                    )}
                                </div>

                                <p className="text-gray-500 leading-relaxed max-w-md">
                                    {slide.description}
                                </p>

                                <ul className="flex flex-col gap-2 text-sm text-gray-600">
                                    {slide.bullets.map((item) => (
                                        <li key={item} className="flex items-center gap-3">
                                            <span className="w-1.5 h-1.5 rounded-full bg-[#5A7B6E] shrink-0" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>

                                <Link
                                    href={slide.ctaHref}
                                    className="group mt-2 inline-flex items-center gap-2 bg-[#5A7B6E] hover:bg-[#4a6b5e] text-[#FDFBF7] rounded-full px-8 py-3.5 text-sm tracking-wide transition-colors duration-300 w-fit"
                                >
                                    {slide.ctaLabel}
                                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
