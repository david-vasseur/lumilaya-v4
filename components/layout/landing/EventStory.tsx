"use client"

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

function EventStory() {

    useGSAP(() => {

        gsap.set('.event-image', {
            opacity: 0
        })

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: '.events-section',
                start: 'top top',
                end: '+=100%',
                scrub: 1,
                pin: true,
                pinSpacing: false
            }
        })

        // 1. Les images apparaissent
        tl.to('.event-image', {
            opacity: 1,
            duration: 0.2,
        }, 0.05)

        // 2. Puis les rideaux s'ouvrent
        tl.to('.curtain-left', {
            xPercent: -100,
        }, '+=0.05')

        tl.to('.curtain-right', {
            xPercent: 100,
        }, '<')

    })


    return (
        <section className="
            events-section
            relative
            w-full
            h-lvh
            overflow-hidden
        ">

            {/* CONTENEUR GAUCHE */}
            <div
                className="
                    curtain-left
                    absolute
                    left-0
                    top-0

                    w-full
                    h-full

                    bg-[#5A7B6E]
                    overflow-hidden
                    z-10
                "
                style={{
                        clipPath: 'polygon(0 0, 50.1% 0, 50.1% 100%, 0 100%)'
                    }}
            >
                <picture
                    className="
                        event-image
                        absolute
                        top-1/2
                        left-1/2
                        opacity-0
                        w-full
                        h-full

                        -translate-x-1/2
                        -translate-y-1/2

                        md:w-[80vw]
                        md:max-w-5xl
                        md:h-auto
                        md:aspect-16/10
                        md:mx-auto
                    "
                >
                    <img
                        src="/images/landing/marche-desk.webp"
                        className="w-full h-full object-cover"
                        alt=""
                    />
                </picture>
                <h2 className='absolute inset-0 font-semibold text-white/90 text-7xl'>Venez nous rencontrer !!!</h2>
            </div>


            {/* CONTENEUR DROIT */}
            <div
                className="
                    curtain-right
                    absolute
                    right-0
                    top-0
                                                
                    w-full
                    h-full

                    bg-[#5A7B6E]
                    overflow-hidden
                    z-10
                "
                style={{
                        clipPath: 'polygon(50% 0, 100% 0, 100% 100%, 50% 100%)'
                    }}
            >
                <picture
                    className="
                        event-image
                        absolute
                        top-1/2
                        left-1/2
                        opacity-0
                        w-full
                        h-full

                        -translate-x-1/2
                        -translate-y-1/2

                        md:w-[80vw]
                        md:max-w-5xl
                        md:h-auto
                        md:aspect-16/10
                        md:mx-auto
                    "
                >
                    <img
                        src="/images/landing/marche-desk.webp"
                        className="w-full h-full object-cover"
                        alt=""
                    />
                </picture>
                <h2 className='absolute inset-0 font-semibold text-white/90 text-7xl'>Venez nous rencontrer !!!</h2>
            </div>

        </section>
    )
}

export default EventStory;