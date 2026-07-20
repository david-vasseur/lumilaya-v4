"use client"

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Link from "next/link";
import { useRef } from "react";

function NewHero() {

    const heroSectionRef = useRef<HTMLElement | null>(null);
	const heroBackgroundRef = useRef<HTMLDivElement | null>(null);
	const heroContentRef = useRef<HTMLDivElement | null>(null);
	const heroRevealerRef = useRef<HTMLDivElement | null>(null);
	const heroRevealerHeadingRef = useRef<HTMLHeadingElement | null>(null);
    const heroRevealerPRef = useRef<HTMLParagraphElement | null>(null);
	const heroImagesWrapperRef = useRef<HTMLDivElement | null>(null);
	const heroOutroContentRef = useRef<HTMLDivElement | null>(null);
	const heroOutroLeftRef = useRef<HTMLDivElement | null>(null);
	const heroOutroRightRef = useRef<HTMLDivElement | null>(null);
    const buttonsRef = useRef<HTMLDivElement | null>(null);
    const heroTitleRef = useRef<HTMLHeadingElement | null>(null);

    useGSAP(() => {
        const heroIntroTimeline = gsap.timeline();

        heroIntroTimeline
            .fromTo(
                heroTitleRef.current,
                {
                    yPercent: 120,
                    opacity: 0,
                    clipPath: "inset(0 0 100% 0)",
                },
                {
                    yPercent: 0,
                    opacity: 1,
                    clipPath: "inset(0 0 0% 0)",
                    duration: 1.4,
                    ease: "power4.out",
                }
            )
            .fromTo(
                buttonsRef.current,
                {
                    y: 40,
                    opacity: 0,
                },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    ease: "power3.out",
                },
                "-=0.7"
            );

    }, {
        scope: heroSectionRef,
});

	useGSAP(() => {

		{/* Tableau d'images */}
		const heroImages = gsap.utils.toArray<HTMLDivElement>(".hero-img");

		{/* Timaeline generique */}
		const heroScrollTimeline = gsap.timeline({
			scrollTrigger: {
				trigger: heroSectionRef.current,
				start: "top top",
				end: () => `+=${window.innerHeight * 7}`,
				pin: true,
				pinSpacing: false, 
				scrub: true,
				invalidateOnRefresh: true,
			}
		});

		{/* Timeline réeele */}
		heroScrollTimeline.to(
			heroBackgroundRef.current, 
			{ scale: 1, duration: 0.5 }, 0
		);
		heroScrollTimeline.to(
			heroRevealerRef.current,
			{ clipPath: "polygon(49.9% 0%, 50.1% 0%, 50.1% 100%, 49.9% 100%)", duration: 0.1 }, 0
		);
		heroScrollTimeline.to(
			heroRevealerRef.current,
			{ clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", duration: 0.3 }, 0.2
		);
		heroScrollTimeline.to(
			heroRevealerHeadingRef.current,
			{ opacity: 1, duration: 0.1 }, "<"
		);
        heroScrollTimeline.to(
			heroRevealerPRef.current,
			{ opacity: 1, duration: 0.1 }, "<0.05"
		);

		{/* Variables pour la cascade d'image */}
		const cascadeStart = 0.4;
		const cascadeStagger = 0.04;
		const cascadeDuration = 0.16;

		heroImages && heroImages.forEach((heroImage, index) => {
			heroScrollTimeline.to(
				heroImage,
				{ clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", scale: 1, duration: cascadeDuration }, cascadeStart + index* cascadeStagger
			)
		});
		heroScrollTimeline.to(
			heroOutroContentRef.current,
			{ scale: 1, duration: cascadeDuration }, cascadeStart + heroImages.length * cascadeStagger + cascadeStagger * 0.5,
		);

		heroScrollTimeline.set(
			[heroBackgroundRef.current, heroContentRef.current, heroRevealerRef.current, heroImagesWrapperRef.current],
			{ autoAlpha: 0 }, 0.7
		);
		heroScrollTimeline.set(
			heroSectionRef.current,
			{ backgroundColor: "transparent" }, 0.7
		);

		heroScrollTimeline.to(
			heroOutroLeftRef.current,
			{ xPercent: -100, duration: 0.3 }, 0.7
		);
		heroScrollTimeline.to(
			heroOutroRightRef.current,
			{ xPercent: 100, duration: 0.3 }, 0.7
		);

	})

    return (
        	<section
					ref={heroSectionRef} 
					className="hero relative w-vw h-lvh overflow-hidden z-2"
				>

					{/* HERO-BG */}
					<div 
						ref={heroBackgroundRef}
						className="hero-bg absolute top-0 left-0 w-full h-full will-change-transform scale-125"
					>
						{/* <img src="hero_desktop.webp" className="w-full h-full object-cover" alt="" /> */}
						<picture className="block w-full h-full">
							<source
								media="(max-width: 768px)"
								srcSet="/images/landing/hero_mobile1.webp"
							/>

							<img
								src="/images/landing/hero_desktop.webp"
								className="w-full h-full object-cover"
								alt=""
							/>
						</picture>
					</div>	

                    

					{/* HERO-CONTENT */}	
					<div
						ref={heroContentRef}
						className="hero-content absolute top-0 left-0 w-full h-full will-change-transform p-2 flex flex-col justify-center items-center text-center text-zinc-300"
					>
						<h1 
                            ref={heroTitleRef}
                            className="font-bold text-[clamp(7rem,10vw,12rem)] font-ballet leading-none p-6"
                        >
                            <em>Lumi'laya</em>
                        </h1>
                        {/* HERO-CTA */}
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
                                {/* <ArrowDown className="w-5 h-5 -rotate-90 xl:w-6 xl:h-6" /> */}
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
					</div>

					{/* HERO-REVEALER */}
					<div
						ref={heroRevealerRef}
						className="hero-revealer absolute top-0 left-0 w-full h-full will-change-transform bg-[#6F9083] text-zinc-300 flex flex-col justify-center items-center text-center pointer-events-none"
						style={{
							clipPath: "polygon(49.9% 50%, 50.1% 50%, 50.1% 50%, 49.9% 50%)",
						}}
					>
						<img
							src="/images/landing/footer.webp"
							className="absolute inset-0 w-full max-w-3xl m-auto h-full object-cover -z-1"
							alt=""
						/>
						<h2 
							ref={heroRevealerHeadingRef}
							className="font-bold uppercase text-[clamp(3rem,4vw,5rem)] leading-none max-w-3xl p-5 opacity-0"
						>
							<strong>Naturelle, enivrante et sacrée</strong>
						</h2>
                        <p 
                            ref={heroRevealerPRef}
                            className="font-bold text-[clamp(2rem,3vw,4rem)] leading-none max-w-3xl p-5 opacity-0"
                        >
                            <em>La bougie qui élève votre ambiance</em>
                        </p>
					</div>

					{/* HERO-IMAGES */}
					<div 
						ref={heroImagesWrapperRef}
						className="hero-images absolute top-0 left-0 w-full h-full will-change-transform pointer-events-none"
					>
						<div 
							className="hero-img absolute top-[50%] left-[50%] w-full h-full translate-x-[-50%] translate-y-[-50%] scale-0 will-change-transform"
							style={{
								clipPath: "polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)"
							}}
						>
							<img src="/images/landing/hero-1.webp" className="w-full h-full object-cover" alt="" />
						</div>
						<div 
							className="hero-img absolute top-[50%] left-[50%] w-full h-full translate-x-[-50%] translate-y-[-50%] scale-0 will-change-transform"
							style={{
								clipPath: "polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)"
							}}
						>
							<img src="/images/landing/hero-2.webp" className="w-full h-full object-cover" alt="" />
						</div>
						<div 
							className="hero-img absolute top-[50%] left-[50%] w-full h-full translate-x-[-50%] translate-y-[-50%] scale-0 will-change-transform"
							style={{
								clipPath: "polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)"
							}}
						>
							{/* <img src="/hero-3.webp" className="w-full h-full object-cover" alt="" /> */}
							<picture className="block w-full h-full">
								<source
									media="(max-width: 768px)"
									srcSet="/images/landing/hero-4-mob.webp"
								/>

								<img
									src="/images/landing/hero-4-desk.webp"
									className="w-full h-full object-cover"
									alt=""
								/>
							</picture>
						</div>
					</div>

					{/* HERO-OUTRO-CONTENT */}
					<div
						ref={heroOutroContentRef}
						className="hero-outro-content absolute top-[50%] left-[50%] w-full h-full scale-0 translate-x-[-50%] translate-y-[-50%] will-change-transform pointer-events-none"
					>
						{/* LEFT */}
						<div
							ref={heroOutroLeftRef}
							className="absolute inset-0 w-full h-full p-2 flex justify-center items-center text-center text-zinc-300 bg-[#6F9083]"
							style={{
								clipPath: "polygon(0 0, 50% 0, 50% 100%, 0 100%)",
							}}
						>
							<h2 className="font-bold uppercase text-[clamp(2rem,3vw,4rem)] leading-none">
                                Une flamme.
                                <br />
                                Une présence.
                                <br />
                                Un instant pour soi.
                            </h2>
						</div>

						{/* RIGHT */}
						<div
							ref={heroOutroRightRef}
							className="absolute inset-0 w-full h-full p-2 flex justify-center items-center text-center text-zinc-300 bg-[#6F9083]"
							style={{
								clipPath: "polygon(50% 0, 100% 0, 100% 100%, 50% 100%)",
							}}
						>
							<h2 className="font-bold uppercase text-[clamp(2rem,3vw,4rem)] leading-none">
                                Une flamme.
                                <br />
                                Une présence.
                                <br />
                                Un instant pour soi.
                            </h2>
						</div>
					</div>
				</section>
    )
}

export default NewHero;