"use client"

import React, { useEffect } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import gsap from 'gsap';
import { useDeviceStore } from '@/lib/store/deviceStore';

gsap.registerPlugin(ScrollTrigger, SplitText);


function Template({ children }: {children: React.ReactNode}) {

    const detectDevice = useDeviceStore((state) => state.detectDevice)

    useEffect(() => {
        const cleanup = detectDevice()
        return cleanup
    }, [detectDevice])

    return (
        <>
            {children}
        </>
    )
}

export default Template;