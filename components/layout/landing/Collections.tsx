"use client"

import CollectionCard from '@/components/ui/CollectionCard';
import Title from '@/components/ui/Title';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react'

gsap.registerPlugin(ScrollTrigger);

function Collections() {

    const brandRef = useRef(null);
    const titleRefs = useRef<{ titleRef: HTMLHeadingElement | null; spanRef: HTMLSpanElement | null }>(null);

    useGSAP(() => {

        if (!titleRefs.current?.titleRef || !titleRefs.current?.spanRef) return

        gsap.to(brandRef.current, {
            y: -200,
            duration: 1,
            scrollTrigger: {
                trigger: '.brand-section',
                start: 'top 70%',
                end: 'top 40%',
                scrub: 1
            }
        })

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

        gsap.from('.brand-text', {
        y: 80,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
            trigger: '.brand-section',
            start: 'top 70%',
            end: 'top 40%',
            scrub: 1
        }
      });

      gsap.from('.category-card', {
        y: 100,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '.categories-section',
            start: 'top 70%'
        }
      });

    })

    return (
        <>
            <section className="brand-section relative z-5 pt-32 px-6 bg-[#FDFBF7]">
                <div ref={brandRef} className="max-w-4xl relative mx-auto text-center bg-linear-to-br from-[#7A9B8E] via-[#6A8B7E] to-[#5A7B6E] px-10 py-20 overflow-hidden rounded-lg shadow-xl">
                    <p className="brand-text relative text-2xl md:text-3xl font-light text-zinc-200 leading-relaxed z-2">
                        Chaque bougie <span className="font-ballet text-4xl md:text-5xl">Lumi'laya</span> est une invitation au voyage sensoriel,
                        fabriquée à la main avec des ingrédients 100% naturels et des mèches en coton bio.
                    </p>
                    <img
                        src="/images/landing/footer.webp"
                        alt="logo"
                        className="absolute inset-0 w-full h-full object-contain"
                        loading="lazy"
                    />
                </div>
            </section>

            <Title ref={titleRefs} title='Nos Collections' id='boutique' />

            <section className="categories-section py-20 px-6">
                
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="category-card relative aspect-square overflow-hidden rounded-2xl">
                            <CollectionCard imageUrl='/images/landing/emotion_collection.webp' title='Emotions & Plaisirs' resume='Cire végétale pure, essences botaniques brutes, pour une atmosphère authentique' href='/bougies-emotion'  />
                        </div>
                        <div className="category-card relative aspect-square overflow-hidden rounded-2xl">
                            <CollectionCard imageUrl='/images/landing/rituel_collection.webp' title='Entre Terre & Ciel' resume='Compositions olfactives raffinées, notes envoûtantes, pour une expérience luxueuse' href='/bougies-rituel'  />
                        </div>                       
                    </div>
                </div>
            </section>
        </>
    )
}

export default Collections;