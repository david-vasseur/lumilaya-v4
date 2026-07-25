"use client"

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

function EventStory() {

    useGSAP(() => {

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

        tl.to('.curtain-left', {
            xPercent: -100,
        }, 0.05)

        tl.to('.curtain-right', {
            xPercent: 100,
        }, 0.05)

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
                        absolute
                        top-1/2
                        left-1/2

                        w-full
                        h-full

                        -translate-x-1/2
                        -translate-y-1/2

                        md:w-[80vw]
                        md:max-w-5xl
                        md:h-auto
                        md:aspect-[16/10]
                        md:mx-auto
                    "
                >
                    <img
                        src="/images/landing/marche-desk.webp"
                        className="w-full h-full object-cover"
                        alt=""
                    />
                </picture>
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
                        absolute
                        top-1/2
                        left-1/2

                        w-full
                        h-full

                        -translate-x-1/2
                        -translate-y-1/2

                        md:w-[80vw]
                        md:max-w-5xl
                        md:h-auto
                        md:aspect-[16/10]
                        md:mx-auto
                    "
                >
                    <img
                        src="/images/landing/marche-desk.webp"
                        className="w-full h-full object-cover"
                        alt=""
                    />
                </picture>
            </div>

        </section>
    )
}

export default EventStory;