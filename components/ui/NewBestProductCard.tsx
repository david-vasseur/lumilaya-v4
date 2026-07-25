"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";


type ProductType = "Gold" | "Silver" | "Bronze";

interface GoldCurtainProductCardProps {
    productImage: string;
    productTitle: string;
    productPrice: string;
    productType?: ProductType;
    isActive?: boolean;
    href: string
}

export default function GoldCurtainProductCard({ productImage, productTitle, productPrice, productType = "Gold", isActive = false, href}: GoldCurtainProductCardProps) {
    
    console.log( productType, isActive);
    

    const sectionRef = useRef<HTMLElement>(null);

    const cardRef = useRef<HTMLAnchorElement | null>(null);
    const goldLeftRef = useRef<HTMLDivElement>(null);
    const goldRightRef = useRef<HTMLDivElement>(null);
    const shineRef = useRef<HTMLDivElement>(null);
    const mobileTimelineRef = useRef<gsap.core.Timeline | null>(null);
    const revealBg = (productType: string) => {
        if (productType === "Gold") {
            return "bg-gradient-to-br from-[#F2DFA6] via-[#C9A86A] to-[#8D6B35]";
        }

        if (productType === "Silver") {
            return "bg-gradient-to-br from-[#F1F1EE] via-[#BFC4C2] to-[#747B79]";
        }

        if (productType === "Bronze") {
            return "bg-gradient-to-br from-[#E8C7B8] via-[#B9826A] to-[#70483E]";
        }

        return "bg-[#7A9B8E]";
    };

    const playAnimation = () => {

        const timeline = gsap.timeline();

        timeline.fromTo(
            cardRef.current,
            {
                scale: 0.88,
                opacity: 0,
            },
            {
                scale: 1,
                opacity: 1,
                duration: 0.5,
                ease: "power3.out",
            }
        );

        timeline.to(
            goldLeftRef.current,
            {
                xPercent: -100,
                duration: 0.8,
                ease: "power4.inOut",
            },
            0
        );

        timeline.to(
            goldRightRef.current,
            {
                xPercent: 100,
                duration: 0.8,
                ease: "power4.inOut",
            },
            "<"
        );

        timeline.fromTo(
            shineRef.current,
            {
                xPercent: -150,
                opacity: 0,
            },
            {
                xPercent: 150,
                opacity: 0.8,
                duration: 0.8,
                ease: "power2.inOut",
            },
            "-=0.5"
        );
    };

    useGSAP(
        () => {

            const mm = gsap.matchMedia();

            const overlapByProductType = {
                Gold: "-=0.45",
                Silver: "-=0.25",
                Bronze: "-=0.05",
            }; 

            const position = overlapByProductType[productType];

            mm.add("(max-width: 767px)", () => {
                const timeline = gsap.timeline({
                    paused: true,
                });

                timeline.fromTo(
                    cardRef.current,
                    {
                        scale: 0.88,
                        opacity: 0,
                    },
                    {
                        scale: 1,
                        opacity: 1,
                        duration: 0.5,
                        ease: "power3.out",
                    }
                );

                timeline.to(
                    goldLeftRef.current,
                    {
                        xPercent: -100,
                        duration: 0.8,
                        ease: "power4.inOut",
                    },
                    0
                );

                timeline.to(
                    goldRightRef.current,
                    {
                        xPercent: 100,
                        duration: 0.8,
                        ease: "power4.inOut",
                    },
                    "<"
                );

                timeline.fromTo(
                    shineRef.current,
                    {
                        xPercent: -150,
                        opacity: 0,
                    },
                    {
                        xPercent: 150,
                        opacity: 0.8,
                        duration: 0.8,
                        ease: "power2.inOut",
                    },
                    "-=0.5"
                );

                mobileTimelineRef.current = timeline;

                return () => {
                    mobileTimelineRef.current = null;
                };
            });


            mm.add("(min-width: 768px)", () => {

                const timeline = gsap.timeline({
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 75%",
                        end: "top 25%",
                        scrub: 1,
                        markers: true,
                    },
                });

                /*
                =====================================================
                1. LA CARD APPARAÎT
                =====================================================
                */

                timeline.fromTo(
                    cardRef.current,
                    {
                        scale: 0.88,
                        opacity: 0,
                    },
                    {
                        scale: 1,
                        opacity: 1,
                        duration: 0.5,
                        ease: "power3.out",
                    }
                );

                /*
                =====================================================
                2. LE RIDEAU DORÉ S'OUVRE
                =====================================================
                */

                timeline.to(
                    goldLeftRef.current,
                    {
                        xPercent: -100,
                        duration: 0.8,
                        ease: "power4.inOut",
                    },
                    position
                );

                timeline.to(
                    goldRightRef.current,
                    {
                        xPercent: 100,
                        duration: 0.8,
                        ease: "power4.inOut",
                    },
                    "<"
                );

                /*
                =====================================================
                3. REFLET FINAL
                =====================================================
                */

                timeline.fromTo(
                    shineRef.current,
                    {
                        xPercent: -150,
                        opacity: 0,
                    },
                    {
                        xPercent: 150,
                        opacity: 0.8,
                        duration: 0.8,
                        ease: "power2.inOut",
                    },
                    "-=0.5"
                )
            })
        },
        {
            scope: sectionRef,
        }
    );

    useGSAP(() => {
        const timeline = mobileTimelineRef.current;

        if (!timeline) return;

        if (isActive) {
            timeline.play();
        } else {
            timeline.reverse();
        }
    }, {
        dependencies: [isActive],
    });

    return (
        <section
            ref={sectionRef}
            className="flex min-h-[50vh] aspect-4/5 items-center justify-center bg-[#F4F1EA] shrink-0"
        >
            <Link
                ref={cardRef}
                className="
                    relative
                    aspect-4/5
                    w-full
                    max-w-105
                    overflow-hidden
                    rounded-4xl
                    bg-[#E8E5DC]
                    opacity-0
                    shadow-[0_30px_80px_rgba(50,50,40,0.18)]
                "
                href={href}
            >
                {/* =====================================================
                    IMAGE
                ===================================================== */}

                <img
                    src={productImage}
                    alt="Fleur de coton"
                    className="
                        absolute
                        inset-0
                        h-full
                        w-full
                        object-cover
                    "
                />

                {/* =====================================================
                    GRADIENT
                ===================================================== */}

                <div
                    className="
                        absolute
                        inset-0
                        bg-linear-to-t
                        from-black/75
                        via-black/10
                        to-transparent
                    "
                />

                {/* =====================================================
                    COLLECTION
                ===================================================== */}

                <div className="absolute left-6 top-6">
                    <span
                        className="
                            inline-flex
                            items-center
                            gap-2
                            rounded-full
                            border
                            border-white/30
                            bg-black/10
                            px-4
                            py-2
                            text-[10px]
                            uppercase
                            tracking-[0.2em]
                            text-white
                            backdrop-blur-md
                        "
                    >
                        {/* <Sparkles className="h-3 w-3" /> */}

                        Best-seller
                    </span>
                </div>

                {/* =====================================================
                    CONTENT
                ===================================================== */}

                <div className="absolute inset-x-0 bottom-0 p-7 text-white">
                    <p className="mb-3 text-xs uppercase tracking-[0.3em] text-white/60">
                        Lumi'laya
                    </p>

                    <h2 className="font-ballet text-5xl leading-none">
                        {productTitle}
                    </h2>

                    <div className="mt-6 flex items-end justify-between">
                        <p className="text-lg font-light">
                            {productPrice} €
                        </p>

                        <div
                            className="
                                flex
                                h-11
                                w-11
                                items-center
                                justify-center
                                rounded-full
                                border
                                border-white/40
                                bg-white/5
                                backdrop-blur-sm
                            "
                        >
                            <ArrowUpRight className="h-4 w-4" />
                        </div>
                    </div>
                </div>

                {/* =====================================================
                    GOLD CURTAIN — LEFT
                ===================================================== */}

                <div
                    ref={goldLeftRef}
                    className={`absolute inset-y-0 left-0 z-20 w-1/2 origin-left ${revealBg(productType)}`}
                >
                    <div
                        className="
                            absolute
                            inset-0
                            bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.35),transparent_35%)]
                        "
                    />
                </div>

                {/* =====================================================
                    GOLD CURTAIN — RIGHT
                ===================================================== */}

                <div
                    ref={goldRightRef}
                    className={`absolute inset-y-0 right-0 z-20 w-1/2 origin-right ${revealBg(productType)}`}
                >
                    <div
                        className="
                            absolute
                            inset-0
                            bg-[radial-gradient(circle_at_70%_50%,rgba(255,255,255,0.35),transparent_35%)]
                        "
                    />
                </div>

                {/* =====================================================
                    LIGHT SWEEP
                ===================================================== */}

                <div
                    ref={shineRef}
                    className="
                        pointer-events-none
                        absolute
                        inset-y-0
                        z-30
                        w-1/3
                        -skew-x-12
                        bg-linear-to-r
                        from-transparent
                        via-white/30
                        to-transparent
                        opacity-0
                    "
                />
            </Link>
        </section>
    );
}