"use client"

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useRef } from 'react';

interface HeroProps {
    image: string,
    url: string,
    title: string,
    subtitle: string
}

function Hero({ image, url, title, subtitle }: HeroProps) {

    const heroRef = useRef<HTMLDivElement>(null);
    const titleRef= useRef<HTMLHeadingElement>(null);
    const textRef = useRef<HTMLParagraphElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);
    const buttonRef = useRef(null);

    useGSAP(() => {
        if (!titleRef.current || !buttonRef.current || !textRef.current) return

        const split = new SplitText(textRef.current, { type: "words" })

        const tl = gsap.timeline({ defaults: {  delay: .5 } })

        tl.from(titleRef.current, { opacity: 0, duration: 2, ease: "none" })

        tl.from(split.words, { y: 50, opacity: 0, stagger: 0.15, duration: 0.6, ease: "power2.out" },"<0.2")

        tl.fromTo(buttonRef.current, { y: 50, opacity: 0, },
            {y:0, opacity:1,duration: 0.5, ease: "none"  }, "<0.5")
        
    }, { scope: heroRef })

    useGSAP(() => {
        if (!heroRef.current || !imageRef.current) return

        gsap.to(imageRef.current, {
        scale: 1.4,
        ease: "none",
        scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
        },
        })

    }, { scope: heroRef })


    return (
        <div ref={heroRef} className="relative h-[80vh] overflow-hidden">
            <img
                ref={imageRef}
                src={image} 
                alt="image d'une bougie"
                className="absolute inset-0 w-full h-full object-cover"
                style={{ objectPosition: 'center 70%' }}
                loading="lazy"
            />
            <div className="absolute inset-0 bg-linear-to-b from- via-black/60 to-transparent" />
            {/* Contenu Hero */}
            <div className="relative h-full flex items-center justify-center">
                <div className="hero-content text-center px-6 max-w-4xl">
                    <h1 
                        ref={titleRef}
                        className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight tracking-wide"
                        dangerouslySetInnerHTML={{ __html: title }}
                    />
                    <p 
                        ref={textRef} 
                        className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-8"
                        dangerouslySetInnerHTML={{ __html: subtitle }}
                    />
                        {/* <strong className="text-xl md:text-2xl">
                            Naturelle, enivrante et sacrée
                        </strong>
                        <br />
                            La bougie qui élève votre ambiance */}
                    <Link ref={buttonRef} href={`/${url}/#produits`} className="opacity-0 inline-flex items-center gap-3 bg-white text-[#7A9B8E] px-8 py-4 rounded-full hover:bg-white/90 transition-all shadow-lg hover:shadow-xl group">
                        <span className="font-medium text-base xl:text-2xl">Découvrir la collection</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Hero;