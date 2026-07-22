"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll() {
    useEffect(() => {
        const lenis = new Lenis();

        lenis.on("scroll", ScrollTrigger.update);

        const tickerCallback = (time: number) => {
        lenis.raf(time * 1000);
        };

        gsap.ticker.add(tickerCallback);
        gsap.ticker.lagSmoothing(0);

        return () => {
        gsap.ticker.remove(tickerCallback);
        lenis.destroy();
        };
    }, []);

    return null;
}