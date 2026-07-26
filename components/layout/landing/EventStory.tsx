// "use client"

// import { useGSAP } from '@gsap/react'
// import gsap from 'gsap'

// function EventStory() {

//     useGSAP(() => {

//         gsap.set('.event-image', {
//             opacity: 1,
//             WebkitMaskSize: '0% 0%',
//             maskSize: '0% 0%',
//         })

//         const tl = gsap.timeline({
//             scrollTrigger: {
//                 trigger: '.events-section',
//                 start: 'top top',
//                 end: '+=100%',
//                 scrub: 1,
//                 pin: true,
//                 pinSpacing: false
//             }
//         })

//         // 1. Les images apparaissent
//         tl.to('.event-image', {
//             WebkitMaskSize: '200% 200%',
//             maskSize: '200% 200%',
//             duration: 0.5,
//             ease: 'power2.out',
//         }, 0.05)

//         // 2. Puis les rideaux s'ouvrent
//         tl.to('.curtain-left', {
//             xPercent: -100,
//         }, '+=0.05')

//         tl.to('.curtain-right', {
//             xPercent: 100,
//         }, '<')

//     })


//     return (
//         <section className="
//             events-section
//             relative
//             w-full
//             h-lvh
//             overflow-hidden
//             z-20
//         ">

//             {/* CONTENEUR GAUCHE */}
//             <div
//                 className="
//                     curtain-left
//                     absolute
//                     left-0
//                     top-0

//                     w-full
//                     h-full

//                     bg-[#5A7B6E]
//                     overflow-hidden
//                     z-20
//                 "
//                 style={{
//                         clipPath: 'polygon(0 0, 50.1% 0, 50.1% 100%, 0 100%)'
//                     }}
//             >
//                 <picture
//                     className="
//                         event-image
//                         absolute
//                         top-1/2
//                         left-1/2
//                         opacity-0
//                         w-full
//                         h-full
//                         z-20
//                         -translate-x-1/2
//                         -translate-y-1/2

//                         md:w-[80vw]
//                         md:max-w-5xl
//                         md:h-auto
//                         md:aspect-16/10
//                         md:mx-auto
//                     "
//                     style={{
//                         WebkitMaskImage: "url('/images/landing/noise.png')",
//                         maskImage: "url('/images/landing/noise.png')",

//                         WebkitMaskSize: '200% 200%',
//                         maskSize: '200% 200%',

//                         WebkitMaskPosition: 'center',
//                         maskPosition: 'center',

//                         WebkitMaskRepeat: 'no-repeat',
//                         maskRepeat: 'no-repeat',
//                     }}
//                 >
//                     <img
//                         src="/images/landing/marche-desk.webp"
//                         className="w-full h-full object-cover"
//                         alt=""
//                     />
//                 </picture>
//                 <h2 className="
//                     absolute z-15
//                     inset-0
//                     flex
//                     items-center
//                     justify-center
//                     text-center
//                     font-semibold
//                     text-white/90
//                     text-7xl
//                 ">
//                     Venez nous rencontrer
//                 </h2>
//             </div>


//             {/* CONTENEUR DROIT */}
//             <div
//                 className="
//                     curtain-right
//                     absolute
//                     right-0
//                     top-0
                                                
//                     w-full
//                     h-full

//                     bg-[#5A7B6E]
//                     overflow-hidden
//                     z-20
//                 "
//                 style={{
//                         clipPath: 'polygon(50% 0, 100% 0, 100% 100%, 50% 100%)'
//                     }}
//             >
//                 <picture
//                     className="
//                         event-image
//                         absolute
//                         top-1/2
//                         left-1/2
//                         opacity-0
//                         w-full
//                         h-full
//                         z-20
//                         -translate-x-1/2
//                         -translate-y-1/2

//                         md:w-[80vw]
//                         md:max-w-5xl
//                         md:h-auto
//                         md:aspect-16/10
//                         md:mx-auto
//                     "
//                     style={{
//                         WebkitMaskImage: "url('/images/landing/noise.png')",
//                         maskImage: "url('/images/landing/noise.png')",

//                         WebkitMaskSize: '200% 200%',
//                         maskSize: '200% 200%',

//                         WebkitMaskPosition: 'center',
//                         maskPosition: 'center',

//                         WebkitMaskRepeat: 'no-repeat',
//                         maskRepeat: 'no-repeat',
//                     }}
//                 >
//                     <img
//                         src="/images/landing/marche-desk.webp"
//                         className="w-full h-full object-cover"
//                         alt=""
//                     />
//                 </picture>
//                 <h2 className="
//                     absolute
//                     inset-0
//                     flex
//                     items-center
//                     justify-center
//                     text-center
//                     font-semibold
//                     text-white/90
//                     text-7xl
//                     z-15
//                 ">
//                     Venez nous rencontrer
//                 </h2>
//             </div>

