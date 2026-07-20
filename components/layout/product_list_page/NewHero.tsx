"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
    image: string;
    url: string;
    title: string;
    subtitle: string;
    collection: "Emotion" | "Entre Terre et Ciel";
}

function CollectionHero({
    image,
    url,
    title,
    subtitle,
    collection,
}: HeroProps) {

    const heroRef = useRef<HTMLElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);
    const imageLayerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const subtitleRef = useRef<HTMLParagraphElement>(null);
    const buttonRef = useRef<HTMLAnchorElement>(null);
    const storyRef = useRef<HTMLDivElement>(null);
    const story2Ref = useRef<HTMLDivElement>(null);
    const storyTextRef = useRef<HTMLDivElement>(null);
    const storyLeftRef = useRef<HTMLDivElement>(null);
    const storyRightRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
    /* =========================
       INTRO
    ========================= */

    const introTimeline = gsap.timeline();

    introTimeline
        .fromTo(
            titleRef.current,
            {
                yPercent: 100,
                opacity: 0,
                clipPath: "inset(0 0 100% 0)",
            },
            {
                yPercent: 0,
                opacity: 1,
                clipPath: "inset(0 0 0% 0)",
                duration: 1.2,
                ease: "power4.out",
            }
        )
        .fromTo(
            subtitleRef.current,
            {
                y: 30,
                opacity: 0,
            },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                ease: "power3.out",
            },
            "-=0.6"
        )
        .fromTo(
            buttonRef.current,
            {
                y: 30,
                opacity: 0,
            },
            {
                y: 0,
                opacity: 1,
                duration: 0.7,
                ease: "power3.out",
            },
            "-=0.4"
        );


    /* =========================
       SCROLL STORY
    ========================= */

    const storyTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: () => `+=${window.innerHeight * 3}`,
            pin: true,
            pinSpacing: false, 
            scrub: true,
            invalidateOnRefresh: true,
        },
    });


    storyTimeline

        // 1️⃣ L'image respire / zoom doucement
        .to(
            imageRef.current,
            {
                scale: 1.15,
                duration: 1,
                ease: "none",
            },
            0
        )

        // 2️⃣ Le contenu initial disparaît
        .to(
            contentRef.current,
            {
                yPercent: -30,
                opacity: 0,
                duration: 0.3,
                ease: "power2.in",
            },
            0
        )

        // 3️⃣ Le storytelling arrive depuis le bas
        .fromTo(
            storyRef.current,
            {
                clipPath: "inset(100% 0 0 0)",
            },
            {
                clipPath: "inset(0% 0 0 0)",
                duration: 0.3,
                ease: "power3.inOut",
            },
            0.3
        )

        .to(
            storyTextRef.current,
            { opacity: 0, y: -50, duration: 0.2 },
            0.65
        )

        .fromTo(
            story2Ref.current,
            {
                clipPath: "inset(100% 0 0 0)",
            },
            {
                clipPath: "inset(0% 0 0 0)",
                duration: 0.3,
                ease: "power3.inOut",
            },
            0.6
        )

        // 5️⃣ Pause visuelle
        .to(
            {},
            {
                duration: 0.15,
            }, 0.9
        )

        // 6️⃣ On nettoie uniquement la scène précédente
        .set(
            [
                imageRef.current,
                imageLayerRef.current,
                storyRef.current,
            ],
            {
                autoAlpha: 0,
            },
            0.9
        )

        // 7️⃣ On rend le fond de la hero transparent
        .set(
            heroRef.current,
            {
                backgroundColor: "transparent",
            },
            0.9
        )

        // 8️⃣ Ouverture des rideaux
        .to(
            storyLeftRef.current,
            {
                xPercent: -100,
                duration: 0.3,
                ease: "power2.inOut",
            },
            0.9
        )

        .to(
            storyRightRef.current,
            {
                xPercent: 100,
                duration: 0.3,
                ease: "power2.inOut",
            },
            "<"
        );

        }, {
            scope: heroRef,
        });

    return (
        <section
            ref={heroRef}
            className="relative h-lvh overflow-hidden z-2"
        >

            {/* IMAGE */}
            <div className="absolute inset-0">
                <img
                    ref={imageRef}
                    src={image}
                    alt=""
                    className="w-full h-full object-cover"
                    style={{
                        objectPosition: "center 70%",
                    }}
                />

                <div ref={imageLayerRef} className="absolute h-lvh inset-0 bg-black/40" />
            </div>

            {/* HERO CONTENT */}
            <div
                ref={contentRef}
                className="relative z-10 h-full flex items-center justify-center text-center text-white px-6"
            >
                <div className="max-w-4xl">

                    <h1
                        ref={titleRef}
                        className="text-[clamp(4rem,10vw,10rem)] font-bold leading-[0.85] tracking-tight"
                        dangerouslySetInnerHTML={{
                            __html: title,
                        }}
                    />

                    <p
                        ref={subtitleRef}
                        className="mt-8 text-lg md:text-xl max-w-2xl mx-auto text-white/80"
                        dangerouslySetInnerHTML={{
                            __html: subtitle,
                        }}
                    />

                    <Link
                        ref={buttonRef}
                        href={`/${url}/#produits`}
                        className="mt-10 inline-flex items-center gap-3 bg-white text-[#7A9B8E] px-8 py-4 rounded-full"
                    >
                        <span>
                            Découvrir la collection
                        </span>

                        <ArrowRight className="w-5 h-5" />
                    </Link>

                </div>
            </div>

            {/* STORY 1 */}
            <div
                ref={storyRef}
                className="absolute inset-0 z-10 flex items-center justify-center bg-[#87aa9c] text-zinc-100 px-6"
                style={{
                    clipPath: "inset(100% 0 0 0)",
                }}
            >
                <div
                    ref={storyTextRef}
                    className="max-w-3xl text-center"
                >
                    {collection === "Emotion" ? (
                        <>
                            <h2 className="font-ballet text-5xl md:text-7xl mb-8">
                                Une invitation à savourer STORY1
                            </h2>

                            <p className="text-lg md:text-xl leading-relaxed">
                                Chaque création Lumi'laya est pensée comme une parenthèse douce.
                                Des senteurs enveloppantes, des souvenirs tendres et cette chaleur
                                particulière qui transforme un simple instant en moment précieux.
                            </p>
                        </>
                    ) : (
                        <>
                            <h2 className="font-ballet text-5xl md:text-7xl mb-8">
                                Un instant pour revenir à soi
                            </h2>

                            <p className="text-lg md:text-xl leading-relaxed">
                                Des bougies imaginées comme des compagnons de rituel,
                                pour ralentir, écouter ses émotions et créer un espace
                                propice à l'introspection.
                            </p>
                        </>
                    )}
                </div>
            </div>

            {/* STORY 2 */}
            <div
                ref={story2Ref}
                className="absolute inset-0 bg-transparent z-20 will-change-transform"
                style={{
                    clipPath: "inset(100% 0 0 0)",
                }}
            >
                {/* LEFT */}
                <div
                    ref={storyLeftRef}
                    className="absolute inset-0 w-full h-full p-6 flex justify-center items-center text-center text-zinc-100 bg-[#7A9B8E]"
                    style={{
                        clipPath: "polygon(0 0, 50% 0, 50% 100%, 0 100%)",
                    }}
                >
                    <div className="max-w-3xl">
                        {collection === "Emotion" ? (
                            <>
                                <h2 className="font-ballet text-5xl md:text-7xl mb-8">
                                    Des parfums qui font du bien
                                </h2>

                                <p className="text-lg md:text-xl leading-relaxed">
                                    Des créations imaginées autour de la douceur, de la gourmandise
                                    et de ces petits instants qui réchauffent le cœur.
                                    <br />
                                    Plus qu'une bougie parfumée, une parenthèse à vivre.
                                </p>
                            </>
                        ) : (
                            <>
                                <h2 className="font-ballet text-5xl md:text-7xl mb-8">
                                    Des flammes pour accompagner le chemin intérieur
                                </h2>

                                <p className="text-lg md:text-xl leading-relaxed">
                                    Des bougies pensées comme des supports de rituel,
                                    associées à des pierres naturelles et à des intentions particulières.
                                    <br />
                                    Plus qu'une bougie, un point d'ancrage pour revenir à soi.
                                </p>
                            </>
                        )}
                    </div>
                </div>

                {/* RIGHT */}
                <div
                    ref={storyRightRef}
                    className="absolute inset-0 w-full h-full p-6 flex justify-center items-center text-center text-zinc-100 bg-[#7A9B8E]"
                    style={{
                        clipPath: "polygon(50% 0, 100% 0, 100% 100%, 50% 100%)",
                    }}
                >
                    <div className="max-w-3xl">
                        {collection === "Emotion" ? (
                            <>
                                <h2 className="font-ballet text-5xl md:text-7xl mb-8">
                                    Des parfums qui font du bien
                                </h2>

                                <p className="text-lg md:text-xl leading-relaxed">
                                    Des créations imaginées autour de la douceur, de la gourmandise
                                    et de ces petits instants qui réchauffent le cœur.
                                    <br />
                                    Plus qu'une bougie parfumée, une parenthèse à vivre.
                                </p>
                            </>
                        ) : (
                            <>
                                <h2 className="font-ballet text-5xl md:text-7xl mb-8">
                                    Des flammes pour accompagner le chemin intérieur
                                </h2>

                                <p className="text-lg md:text-xl leading-relaxed">
                                    Des bougies pensées comme des supports de rituel,
                                    associées à des pierres naturelles et à des intentions particulières.
                                    <br />
                                    Plus qu'une bougie, un point d'ancrage pour revenir à soi.
                                </p>
                            </>
                        )}
                    </div>
                </div>
            </div>

        </section>
    );
}

export default CollectionHero;