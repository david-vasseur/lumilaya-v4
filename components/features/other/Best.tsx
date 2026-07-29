"use client";

import { IBestProduct } from "@/components/layout/landing/BestProducts";
import Title from "@/components/ui/Title";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Award, ChevronRight, ShoppingCart, Sparkles } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

interface IBest {
  products: IBestProduct[];
}



function Best({ products }: IBest) {
  const [activeIndex, setActiveIndex] = useState(0);
  const pathName = usePathname();
  const cardsRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const mobileTrackRef = useRef<HTMLDivElement>(null);
  const titleRefs = useRef<{ titleRef: HTMLHeadingElement | null; spanRef: HTMLSpanElement | null }>(null);
  const isHome = pathName === "/";
  

  /* --------------------------------
     GSAP – animation card active
  --------------------------------- */
  useGSAP(() => {

    if (!titleRefs.current?.titleRef || !titleRefs.current?.spanRef) return

    gsap.from(titleRefs.current?.titleRef, {
            y: 50,
            opacity: 0,
            duration: 1,
            scrollTrigger: {
                trigger: titleRefs.current?.titleRef,
                start: 'top 80%',
                end: 'top 60%',
                scrub: 1
            }
        })

        gsap.fromTo(titleRefs.current?.spanRef, 
            { scaleX: 0 },
            { scaleX: 1, scrollTrigger: {
                    trigger: titleRefs.current?.spanRef,
                    start: 'top 90%',
                    end: 'top 30%',
                    scrub: 1
                }  }
        )

    cardsRef.current.forEach((card, index) => {
      if (!card) return;

      gsap.to(card, {
        scale: index === activeIndex ? 1 : 0.95,
        opacity: index === activeIndex ? 1 : 0.6,
        duration: 0.4,
        ease: "power3.out",
      });
    });
  }, [activeIndex]);

  /* --------------------------------
     IntersectionObserver – mobile
  --------------------------------- */
  useEffect(() => {
    if (!mobileTrackRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute("data-index"));
            setActiveIndex(index);
          }
        });
      },
      {
        root: mobileTrackRef.current,
        threshold: 0.5,
      }
    );

    cardsRef.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  /* --------------------------------
     Scroll to card (dots)
  --------------------------------- */
  const scrollToCard = (index: number) => {
    cardsRef.current[index]?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
    });
  };

  return (
    <section
        className="relative py-20 md:py-32 overflow-hidden"

    >
      	{/* DESKTOP */} 
		<div className="hidden md:grid max-w-7xl mx-auto grid-cols-2 lg:grid-cols-3 gap-6 px-4">
			{products.map((product, index) => (
				<Link
					key={index}
					href={`/bougies-${
					product.collection === "Terre" ? "rituel" : "emotion"
					}/${product.slug}`}
					className="group relative aspect-4/5 overflow-hidden rounded-4xl bg-[#E8E6DF]"
				>
					{/* IMAGE */}
					<img
						src={product.image}
						alt={product.name}
						className="
							absolute inset-0
							h-full w-full
							object-cover
							transition-transform duration-1000 ease-out
							group-hover:scale-105
						"
					/>

					{/* OVERLAY */}
					<div
						className="
							absolute inset-0
							bg-linear-to-t
							from-black/70
							via-black/10
							to-transparent
							opacity-80
							transition-opacity duration-500
							group-hover:opacity-100
						"
					/>

					{/* COLLECTION */}
					<div className="absolute left-5 top-5">
						<span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-black/10 px-4 py-2 text-[10px] uppercase tracking-[0.2em] text-white backdrop-blur-md">
							{product.collection === "Terre"
							? "Entre Terre & Ciel"
							: "Émotions & Plaisirs"}
						</span>
					</div>

					{/* CONTENT */}
					<div className="absolute inset-x-0 bottom-0 p-7 text-white">
						<p className="mb-2 text-xs uppercase tracking-[0.25em] text-white/60">
							Lumi'laya
						</p>

						<h3 className="font-ballet text-4xl leading-none md:text-5xl">
							{product.name}
						</h3>

						<div className="mt-5 flex items-end justify-between">
							<p className="text-lg font-light">
								{product.variants[0].price.toFixed(2)} €
							</p>

							<span
								className="
									flex h-10 w-10
									items-center justify-center
									rounded-full
									border border-white/40
									transition-all duration-500
									group-hover:bg-white
									group-hover:text-[#44524c]
								"
							>
								<ChevronRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-0.5" />
							</span>
						</div>
					</div>
				</Link>
			))}
		</div>

		{/* ================= MOBILE CAROUSEL ================= */}
		<div className="md:hidden">
			<div
				ref={mobileTrackRef}
				className="flex overflow-x-auto px-[10vw] py-8 scrollbar-hide"
				style={{ scrollSnapType: "x mandatory" }}
			>
				{products.map((product, index) => {
				const url = `/bougies-${
					product.collection === "Terre" ? "rituel" : "emotion"
				}/${product.slug}`;

				return (
					<Link
					key={index}
					href={url}
					ref={(el) => {
						cardsRef.current[index] = el;
					}}
					data-index={index}
					className="
						group
						relative
						w-[80vw]
						shrink-0
						mx-[2.5vw]
						aspect-4/5
						overflow-hidden
						rounded-4xl
						bg-[#E8E6DF]
						shadow-xl
					"
					style={{
						scrollSnapAlign: "center",
						scrollSnapStop: "always",
					}}
					>
					{/* Image */}
					<img
						src={product.image}
						alt={product.name}
						className="
						absolute inset-0
						w-full h-full
						object-cover
						transition-transform duration-700
						group-active:scale-105
						"
					/>

					{/* Overlay */}
					<div className="absolute inset-0 bg-linear-to-t from-black/75 via-black/15 to-transparent" />

					{/* Badge */}
					<div className="absolute left-5 top-5">
						<span className="inline-flex items-center rounded-full border border-white/30 bg-black/10 backdrop-blur-md px-4 py-2 text-[10px] uppercase tracking-[0.2em] text-white">
						{product.collection === "Terre"
							? "Entre Terre & Ciel"
							: "Émotions & Plaisirs"}
						</span>
					</div>

					{/* Content */}
					<div className="absolute inset-x-0 bottom-0 p-6 text-white">

						<p className="text-[11px] uppercase tracking-[0.25em] text-white/60">
						Lumi'laya
						</p>

						<h3 className="mt-2 font-ballet text-5xl leading-none">
						{product.name}
						</h3>

						<div className="mt-6 flex items-end justify-between">

						<p className="text-xl font-light">
							{product.variants[0].price.toFixed(2)} €
						</p>

						<div
							className="
							flex h-11 w-11
							items-center justify-center
							rounded-full
							border border-white/40
							bg-white/10
							backdrop-blur-md
							transition-all duration-500
							group-active:bg-white
							group-active:text-[#44524c]
							"
						>
							<ChevronRight className="h-4 w-4" />
						</div>

						</div>

					</div>
					</Link>
				);
				})}
			</div>

			{/* Dots */}
			<div className="flex justify-center gap-2 mt-8">
				{products.map((_, index) => (
				<button
					key={index}
					onClick={() => scrollToCard(index)}
					className={`h-2 rounded-full transition-all duration-300 ${
					index === activeIndex
						? "w-8 bg-[#7A9B8E]"
						: "w-2 bg-[#7A9B8E]/30"
					}`}
				/>
				))}
			</div>
		</div>
    </section>
  );
}

export default Best;
