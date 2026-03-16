"use client"

import { create } from "zustand"

interface DeviceState {
    isMobile: boolean
    setIsMobile: (value: boolean) => void
    detectDevice: () => () => void
}

export const useDeviceStore = create<DeviceState>((set) => ({
    isMobile:
        typeof window !== "undefined"
        ? window.matchMedia("(max-width:768px)").matches
        : false,

    setIsMobile: (value) => set({ isMobile: value }),

    detectDevice: () => {
        const media = window.matchMedia("(max-width:768px)")

        const check = () => set({ isMobile: media.matches })

        media.addEventListener("change", check)

        return () => media.removeEventListener("change", check)
    },
}));