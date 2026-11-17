"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";

gsap.registerPlugin(ScrollTrigger);

export interface HeroSlide {
    id: string | number;
    title: string;
    subtitle: string;
    ctaLabel: string;
    ctaHref: string;
    images: string[];
}

interface CoffretHeroProps {
    slides: HeroSlide[];
    /** Active ou non le storytelling au scroll façon CollectionHero */
    enableScrollStory?: boolean;
}

export default function CoffretHero({
    slides,
    enableScrollStory = true,
}: CoffretHeroProps) {
    const heroRef = useRef<HTMLElement>(null);
    const imagesWrapperRef = useRef<HTMLDivElement>(null);
    const imageLayerRef = useRef<HTMLDivElement>(null);
    const contentWrapperRef = useRef<HTMLDivElement>(null);

    const imageRefs = useRef<HTMLImageElement[]>([]);
    const slideContentRefs = useRef<HTMLDivElement[]>([]);

    // Story refs (identiques à CollectionHero)
    const storyRef = useRef<HTMLDivElement>(null);
    const story2Ref = useRef<HTMLDivElement>(null);
    const storyTextRef = useRef<HTMLDivElement>(null);
    const storyLeftRef = useRef<HTMLDivElement>(null);
    const storyRightRef = useRef<HTMLDivElement>(null);

    const [activeSlideIndex, setActiveSlideIndex] = useState(0);

    // On aplatit toutes les images en gardant la correspondance avec l'index de slide
    const flatImages = slides.flatMap((slide, slideIdx) =>
        slide.images.map((src) => ({
            src,
            slideIdx,
            alt: slide.title,
        }))
    );

    useGSAP(
        () => {
            const imgs = imageRefs.current.filter(Boolean);
            const contents = slideContentRefs.current.filter(Boolean);

            if (!imgs.length || !contents.length) return;

            /* =========================
               1. INTRO (identique à CollectionHero)
            ========================= */
            gsap.set(imgs, { opacity: 0, scale: 1 });
            gsap.set(imgs[0], { opacity: 1 });

            gsap.set(contents, { autoAlpha: 0, y: 24 });
            gsap.set(contents[0], { autoAlpha: 1, y: 0 });

            gsap.fromTo(
                contents[0],
                { y: 40, opacity: 0 },
                { y: 0, opacity: 1, duration: 1.1, ease: "power4.out" }
            );

            /* =========================
               2. CARROUSEL AUTOMATIQUE
            ========================= */
            const autoTl = gsap.timeline({ repeat: -1 });

            flatImages.forEach((item, i) => {
                const nextIndex = (i + 1) % flatImages.length;
                const nextItem = flatImages[nextIndex];
                const currentImg = imgs[i];
                const nextImg = imgs[nextIndex];

                // Léger zoom continu pendant l'affichage (effet Ken Burns subtil)
                autoTl.to(
                    currentImg,
                    {
                        scale: 1.07,
                        duration: 4.5,
                        ease: "none",
                    },
                    `step-${i}`
                );

                // Transition vers l'image suivante
                autoTl.to(
                    nextImg,
                    {
                        opacity: 1,
                        scale: 1,
                        duration: 1.4,
                        ease: "power2.inOut",
                        onStart: () => setActiveSlideIndex(nextItem.slideIdx),
                    },
                    `step-${i}+=3.2`
                );

                autoTl.to(
                    currentImg,
                    {
                        opacity: 0,
                        duration: 1.4,
                        ease: "power2.inOut",
                    },
                    "<"
                );

                // Si l'image suivante appartient à un autre slide, on transitionne le texte
                if (item.slideIdx !== nextItem.slideIdx) {
                    const currentContent = contents[item.slideIdx];
                    const nextContent = contents[nextItem.slideIdx];

                    autoTl.to(
                        currentContent,
                        {
                            autoAlpha: 0,
                            y: -24,
                            duration: 0.6,
                            ease: "power2.in",
                        },
                        "<"
                    );

                    autoTl.fromTo(
                        nextContent,
                        { autoAlpha: 0, y: 24 },
                        {
                            autoAlpha: 1,
                            y: 0,
                            duration: 0.8,
                            ease: "power3.out",
                        },
                        "-=0.2"
                    );
                }
            });

            /* =========================
               3. SCROLL STORY (aligné sur CollectionHero)
            ========================= */
            if (!enableScrollStory) return;

            const storyTimeline = gsap.timeline({
                scrollTrigger: {
                    trigger: heroRef.current,
                    start: "top top",
                    end: () => `+=${window.innerHeight * 3}`,
                    pin: true,
                    pinSpacing: false,
                    scrub: true,
                    invalidateOnRefresh: true,
                    onUpdate: (self) => {
                        // Met en pause le carrousel auto dès qu'on scrolle dans le storytelling
                        if (self.progress > 0.05) {
                            autoTl.pause();
                        } else {
                            autoTl.resume();
                        }
                    },
                },
            });

            storyTimeline
                .to(
                    imagesWrapperRef.current,
                    { scale: 1.12, duration: 1, ease: "none" },
                    0
                )
                .to(
                    contentWrapperRef.current,
                    { yPercent: -30, opacity: 0, duration: 0.3, ease: "power2.in" },
                    0
                )
                .fromTo(
                    storyRef.current,
                    { clipPath: "inset(100% 0 0 0)" },
                    { clipPath: "inset(0% 0 0 0)", duration: 0.3, ease: "power3.inOut" },
                    0.3
                )
                .to(storyTextRef.current, { opacity: 0, y: -50, duration: 0.2 }, 0.65)
                .fromTo(
                    story2Ref.current,
                    { clipPath: "inset(100% 0 0 0)" },
                    { clipPath: "inset(0% 0 0 0)", duration: 0.3, ease: "power3.inOut" },
                    0.6
                )
                .to({}, { duration: 0.15 }, 0.9)
                .set(
                    [imagesWrapperRef.current, imageLayerRef.current, storyRef.current],
                    { autoAlpha: 0 },
                    0.9
                )
                .set(heroRef.current, { backgroundColor: "transparent" }, 0.9)
                .to(
                    storyLeftRef.current,
                    { xPercent: -100, duration: 0.3, ease: "power2.inOut" },
                    0.9
                )
                .to(
                    storyRightRef.current,
                    { xPercent: 100, duration: 0.3, ease: "power2.inOut" },
                    "<"
                );
        },
        { scope: heroRef, dependencies: [slides] }
    );

    if (!slides.length) return null;

    return (
        <section
            ref={heroRef}
            className="relative h-lvh overflow-hidden z-2 pointer-events-none"
        >
            {/* IMAGES EN ARRIÈRE-PLAN */}
            <div ref={imagesWrapperRef} className="absolute inset-0">
                {flatImages.map((img, idx) => (
                    <img
                        key={`${img.src}-${idx}`}
                        ref={(el) => {
                            if (el) imageRefs.current[idx] = el;
                        }}
                        src={img.src}
                        alt={img.alt}
                        className="absolute inset-0 w-full h-full object-cover will-change-transform"
                        style={{ objectPosition: "center 65%" }}
                    />
                ))}

                {/* Même voile sombre que CollectionHero pour un contraste parfait */}
                <div
                    ref={imageLayerRef}
                    className="absolute h-lvh inset-0 bg-black/40"
                />
            </div>

            {/* CONTENU HERO CENTRÉ (style CollectionHero) */}
            <div
                ref={contentWrapperRef}
                className="relative z-10 h-full flex items-center justify-center text-center text-white px-6"
            >
                <div className="relative w-full max-w-4xl flex items-center justify-center">
                    {slides.map((slide, idx) => (
                        <div
                            key={slide.id}
                            ref={(el) => {
                                if (el) slideContentRefs.current[idx] = el;
                            }}
                            className={`${
                                idx === 0 ? "relative" : "absolute inset-0"
                            } flex flex-col items-center justify-center`}
                        >
                            <h1
                                className="text-[clamp(3.2rem,8.5vw,8.5rem)] font-bold leading-[0.88] tracking-tight"
                                dangerouslySetInnerHTML={{ __html: slide.title }}
                            />

                            <p className="mt-8 text-lg md:text-xl max-w-2xl mx-auto text-white/85 leading-relaxed">
                                {slide.subtitle}
                            </p>

                            <Link
                                href={slide.ctaHref}
                                className="mt-10 inline-flex items-center gap-3 bg-white text-[#7A9B8E] hover:bg-[#FDFBF7] px-8 py-4 rounded-full font-medium transition-transform duration-300 hover:scale-[1.02] pointer-events-auto"
                            >
                                <span>{slide.ctaLabel}</span>
                                <ArrowRight className="w-5 h-5" />
                            </Link>
                        </div>
                    ))}
                </div>

                {/* Indicateurs discrets en bas de Hero */}
                {slides.length > 1 && (
                    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-2.5">
                        {slides.map((slide, idx) => (
                            <span
                                key={slide.id}
                                className={`h-1.5 rounded-full transition-all duration-500 ${
                                    activeSlideIndex === idx
                                        ? "w-8 bg-white"
                                        : "w-2 bg-white/40"
                                }`}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* STORY 1 (adapté aux Coffrets & Accessoires) */}
            {enableScrollStory && (
                <>
                    <div
                        ref={storyRef}
                        className="absolute inset-0 z-10 flex items-center justify-center bg-[#87aa9c] text-zinc-100 px-6"
                        style={{ clipPath: "inset(100% 0 0 0)" }}
                    >
                        <div ref={storyTextRef} className="max-w-3xl text-center md:p-20">
                            <img
                                src="/images/landing/footer.webp"
                                className="absolute inset-0 w-full max-w-3xl m-auto h-full object-cover -z-1"
                                alt=""
                            />
                            <h2 className="font-ballet font-semibold text-5xl md:text-7xl mb-8">
                                L&apos;art d&apos;offrir avec intention
                            </h2>
                            <p className="text-lg md:text-xl leading-relaxed">
                                Nos coffrets réunissent nos créations artisanales autour d&apos;une
                                même émotion ou d&apos;un rituel complet. Chaque détail est pensé
                                pour prolonger l&apos;expérience et sublimer vos instants précieux.
                            </p>
                        </div>
                    </div>

                    {/* STORY 2 (ouverture des rideaux identique à CollectionHero) */}
                    <div
                        ref={story2Ref}
                        className="absolute inset-0 bg-transparent z-20 will-change-transform"
                        style={{ clipPath: "inset(100% 0 0 0)" }}
                    >
                        {/* LEFT */}
                        <div
                            ref={storyLeftRef}
                            className="absolute inset-0 w-full h-full p-6 flex justify-center items-center text-center text-zinc-100 bg-[#7A9B8E]"
                            style={{ clipPath: "polygon(0 0, 50% 0, 50% 100%, 0 100%)" }}
                        >
                            <div className="max-w-3xl relative md:p-20">
                                <img
                                    src="/images/landing/footer.webp"
                                    className="absolute inset-0 w-full max-w-3xl m-auto h-full object-cover -z-1"
                                    alt=""
                                />
                                <h2 className="font-ballet font-semibold text-5xl md:text-7xl mb-8">
                                    Des compositions sur mesure
                                </h2>
                                <p className="text-lg md:text-xl leading-relaxed">
                                    Coffrets découverte personnalisables, rituels énergétiques et
                                    accessoires sélectionnés avec soin.
                                    <br />
                                    Tout pour créer votre atmosphère idéale.
                                </p>
                            </div>
                        </div>

                        {/* RIGHT */}
                        <div
                            ref={storyRightRef}
                            className="absolute inset-0 w-full h-full p-6 flex justify-center items-center text-center text-zinc-100 bg-[#7A9B8E]"
                            style={{ clipPath: "polygon(50% 0, 100% 0, 100% 100%, 50% 100%)" }}
                        >
                            <div className="max-w-3xl relative md:p-20">
                                <img
                                    src="/images/landing/footer.webp"
                                    className="absolute inset-0 w-full max-w-3xl m-auto h-full object-cover -z-1"
                                    alt=""
                                />
                                <h2 className="font-ballet font-semibold text-5xl md:text-7xl mb-8">
                                    Des compositions sur mesure
                                </h2>
                                <p className="text-lg md:text-xl leading-relaxed">
                                    Coffrets découverte personnalisables, rituels énergétiques et
                                    accessoires sélectionnés avec soin.
                                    <br />
                                    Tout pour créer votre atmosphère idéale.
                                </p>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </section>
    );
}
