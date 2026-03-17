"use client"

import EventCard from '@/components/ui/EventCard';
import Title from '@/components/ui/Title';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef } from 'react';

function Event() {

    const titleRefs = useRef<{ titleRef: HTMLHeadingElement | null; spanRef: HTMLSpanElement | null }>(null);

    const events = [
        {
            date: "18 Avril 2026",
            city: "Caissargues (30)",
            place: "Salon du bien-être",
            image: "/images/landing/salon_bien_etre.webp",
            url: "#"
        },
        {
            date: "26 avril 2026",
            city: "Saint andiol (30)",
            place: "fête du printemps",
            image: "/images/landing/fete_printemps.webp",
            url: "#"
        },
        {
            date: "10 Mai 2026",
            city: "Vedene (13)",
            place: "Marché artisanal",
            image: "/images/landing/marche_vedene.webp",
            url: "#"
        }
    ]

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

        gsap.from(".event-card", {
            y: 80,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
                trigger: ".events-section",
                start: "top 70%"
            }
        })

    })

    return (
        <section className="events-section py-24 px-6 bg-[#F5F1EB]">
            <div className="max-w-7xl mx-auto">

                <Title ref={titleRefs} title="Prochains événements" id='events' />

                <p className="text-center text-[#2C2C2C]/70 max-w-2xl mx-auto mt-6">
                    Retrouvez Lumi'laya près de chez vous lors de marchés de créateurs,
                    salons bien-être et événements artisanaux.
                </p>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12 bg-[#5A7B6E] p-4 rounded-2xl shadow-xl">

                {events.map((event, i) => (
                    <EventCard key={i} {...event} />
                ))}

                </div>

            </div>
        </section>
    )
}

export default Event