"use client";

import { ChevronRight } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useState } from "react";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

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

    // 1. Carrousel automatique images + textes synchronisés
    useGSAP(
        () => {
            const images = imagesRef.current.filter(Boolean);
            const contents = slideRefs.current.filter(Boolean);

            if (!images.length || !contents.length) return;

            gsap.set(images, { opacity: 0 });
            gsap.set(images[0], { opacity: 1 });

            gsap.set(contents, { autoAlpha: 0, x: 24 });
            gsap.set(contents[0], { autoAlpha: 1, x: 0 });

            if (flatImages.length <= 1) return;

            const tl = gsap.timeline({ repeat: -1 });

            flatImages.forEach((item, i) => {
                const nextIndex = (i + 1) % flatImages.length;
                const nextItem = flatImages[nextIndex];
                const currentImg = images[i];
                const nextImg = images[nextIndex];

                tl.to(
                    nextImg,
                    {
                        opacity: 1,
                        duration: 1.5,
                        ease: "power2.inOut",
                        onStart: () => setActiveSlide(nextItem.slideIdx),
                    },
                    "+=3"
                );

                tl.to(
                    currentImg,
                    {
                        opacity: 0,
                        duration: 1.5,
                        ease: "power2.inOut",
                    },
                    "<"
                );

                if (item.slideIdx !== nextItem.slideIdx) {
                    const currentContent = contents[item.slideIdx];
                    const nextContent = contents[nextItem.slideIdx];

                    tl.to(
                        currentContent,
                        {
                            autoAlpha: 0,
                            x: -24,
                            duration: 0.6,
                            ease: "power3.inOut",
                        },
                        "<"
                    );

                    tl.fromTo(
                        nextContent,
                        { autoAlpha: 0, x: 24 },
                        {
                            autoAlpha: 1,
                            x: 0,
                            duration: 0.8,
                            ease: "power3.out",
                        },
                        "-=0.2"
                    );
                }
            });
        },
        { scope: sectionRef, dependencies: [slides] }
    );

    // 2. Animation d'apparition au scroll
    useGSAP(
        () => {
            const elements = gsap.utils.toArray(".coffret-reveal");

            gsap.fromTo(
                elements,
                {
                    y: 40,
                    opacity: 0,
                    scale: 0.95,
                    filter: "blur(6px)",
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
                        trigger: sectionRef.current,
                        start: "top 70%",
                        end: "bottom 30%",
                        toggleActions: "play reverse play reverse",
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

                    <div className="absolute inset-0 bg-[#5A7B6E]/10" />

                    {/* Badge pourcentage en mode promo */}
                    {mode === "promo" && currentSlideData?.discountPercent && (
                        <span className="absolute top-4 right-4 z-10 px-3.5 py-1.5 rounded-full bg-[#5A7B6E] text-[#FDFBF7] text-sm font-semibold shadow-md">
                            -{currentSlideData.discountPercent}%
                        </span>
                    )}

                    {/* Petits indicateurs si plusieurs slides */}
                    {slides.length > 1 && (
                        <div className="absolute bottom-4 left-4 z-10 flex items-center gap-1.5 bg-white/80 backdrop-blur-xs px-3 py-1.5 rounded-full">
                            {slides.map((s, idx) => (
                                <span
                                    key={s.id}
                                    className={`h-1.5 rounded-full transition-all duration-300 ${
                                        activeSlide === idx
                                            ? "w-6 bg-[#5A7B6E]"
                                            : "w-1.5 bg-[#5A7B6E]/35"
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

                    {/* Conteneur superposé des slides */}
                    <div className="relative w-full">
                        {slides.map((slide, idx) => (
                            <div
                                key={slide.id}
                                ref={(el) => {
                                    if (el) slideRefs.current[idx] = el;
                                }}
                                className={`${
                                    idx === 0 ? "relative" : "absolute inset-0"
                                } flex flex-col gap-5`}
                            >
                                <div className="flex flex-wrap items-baseline gap-3">
                                    <h4 className="text-xl font-medium text-[#2C2C2C]">
                                        {slide.title}
                                    </h4>

                                    {/* Affichage prix barré / prix promo */}
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
