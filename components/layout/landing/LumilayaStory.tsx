"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
    Leaf,
    Heart,
    ShieldCheck,
    Hand,
    Award,
    Truck,
    Star,
} from "lucide-react";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

interface LumiLayaStoryProps {
    onComplete?: () => void;
}

export default function LumiLayaStory({
    onComplete,
}: LumiLayaStoryProps) {
    /* =========================
       REFS
    ========================= */

    const sectionRef = useRef<HTMLElement>(null);

    // INTRO
    const introLeftRef = useRef<HTMLDivElement>(null);
    const introRightRef = useRef<HTMLDivElement>(null);

    // STEP 1 — INGREDIENTS
    const ingredientsRef = useRef<HTMLDivElement>(null);

    // STEP 2 — SAVOIR-FAIRE
    const craftRef = useRef<HTMLDivElement>(null);

    // STEP 3 — PREMIUM
    const premiumRef = useRef<HTMLDivElement>(null);

    // OUTRO
    const outroRef = useRef<HTMLDivElement>(null);
    const outroLeftRef = useRef<HTMLDivElement>(null);
    const outroRightRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const timeline = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: () => `+=${window.innerHeight * 5}`,
                    pin: true,
                    pinSpacing: false,
                    scrub: true,
                    invalidateOnRefresh: true,
                },
            });

            /* =====================================================
               0.0 → 0.3
               INTRO — OUVERTURE DES DEUX PANNEAUX
            ===================================================== */

            timeline

                .to(
                    introLeftRef.current,
                    {
                        xPercent: -50,
                        duration: 0.2,
                        ease: "power3.inOut",
                    },
                    0
                )

                .to(
                    introRightRef.current,
                    {
                        xPercent: 50,
                        duration: 0.2,
                        ease: "power3.inOut",
                    },
                    0
                )

                /* =====================================================
                   0.3 → 0.5
                   STEP 1 — INGREDIENTS
                ===================================================== */

            

                /* =====================================================
                   0.5 → 0.7
                   STEP 2 — SAVOIR-FAIRE
                ===================================================== */
                

                .to(
                    craftRef.current,
                    {
                        clipPath: "inset(0% 0 0 0)",
                        duration: 0.2,
                        ease: "power3.inOut",
                    },
                    0.2
                )
               

                /* =====================================================
                   0.7 → 0.9
                   STEP 3 — PREMIUM
                ===================================================== */

                .to(
                    premiumRef.current,
                    {
                        clipPath: "inset(0% 0 0 0)",
                        duration: 0.2,
                        ease: "power3.inOut",
                    },
                    0.4
                )

                /* =====================================================
                   0.7 → 0.9
                   STEP 3 — PREMIUM
                ===================================================== */

                .to(
                    outroRef.current,
                    {
                        clipPath: "inset(0% 0 0 0)",
                        duration: 0.2,
                        ease: "power3.inOut",
                    },
                    0.6
                )

                /* =====================================================
                   0.9
                   ON NETTOIE LES ANCIENS PANNEAUX
                ===================================================== */

                .set(
                    [
                        ingredientsRef.current,
                        craftRef.current,
                        premiumRef.current,
                    ],
                    {
                        autoAlpha: 0,
                    },
                    0.8
                )

                /* =====================================================
                   0.9 → 1.1
                   OUTRO — RIDEAU FINAL
                ===================================================== */

                .to(
                    outroLeftRef.current,
                    {
                        xPercent: -50,
                        duration: 0.2,
                        ease: "power3.inOut",
                    },
                    0.8
                )

                .to(
                    outroRightRef.current,
                    {
                        xPercent: 50,
                        duration: 0.2,
                        ease: "power3.inOut",
                    },
                    0.8
                )

                .add(() => {
                    onComplete?.();
                });
        },
        {
            scope: sectionRef,
        }
    );

    return (
        <section
            ref={sectionRef}
            className="relative isolate z-10 h-lvh w-full overflow-hidden bg-transparent text-zinc-100"
        >
            {/* =====================================================
                INTRO
            ===================================================== */}

            <div className="absolute inset-0 z-50 h-full w-full">
                {/* LEFT */}

                <div
                    ref={introLeftRef}
                    className="absolute inset-0 flex h-full w-full flex-col items-center justify-center bg-[#6F9083] p-6 text-center"
                    style={{
                        clipPath:
                            "polygon(0 0, 50% 0, 50% 100%, 0 100%)",
                    }}
                >
                    <div className="mb-8 block">
                        <img src="/images/logo.webp" alt="" className="w-40" />
                    </div>

                    <h2 className="font-ballet text-6xl md:text-8xl">
                        Les bougies Lumi'laya, c'est...
                    </h2>

                    <p className="mx-auto mt-8 max-w-2xl text-xl leading-relaxed text-white/75 md:text-2xl">
                        Des créations pensées pour transformer un simple
                        moment en véritable parenthèse.
                    </p>
                </div>

                {/* RIGHT */}

                <div
                    ref={introRightRef}
                    className="absolute inset-0 flex h-full w-full flex-col items-center justify-center bg-[#6F9083] p-6 text-center"
                    style={{
                        clipPath:
                            "polygon(50% 0, 100% 0, 100% 100%, 50% 100%)",
                    }}
                >
                    <div className="mb-8 block">
                        <img src="/images/logo.webp" alt="" className="w-40" />
                    </div>

                    <h2 className="font-ballet text-6xl md:text-8xl">
                        Les bougies Lumi'laya, c'est...
                    </h2>

                    <p className="mx-auto mt-8 max-w-2xl text-xl leading-relaxed text-white/75 md:text-2xl">
                        Des créations pensées pour transformer un simple
                        moment en véritable parenthèse.
                    </p>
                </div>
            </div>

            {/* =====================================================
                STEP 1 — LA MATIÈRE
            ===================================================== */}

            <div
                ref={ingredientsRef}
                className="absolute inset-0 z-10 h-full w-full overflow-hidden bg-[#879F94]"
            >
                <div className="mx-auto flex h-full w-full max-w-7xl flex-col px-6 py-8 md:grid md:grid-cols-2 md:items-center md:gap-20 md:px-16 md:py-16">

                    {/* IMAGE */}

                    <div className="relative h-[32vh] min-h-55 w-full shrink-0 overflow-hidden rounded-3xl md:order-1 md:h-[70vh] md:min-h-0">
                        <img
                            src="/images/landing/quality_1.webp"
                            alt=""
                            className="h-full w-full object-cover"
                        />
                    </div>

                    {/* CONTENT */}

                    <div className="flex min-h-0 flex-1 flex-col justify-center overflow-hidden py-8 md:order-2 md:py-0">

                        <span className="text-xs uppercase tracking-[0.3em] text-white/60 md:text-sm">
                            01 — La matière
                        </span>

                        <h2 className="mt-4 font-ballet text-4xl leading-[0.95] sm:text-5xl md:mt-6 md:text-7xl">
                            Tout commence par ce que l'on choisit.
                        </h2>

                        <h3 className="mt-4 text-lg font-light text-white/80 md:mt-6 md:text-2xl">
                            Des ingrédients simples. Des choix exigeants.
                        </h3>

                        <p className="mt-5 max-w-xl text-base leading-relaxed text-white/70 md:mt-8 md:text-lg">
                            Cire végétale, parfums soigneusement sélectionnés et mèches
                            en coton. Chaque élément est choisi pour créer une combustion
                            douce et une atmosphère agréable.
                        </p>

                        <div className="mt-6 space-y-4 md:mt-10 md:space-y-5">
                            <Feature
                                icon={<Leaf className="h-5 w-5" />}
                                title="Cire végétale"
                                description="Soja & coco premium"
                            />

                            <Feature
                                icon={<Heart className="h-5 w-5" />}
                                title="Parfums sélectionnés"
                                description="Des senteurs délicates"
                            />

                            <Feature
                                icon={<ShieldCheck className="h-5 w-5" />}
                                title="Mèche en coton"
                                description="Une combustion propre"
                            />
                        </div>

                    </div>
                </div>
            </div>

            {/* =====================================================
                STEP 2 — SAVOIR-FAIRE
            ===================================================== */}

            <div
                ref={craftRef}
                className="absolute inset-0 z-20 h-full w-full overflow-hidden bg-[#7A9B8E]"
                style={{
                    clipPath: "inset(100% 0 0 0)",
                }}
            >
                <div className="mx-auto flex h-full w-full max-w-7xl flex-col px-6 py-8 md:grid md:grid-cols-2 md:items-center md:gap-20 md:px-16 md:py-16">

                    {/* IMAGE */}

                    <div className="relative h-[32vh] min-h-55 w-full shrink-0 overflow-hidden rounded-3xl md:h-[70vh]">
                        <img
                            src="/images/landing/quality_2.webp"
                            alt=""
                            className="h-full w-full object-cover"
                        />
                    </div>

                    {/* CONTENT */}

                    <div className="flex min-h-0 flex-1 flex-col justify-center overflow-hidden py-8 md:py-0">

                        <span className="text-xs uppercase tracking-[0.3em] text-white/60 md:text-sm">
                            02 — Le geste
                        </span>

                        <h2 className="mt-4 font-ballet text-4xl leading-[0.95] sm:text-5xl md:mt-6 md:text-7xl">
                            Une bougie ne se fabrique pas.
                        </h2>

                        <h3 className="mt-4 text-lg font-light text-white/80 md:mt-6 md:text-2xl">
                            Elle se façonne.
                        </h3>

                        <p className="mt-5 max-w-xl text-base leading-relaxed text-white/70 md:mt-8 md:text-lg">
                            Dans notre atelier en Occitanie, chaque bougie est coulée à
                            la main, en petite série, avec le temps et l'attention
                            nécessaires à un travail d'artisan.
                        </p>

                        <div className="mt-6 space-y-4 md:mt-10 md:space-y-5">
                            <Feature
                                icon={<Hand className="h-5 w-5" />}
                                title="Coulée à la main"
                                description="Chaque geste compte"
                            />

                            <Feature
                                icon={<Award className="h-5 w-5" />}
                                title="Petites séries"
                                description="Plus d'attention, moins de quantité"
                            />

                            <Feature
                                icon={<Heart className="h-5 w-5" />}
                                title="Made in Occitanie"
                                description="Un savoir-faire local"
                            />
                        </div>

                    </div>
                </div>
            </div>

            {/* =====================================================
                STEP 3 — EXPÉRIENCE PREMIUM
            ===================================================== */}

            <div
                ref={premiumRef}
                className="absolute inset-0 z-30 h-full w-full overflow-hidden bg-[#5E7F73]"
                style={{
                    clipPath: "inset(100% 0 0 0)",
                }}
            >
                <div className="mx-auto flex h-full w-full max-w-7xl flex-col px-6 py-8 md:grid md:grid-cols-2 md:items-center md:gap-20 md:px-16 md:py-16">

                    {/* IMAGE */}

                    <div className="relative h-[32vh] min-h-55 w-full shrink-0 overflow-hidden rounded-3xl md:h-[70vh]">
                        <img
                            src="/images/landing/hero.webp"
                            alt=""
                            className="h-full w-full object-cover"
                        />
                    </div>

                    {/* CONTENT */}

                    <div className="flex min-h-0 flex-1 flex-col justify-center overflow-hidden py-8 md:py-0">

                        <span className="text-xs uppercase tracking-[0.3em] text-white/60 md:text-sm">
                            03 — L'expérience
                        </span>

                        <h2 className="mt-4 font-ballet text-4xl leading-[0.95] sm:text-5xl md:mt-6 md:text-7xl">
                            Et parce que le détail compte...
                        </h2>

                        <h3 className="mt-4 text-lg font-light text-white/80 md:mt-6 md:text-2xl">
                            Tout est pensé jusqu'à l'ouverture.
                        </h3>

                        <p className="mt-5 max-w-xl text-base leading-relaxed text-white/70 md:mt-8 md:text-lg">
                            Du choix des matières jusqu'au packaging, chaque étape est
                            pensée pour créer une expérience douce, élégante et
                            profondément personnelle.
                        </p>

                        <div className="mt-6 space-y-4 md:mt-10 md:space-y-5">
                            <Feature
                                icon={<Award className="h-5 w-5" />}
                                title="Emballage soigné"
                                description="Comme un cadeau"
                            />

                            <Feature
                                icon={<Truck className="h-5 w-5" />}
                                title="Expédition rapide"
                                description="Une attention qui arrive vite"
                            />

                            <Feature
                                icon={<Star className="h-5 w-5" />}
                                title="Une expérience premium"
                                description="Du premier regard à la dernière flamme"
                            />
                        </div>

                    </div>
                </div>
            </div>

            {/* =====================================================
                OUTRO
            ===================================================== */}

            <div
                ref={outroRef}
                className="absolute inset-0 z-40 h-full w-full"
                style={{
                    clipPath: "inset(100% 0 0 0)",
                }}
            >
                {/* LEFT */}

                <div
                    ref={outroLeftRef}
                    className="absolute inset-0 flex h-full w-full items-center justify-center bg-[#6F9083] p-6 text-center"
                    style={{
                        clipPath:
                            "polygon(0 0, 50% 0, 50% 100%, 0 100%)",
                    }}
                >
                    <div className="max-w-4xl flex flex-col items-center justify-center">
                        <div className="mb-8 block">
                            <img src="/images/logo.webp" alt="" className="w-40" />
                        </div>

                        <h2 className="font-ballet text-6xl leading-[0.9] md:text-8xl">
                            Une bougie peut être bien plus qu'une bougie.
                        </h2>

                        <p className="mt-10 text-2xl font-light leading-relaxed text-zinc-200 md:text-3xl">
                            Chaque bougie{" "}
                            <span className="font-ballet text-4xl md:text-5xl">
                                Lumi'laya
                            </span>{" "}
                            naît d'une attention : apporter dans votre espace
                            une lumière apaisante, propice au lâcher-prise et
                            à la douceur intérieure.
                        </p>
                    </div>
                </div>

                {/* RIGHT */}

                <div
                    ref={outroRightRef}
                    className="absolute inset-0 flex h-full w-full items-center justify-center bg-[#6F9083] p-6 text-center"
                    style={{
                        clipPath:
                            "polygon(50% 0, 100% 0, 100% 100%, 50% 100%)",
                    }}
                >
                    <div className="max-w-4xl flex flex-col items-center justify-center">
                        <div className="mb-8 block">
                            <img src="/images/logo.webp" alt="" className="w-40" />
                        </div>

                        <h2 className="font-ballet text-6xl leading-[0.9] md:text-8xl">
                            Une bougie peut être bien plus qu'une bougie.
                        </h2>

                        <p className="mt-10 text-2xl font-light leading-relaxed text-zinc-200 md:text-3xl">
                            Chaque bougie{" "}
                            <span className="font-ballet text-4xl md:text-5xl">
                                Lumi'laya
                            </span>{" "}
                            naît d'une attention : apporter dans votre espace
                            une lumière apaisante, propice au lâcher-prise et
                            à la douceur intérieure.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

/* =====================================================
   FEATURE
===================================================== */

function Feature({
    icon,
    title,
    description,
}: {
    icon: React.ReactNode;
    title: string;
    description: string;
}) {
    return (
        <div className="flex items-center gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/20">
                {icon}
            </div>

            <div>
                <p className="font-medium">
                    {title}
                </p>

                <p className="text-sm text-white/60">
                    {description}
                </p>
            </div>
        </div>
    );
}