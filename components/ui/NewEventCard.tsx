"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
    ArrowUpRight,
    CalendarDays,
    MapPin,
} from "lucide-react";
import Link from "next/link";
import { useRef } from "react";


export interface EventCardProps {
    id: number;
    name: string;
    dateStart: string;
    dateEnd: string;
    city: string;
    postalCode: string;
    image: string;
    url: string;
}

function EventCard({
    name,
    dateStart,
    dateEnd,
    city,
    postalCode,
    image,
    url
}: EventCardProps) {

    const sectionRef =
        useRef<HTMLElement>(null);

    const cardRef =
        useRef<HTMLDivElement>(null);

    const shineRef =
        useRef<HTMLDivElement>(null);


    /*
    =====================================================
    DATE
    =====================================================
    */

    const start = new Date(dateStart);
    const end = new Date(dateEnd);

    const formattedDate =
        start.toLocaleDateString("fr-FR", {
            day: "numeric",
            month: "long",
            year: "numeric",
        }) +
        (
            start.getTime() !== end.getTime()
                ? ` — ${end.toLocaleDateString("fr-FR", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                })}`
                : ""
        );


    /*
    =====================================================
    ANIMATION
    =====================================================
    */

    useGSAP(
        () => {

            const mm = gsap.matchMedia();


            /*
            =================================================
            MOBILE
            =================================================
            */

            mm.add("(max-width: 767px)", () => {

                const timeline = gsap.timeline();


                timeline.fromTo(
                    cardRef.current,
                    {
                        scale: 0.88,
                        opacity: 0,
                    },
                    {
                        scale: 1,
                        opacity: 1,
                        duration: 0.5,
                        ease: "power3.out",
                    }
                );


                timeline.fromTo(
                    shineRef.current,
                    {
                        xPercent: -150,
                        opacity: 0,
                    },
                    {
                        xPercent: 150,
                        opacity: 0.8,
                        duration: 0.8,
                        ease: "power2.inOut",
                    },
                    "-=0.3"
                );

            });


            /*
            =================================================
            DESKTOP
            =================================================
            */

            mm.add("(min-width: 768px)", () => {

                const timeline = gsap.timeline({
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 75%",
                        end: "top 25%",
                        scrub: 1,
                    },
                });


                timeline.fromTo(
                    cardRef.current,
                    {
                        scale: 0.88,
                        opacity: 0,
                    },
                    {
                        scale: 1,
                        opacity: 1,
                        duration: 0.5,
                        ease: "power3.out",
                    }
                );


                timeline.fromTo(
                    shineRef.current,
                    {
                        xPercent: -150,
                        opacity: 0,
                    },
                    {
                        xPercent: 150,
                        opacity: 0.8,
                        duration: 0.8,
                        ease: "power2.inOut",
                    },
                    "-=0.3"
                );

            });

        },
        {
            scope: sectionRef,
        }
    );


    /*
    =====================================================
    CONTENT
    =====================================================
    */

    const content = (

        <section
            ref={sectionRef}
            className="
                flex
                min-h-[50vh]
                aspect-4/5
                items-center
                justify-center
                shrink-0
            "
        >

            <div
                ref={cardRef}
                className="
                    relative
                    aspect-4/5
                    w-full
                    max-w-105
                    overflow-hidden
                    rounded-4xl
                    bg-[#6F9083]
                    opacity-0
                    shadow-[0_30px_80px_rgba(50,50,40,0.18)]
                "
            >

                {/* IMAGE */}

                <img
                    src={image}
                    alt={name}
                    className="
                        absolute
                        inset-0
                        h-full
                        w-full
                        object-cover
                        object-top
                    "
                />


                {/* GRADIENT */}

                <div
                    className="
                        absolute
                        inset-0
                        bg-linear-to-t
                        from-black/80
                        via-black/20
                        to-transparent
                    "
                />


                {/* BADGE */}

                <div
                    className="
                        absolute
                        left-6
                        top-6
                    "
                >

                    <span
                        className="
                            inline-flex
                            items-center
                            gap-2
                            rounded-full
                            border
                            border-white/30
                            bg-black/10
                            px-4
                            py-2
                            text-[10px]
                            uppercase
                            tracking-[0.2em]
                            text-white
                            backdrop-blur-md
                        "
                    >
                        Événement
                    </span>

                </div>


                {/* CONTENT */}

                <div
                    className="
                        absolute
                        inset-x-5
                        bottom-5
                        rounded-3xl
                        border border-white/20
                        bg-black/10
                        p-6
                        text-white
                        backdrop-blur-md
                        transition-all
                        duration-700
                        group-hover:bg-white/15
                    "
                >

                    <div
                        className="
                            mb-4
                            flex
                            items-center
                            gap-2
                            text-xs
                            uppercase
                            tracking-[0.2em]
                            text-white/60
                        "
                    >

                        <CalendarDays
                            className="h-3.5 w-3.5"
                        />

                        {dateStart === dateEnd ? dateStart : `${dateStart} - ${dateEnd}`}

                    </div>


                    <h2
                        className="
                            font-ballet
                            text-5xl
                            leading-none
                        "
                    >
                        {name}
                    </h2>


                    <div
                        className="
                            mt-6
                            flex
                            items-end
                            justify-between
                            border-t
                            border-white/20
                            pt-4
                        "
                    >

                        <div
                            className="
                                flex
                                items-center
                                gap-2
                                text-sm
                                font-light
                                text-white/75
                            "
                        >

                            <MapPin
                                className="h-4 w-4"
                            />

                            <span>
                                {city} · {postalCode}
                            </span>

                        </div>


                        <div
                            className="
                                flex
                                h-11
                                w-11
                                items-center
                                justify-center
                                rounded-full
                                border
                                border-white/40
                                bg-white/5
                                backdrop-blur-sm
                            "
                        >

                            <ArrowUpRight
                                className="h-4 w-4"
                            />

                        </div>

                    </div>

                </div>


                {/* REFLET */}

                <div
                    ref={shineRef}
                    className="
                        pointer-events-none
                        absolute
                        inset-y-0
                        z-30
                        w-1/3
                        -skew-x-12
                        bg-linear-to-r
                        from-transparent
                        via-white/30
                        to-transparent
                        opacity-0
                    "
                />

            </div>

        </section>

    );


    if (url === "#") {
        return content;
    }


    return (
        <Link
            href={url}
            className="block"
        >
            {content}
        </Link>
    );
}

export default EventCard;