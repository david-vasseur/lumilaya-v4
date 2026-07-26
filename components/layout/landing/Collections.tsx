"use client"

import CollectionCard from '@/components/ui/CollectionCardNew';
import Title from '@/components/ui/Title';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef } from 'react';

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

        const cards = gsap.utils.toArray('.collection-card');

        gsap.from(cards, {
            y: 150,
            opacity: 0,
            scale: 0.95,
            rotateY: 10,
            stagger: 0.25,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.categories-section',
                start: 'top 80%',
                end: 'top 40%',
                scrub: 1,
            }
        });

    })

    return (
        <div className='mt-[420svh]'>
            <Title ref={titleRefs} title='Nos Collections' id='boutique' />
            <section className="categories-section py-20 px-6">    
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className='collection-card'>
                            <CollectionCard imageUrl='/images/landing/emotion_collection.webp' title='Emotions & Plaisirs' resume='Une collection aux parfums gourmands, floraux et réconfortants, pour éveiller les sens et créer du plaisir au quotidien.' href='/bougies-emotion'  />
                        </div>
                        <div className='collection-card'>
                            <CollectionCard imageUrl='/images/landing/rituel_collection.webp' title='Entre Terre & Ciel' resume='Une collection inspirée des énergies subtiles, pensée comme de petits rituels de lumière pour accompagner votre chemin intérieur.' href='/bougies-rituel'  />
                        </div>                      
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Collections;