//         </section>
//     )
// }

// export default EventStory;

"use client"

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useEffect, useRef, useState } from 'react'

function RevealGrid() {

    const gridRef = useRef<HTMLDivElement | null>(null);

    const [grid, setGrid] = useState({
        columns: 50,
        rows: 30,
    })

    const cellSize = 20

    useEffect(() => {

         const element = gridRef.current

        if (!element) return

        const updateGrid = () => {

            const {
                width,
                height
            } = element.getBoundingClientRect()

            

            const columns =
                Math.ceil(width / cellSize)

            const rows =
                Math.ceil(height / cellSize)

            setGrid({
                columns,
                rows,
            })
        }

        updateGrid()

        const resizeObserver =
            new ResizeObserver(updateGrid)

        resizeObserver.observe(
            element
        )

        return () => {
            resizeObserver.disconnect()
        }

    }, [])

    const totalCells =
        grid.columns * grid.rows

    return (
        <div
            ref={gridRef}
            className={`
                reveal-grid
                absolute
                inset-0
                z-10
                grid
                -translate-x-px
            `}
            style={{
                gridTemplateColumns:
                    `repeat(${grid.columns}, 20px)`,

                gridTemplateRows:
                    `repeat(${grid.rows}, 20px)`,
            }}
        >
            {Array.from({
                length: totalCells
            }).map((_, index) => (

                <div
                    key={index}
                    className="
                        reveal-cell
                        bg-[#6F9083]
                    "
                    style={{
                        width: `${cellSize + 1}px`,
                        height: `${cellSize + 1}px`,
                        marginRight: '-1px',
                        marginBottom: '-1px',
                    }}
                />

            ))}
        </div>
    )
}


function EventStory() {

    useGSAP(() => {

        gsap.set(".image-reveal", { opacity: 0 })

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: '.events-section',
                start: 'top top',
                end: '+=200%',
                scrub: 1,
                pin: true,
                pinSpacing: false
            }
        })

        // 1. La phrase disparaît
        tl.to('.reveal-title', {
            opacity: 0,
            duration: 0.6,
            ease: 'power2.out',
        }, 0)

        // 2. La pixelisation révèle l'image
        tl.to('.reveal-cell', {
            opacity: 0,
            stagger: {
                amount: 1,
                from: 'random',
            },
            duration: 0.05,
            ease: 'none',
        }, 0.1)

        // 3. L'image apparaît
        tl.to('.image-reveal', {
            opacity: 1,
            duration: 0.05,
        }, "<")

        // 4. Les rideaux s'ouvrent
        tl.to('.curtain-left', {
            xPercent: -100,
            duration: 0.6,
        }, '+=0.05')

        tl.to('.curtain-right', {
            xPercent: 100,
            duration: 0.6,
        }, '<')

    })


    const gridCells = Array.from({ length: 1200 })

    return (
        <section className="*
            z-20
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

                    bg-[#6F9083]
                    overflow-hidden
                    z-20
                "
                style={{
                    clipPath: 'polygon(0 0, 50.1% 0, 50.1% 100%, 0 100%)'
                }}
            >

                <h2 className="
                    reveal-title
                    bg-transparent
                    absolute
                    inset-0
                    z-20
                    flex
                    items-center
                    justify-center
                    text-center
                    text-5xl
                    font-semibold
                    text-white
                ">
                    Au-delà de l'écran. <br/>
                    Découvrez-nous en vrai.
                </h2>

                {/* IMAGE */}
                <picture
                    className="
                    image-reveal
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
                        md:aspect-16/10
                        md:mx-auto
                    "
                >
                    <img
                        src="/images/landing/marche-desk.webp"
                        className="
                            w-full
                            h-full
                            object-cover
                        "
                        alt=""
                    />
                    <RevealGrid />
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

                    bg-[#6F9083]
                    overflow-hidden
                    z-20
                "
                style={{
                    clipPath: 'polygon(50% 0, 100% 0, 100% 100%, 50% 100%)'
                }}
            >

                <h2 className="
                    reveal-title
                    absolute
                    inset-0
                    z-20
                    flex
                    items-center
                    justify-center
                    text-center
                    text-5xl
                    font-semibold
                    text-white
                ">
                    Au-delà de l'écran. <br/>
                    Découvrez-nous en vrai.
                </h2>

                {/* IMAGE */}
                <picture
                    className="
                    image-reveal
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
                        md:aspect-16/10
                        md:mx-auto
                    "
                >
                    <img
                        src="/images/landing/marche-desk.webp"
                        className="
                            w-full
                            h-full
                            object-cover
                        "
                        alt=""
                    />
                    <RevealGrid />
                </picture>
            </div>

        </section>
    )
}

export default EventStory;