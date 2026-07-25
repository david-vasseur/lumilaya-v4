"use client"

import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/all';
import GoldCurtainProductCard from '@/components/ui/NewBestProductCard';

function BestComponent() {

    const carouselRef = useRef<HTMLDivElement | null>(null);
    const [activeIndex, setActiveIndex] = useState<number>(0);
    const [isCarouselVisible, setIsCarouselVisible] = useState<boolean>(false);

    useGSAP(() => {
        ScrollTrigger.create({
            trigger: carouselRef.current,
            start: "top 75%",
            end: "bottom 25%",

            onEnter: () => {
                setIsCarouselVisible(true);
            },

            onEnterBack: () => {
                setIsCarouselVisible(true);
            },

            onLeave: () => {
                setIsCarouselVisible(false);
            },

            onLeaveBack: () => {
                setIsCarouselVisible(false);
            },
        });
    }, {
        scope: carouselRef,
    });
    

    const handleScroll = () => {
        if (!carouselRef.current) return;

        const scrollLeft = carouselRef.current.scrollLeft;
        const cardWidth = carouselRef.current.offsetWidth;

        const index = Math.round(scrollLeft / cardWidth);

        setActiveIndex(index);
    };

    return (
        <section className="my-20 pb-20">
            <div
                ref={carouselRef}
                onScroll={handleScroll}
                className="
                    flex
                    flex-row
                    gap-5
                    overflow-x-auto
                    snap-x
                    snap-mandatory
                    scrollbar-none
                    p-[7.5vw]
                    md:overflow-visible
                    md:px-0
                    md:justify-center
                "
            >
                <div className="shrink-0 w-[85vw] snap-center md:w-auto">
                    <GoldCurtainProductCard
                        productImage="/images/products/liberation.webp"
                        productTitle="Bougie Libération"
                        productPrice="32"
                        productType="Gold"
                        isActive={activeIndex === 0 && isCarouselVisible}
                        href={"#"}
                    />
                </div>
        
                <div className="shrink-0 w-[85vw] snap-center md:w-auto">
                    <GoldCurtainProductCard
                        productImage="/images/products/protection.webp"
                        productTitle="Bougie Protection"
                        productPrice="32"
                        productType="Silver"
                        isActive={activeIndex === 1 && isCarouselVisible}
                        href={"#"}
                    />
                </div>
        
                <div className="shrink-0 w-[85vw] snap-center md:w-auto">
                    <GoldCurtainProductCard
                        productImage="/images/products/instantete.webp"
                        productTitle="Bougie Instant d'été"
                        productPrice="19,90"
                        productType="Bronze"
                        isActive={activeIndex === 2 && isCarouselVisible}
                        href={"#"}
                    />
                </div>
            </div>
        
            {/* Puces */}
            <div className="flex justify-center gap-2 mt-6 md:hidden">
                {[0, 1, 2].map((index) => (
                    <button
                        key={index}
                        onClick={() => {
                            carouselRef.current?.scrollTo({
                                left: index * carouselRef.current.offsetWidth,
                                behavior: "smooth",
                            });
                        }}
                        className={`w-2 h-2 rounded-full transition-all ${
                            activeIndex === index
                                ? "bg-black scale-125"
                                : "bg-black/30"
                        }`}
                    />
                ))}
            </div>
        </section>
    )
}

export default BestComponent;