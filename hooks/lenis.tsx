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

        // Mise à jour de ScrollTrigger
        lenis.on("scroll", ScrollTrigger.update);

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

    // Retour en haut de page instantané sur la même page
    useEffect(() => {
        const handleScrollToTop = () => {
            if (lenisRef.current) {
                lenisRef.current.scrollTo(0, { immediate: true });
            }
        };

        window.addEventListener("triggerScrollTop", handleScrollToTop);

        return () => {
            window.removeEventListener("triggerScrollTop", handleScrollToTop);
        }

    }, [])

    // Nettoyage automatique du hash de l'ancre
    useEffect(() => {
        const handleScrollCleanHash = () => {
            if (window.location.hash) {
                window.history.replaceState(
                    null,
                    "",
                    window.location.pathname + window.location.search
                );
            }
        };

        if (lenisRef.current) {
            lenisRef.current.on("scroll", handleScrollCleanHash);
        }

        return () => {
            if (lenisRef.current) {
                lenisRef.current.off("scroll", handleScrollCleanHash);
            }
        };

    }, [])
        
    return null;
}