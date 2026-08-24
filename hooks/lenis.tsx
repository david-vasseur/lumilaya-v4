"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll() {
    const pathname = usePathname();
    const lenisRef = useRef<Lenis | null>(null);

    // Initialisation de Lenis & GSAP
    useEffect(() => {
        const lenis = new Lenis();
        lenisRef.current = lenis;

        // 1. Mise à jour de ScrollTrigger
        lenis.on("scroll", ScrollTrigger.update);

        // 2. Nettoyage automatique de l'ancre (#) dès que l'utilisateur commence à scroller
        const handleScrollCleanHash = () => {
            if (window.location.hash) {
                window.history.replaceState(
                    null,
                    "",
                    window.location.pathname + window.location.search
                );
            }
        };

        lenis.on("scroll", handleScrollCleanHash);

        const tickerCallback = (time: number) => {
            lenis.raf(time * 1000);
        };

        gsap.ticker.add(tickerCallback);
        gsap.ticker.lagSmoothing(0);

        return () => {
            gsap.ticker.remove(tickerCallback);
            lenis.destroy();
            lenisRef.current = null;
        };
    }, []);

    // Retour en haut automatique à chaque changement de page
    useEffect(() => {
        if (lenisRef.current) {
            lenisRef.current.scrollTo(0, { immediate: true });
        }
    }, [pathname]);

    return null;
}