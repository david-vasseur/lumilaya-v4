"use client";

import { IBestProduct } from "@/components/layout/landing/BestProducts";
import Title from "@/components/ui/Title";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Award, ShoppingCart, Sparkles } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

interface IBest {
  products: IBestProduct[];
}



function Best({ products }: IBest) {
  const [activeIndex, setActiveIndex] = useState(0);
  const pathName = usePathname();
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
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
        <img
            src="/images/landing/wave.svg"
            alt="image de fond"
            className="absolute inset-0 w-full h-full object-cover -z-10 transform rotate-180"
        />
      {/* ---------------- Header ---------------- */}
      {isHome && (
        <div className="max-w-7xl mx-auto text-center mb-16 px-4">
        <Title ref={titleRefs} title="Nos Best-Sellers" id="best-seller" />
        <p className="mt-6 text-[#2C2C2C]/70 max-w-2xl mx-auto">
          Les bougies préférées de notre communauté
        </p>
      </div>
      )}

      {/* ================= DESKTOP GRID ================= */}
      <div className="hidden md:grid max-w-7xl mx-auto grid-cols-2 lg:grid-cols-3 gap-8 px-4">
        {products.map((product, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-lg">
                <Link href={`/bougies-${product.collection === "Terre" ? "rituel" : "emotion"}/${product.slug}`}>
                <div className="relative aspect-square overflow-hidden rounded-t-2xl">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                    {!isHome ? (
                      <></>
                    ): (
                      <>
                        {index === 0 ? (
                            <Award className="absolute top-0 right-0 w-10 h-10" style={{ color: 'gold' }} />
                        ) : index === 1 ? (
                            <Award className="absolute top-0 right-0 w-10 h-10" style={{ color: 'silver' }} />
                        ) : (
                            <Award className="absolute top-0 right-0 w-10 h-10" style={{ color: '#cd7f32' }} />
                        )}
                      </>
                    )}
                    <div className="absolute top-4 left-4">
                        <span className="flex items-center gap-1 bg-[#7A9B8E]/80 text-zinc-200 px-3 py-1.5 rounded-full text-xs">
                        <Sparkles className="w-3 h-3 text-zinc-200" />
                        {product.collection === "Terre"
                            ? "Entre Terre & Ciel"
                            : "Émotions & Plaisirs"}
                        </span>
                    </div>
                </div>
                </Link>

                <div className="p-6">
                    <h3 className="text-xl font-light text-gray-800 mb-2">Bougie {product.name}</h3>
                    <p className="text-2xl font-medium text-[#7A9B8E] mb-4">
                        {product.variants[0].price.toFixed(2)} €
                    </p>
                    <div className="flex gap-3">
                        <button className="flex-1 flex items-center justify-center gap-2 bg-[#7A9B8E] text-white py-3 rounded-xl">
                            <ShoppingCart className="w-4 h-4" />
                            Ajouter
                        </button>

                        <Link
                            href={`/bougies-${product.collection === "Terre" ? "rituel" : "emotion"}/${product.slug}`}
                            className="flex-1 flex items-center justify-center border-2 border-[#7A9B8E] text-[#7A9B8E] py-3 rounded-xl"
                        >
                            Découvrir
                        </Link>
                    </div>
                </div>
            </div>
        ))}
      </div>

      {/* ================= MOBILE CAROUSEL ================= */}
      <div className="md:hidden">
        <div
          ref={mobileTrackRef}
          className="
            flex
            overflow-x-auto
            scroll-snap-mandatory
            px-[10vw]
            scrollbar-hide
            scroll-smooth
            py-8
          "
          style={{
            scrollSnapType: 'x mandatory',
          }}
        >
          {products.map((product, index) => (
            <div
              key={index}
              ref={(el) => {(cardsRef.current[index] = el)}}
              data-index={index}
              className="
                w-[80vw]
                shrink-0
                scroll-snap-center
                mx-[2.5vw]
              "
              style={{
                scrollSnapAlign: 'center',
                scrollSnapStop: 'always', 
              }}
            >
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                {/* Image */}
                <Link
                  href={`/bougies-${product.collection === "Terre" ? "rituel" : "emotion"}/${product.slug}`}
                >
                  <div className="relative aspect-square overflow-hidden">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                    {!isHome ? (
                      <></>
                    ): (
                      <>
                        {index === 0 ? (
                            <Award className="absolute top-0 right-0 w-10 h-10" style={{ color: 'gold' }} />
                        ) : index === 1 ? (
                            <Award className="absolute top-0 right-0 w-10 h-10" style={{ color: 'silver' }} />
                        ) : (
                            <Award className="absolute top-0 right-0 w-10 h-10" style={{ color: '#cd7f32' }} />
                        )}
                      </>
                    )}

                    {/* Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="flex items-center gap-1 bg-[#7A9B8E]/80 text-zinc-200 px-3 py-1.5 rounded-full text-xs">
                        <Sparkles className="w-3 h-3" />
                        {product.collection === "Terre"
                          ? "Entre Terre & Ciel"
                          : "Émotions & Plaisirs"}
                      </span>
                    </div>
                  </div>
                </Link>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-light text-gray-800 mb-2">
                    Bougie {product.name}
                  </h3>

                  <p className="text-2xl font-medium text-[#7A9B8E] mb-6">
                    {product.variants[0].price.toFixed(2)} €
                  </p>

                  <div className="flex gap-3">
                    <button className="flex-1 flex items-center justify-center gap-2 bg-[#7A9B8E] text-white py-3 rounded-xl">
                      <ShoppingCart className="w-4 h-4" />
                      Ajouter
                    </button>

                    <Link
                      href={`/bougies-${product.collection === "Terre" ? "rituel" : "emotions"}/${product.slug}`}
                      className="flex-1 flex items-center justify-center border-2 border-[#7A9B8E] text-[#7A9B8E] py-3 rounded-xl"
                    >
                      Découvrir
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ---------------- Dots ---------------- */}
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
              aria-label={`Slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Best;
