"use client"

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import React, { useRef } from 'react'

function Hero_page() {

    const imagesRef = useRef<HTMLImageElement[]>([]);
    const contentTrackRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {

        const images = imagesRef.current
        const contentTrack = contentTrackRef.current

        if (!images.length || !contentTrack) return

        gsap.set(images, { opacity: 0 })
        gsap.set(images[0], { opacity: 1 })

        const tl = gsap.timeline({ repeat: -1 })

        images.forEach((img, i) => {

            const next = images[(i + 1) % images.length]

            tl.to(next, {
                opacity: 1,
                duration: 1.5,
                ease: "power2.inOut"
            }, "+=3")

            tl.to(img, {
                opacity: 0,
                duration: 1.5,
                ease: "power2.inOut"
            }, "<")

            // slide contenu
            if (i === 1) {
                tl.to(contentTrack, {
                    x: "-50%",
                    duration: 0.8,
                    ease: "power3.inOut"
                }, "<")
            }

            if (i === 3) {
                tl.to(contentTrack, {
                    x: "0%",
                    duration: 0.8,
                    ease: "power3.inOut"
                }, "<")
            }

        })

    }, [])

    return (
        <div className="h-[80vh] relative w-screen">
            <div className='absolute inset-0 z-5 bg-linear-to-t from-20% to-80% from-[#FDFBF7] to-transparent' />
            <img
                ref={(el) => {el && (imagesRef.current[0] = el)}}
                src="/images/landing/coffret.webp"
                alt="Coffret découverte Lumi'laya"
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
            />
            <img
                ref={(el) => {el && (imagesRef.current[1] = el)}}
                src="/images/landing/coffret1.webp"
                alt="Coffret découverte Lumi'laya vue 2"
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
            />
            <img
                ref={(el) => {el && (imagesRef.current[2] = el)}}
                src="/images/landing/coffret_rit1.webp"
                alt="Coffret découverte Lumi'laya vue 2"
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
            />
            <img
                ref={(el) => {el && (imagesRef.current[3] = el)}}
                src="/images/landing/coffret_rit2.webp"
                alt="Coffret découverte Lumi'laya vue 2"
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
            />

            <div className="relative z-6 overflow-hidden w-full">
                <div ref={contentTrackRef} className="flex w-[200%] h-[80vh]">

                    {/* Slide 1 */}
                    <div className="w-1/2 h-full flex flex-col justify-end items-center gap-6 coffret-content">
                        <h1 className='text-6xl font-medium font-ballet'>Le coffret Découverte</h1>
                        <p className="text-gray-500 leading-relaxed px-10 max-w-md">
                            Quatre bougies soigneusement sélectionnées pour s'initier en douceur à l'univers <em>Émotions & Plaisirs</em>.
                        </p>
                        <Link
                            href="/coffrets/decouverte"
                            className="group mt-2 mb-30 inline-flex items-center gap-2 bg-[#5A7B6E] hover:bg-[#4a6b5e] text-[#FDFBF7] rounded-full px-8 py-3.5 text-sm tracking-wide transition-colors duration-300 w-fit"
                        >
                            Composez votre coffret
                            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                        </Link>
                    </div>

                    {/* Slide 2 */}
                    <div className="w-1/2 flex flex-col justify-end items-center gap-6 coffret-content">
                        <h1 className='text-6xl font-medium font-ballet'>Le coffret Rituel</h1>
                        <p className="text-gray-500 leading-relaxed px-10 max-w-md">
                            Offrez une expérience sensorielle complète avec notre coffret Rituel.
                        </p>
                        <Link
                            href="/coffrets/decouverte"
                            className="group mt-2 mb-30 inline-flex items-center gap-2 bg-[#5A7B6E] hover:bg-[#4a6b5e] text-[#FDFBF7] rounded-full px-8 py-3.5 text-sm tracking-wide transition-colors duration-300 w-fit"
                        >
                            Composez votre coffret
                            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                        </Link>
                    </div>
                </div>
            </div> 
        </div>
        
    )
}

export default Hero_page