"use client"

import { MenuIcon, ShoppingCart, X } from 'lucide-react';
import Link from 'next/link';
import { useMemo, useRef, useState } from 'react';
import { INavItem } from './items';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import Cart from '../other/Cart';
import { useModalStore } from '@/lib/store/modalStore';
import { useCartStore } from '@/lib/store/cartStore';

function MobileMenu({ items }: { items: INavItem[] }) {

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const { openModal } = useModalStore();
    const cartItems = useCartStore((state) => state.items)

    const mobileNavRef = useRef<HTMLDivElement | null>(null);
    const overlayRef = useRef<HTMLDivElement | null>(null);
    const menuRef = useRef<HTMLUListElement | null>(null);
    const bandsRef = useRef<(HTMLDivElement | null)[]>([]);
    const tl = useRef<gsap.core.Timeline | null>(null);

    const NUM_BANDS = 4;
    const bands = useMemo(() => Array.from({ length: NUM_BANDS }), [])

    useGSAP(() => {
        if (!menuRef.current) return

        tl.current = gsap.timeline({
            paused: true,
        })

        tl.current.fromTo(
            bandsRef.current,
            { x: "600%", opacity: 0 },
            {
            x: "0%",
            opacity: 1,
            duration: 0.6,
            ease: "power2.inOut",
            stagger: 0.05
            }
        )

        tl.current.fromTo(
            menuRef.current.children,
            { y: 100, opacity: 0 },
            {
            y: 0,
            opacity: 1,
            duration: 0.3,
            stagger: 0.1
            },
            "-=0.2"
        )
    }, { scope: mobileNavRef })

    useGSAP(() => {
        if (!tl.current) return

        if (isMenuOpen) {
            tl.current.play()
        } else {
            tl.current.reverse()
        }
    }, [isMenuOpen])

    return (
        <>
            <div ref={mobileNavRef} className={`absolute w-screen h-[8vh] bg-[#7A9B8E] flex justify-between items-center px-5 z-50`}>
                <div className="flex gap-2 cursor-pointer">
                    <ShoppingCart
                        className="w-6 h-6 text-white"
                        onClick={() => {openModal(<Cart />)} }
                    />
                    <span className="text-white font-bold">{cartItems.length}</span>
                </div>

                <div className="aspect-1137/710 w-20 relative -my-4">
                    <img
                        src="/images/logo.webp"
                        alt="Logo Lumilaya"
                        width={80}      
                        height={80}      
                        loading="lazy" 
                    />
                </div>

                <div onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    {isMenuOpen ? (
                        <X className="w-8 h-8 text-white" />
                    ) : (
                        <MenuIcon className="w-8 h-8 text-white" />
                    )}
                </div>
            </div>
            
            <div
                ref={overlayRef}
                className={`fixed h-screen w-screen top-0 z-20 flex overflow-hidden pointer-events-none ${isMenuOpen ? "pointer-events-auto" : ""}`}
            >
                {bands.map((_, i) => (
                    <div
                        key={i}
                        ref={(el) => {(bandsRef.current[i] = el)}}
                        className="flex-1 bg-zinc-300 opacity-0"
                    />
                ))}
            </div> 
            {/* menu */}
            <div className={`absolute w-full pl-10 pt-15 ${isMenuOpen ? "pointer-events-auto" : "pointer-events-none"}`}>
                <ul
                    ref={menuRef}
                    className={`relative z-30 space-y-6 text-3xl mt-20 font-bold text-[#7A9B8E]`}
                >
                    {items.map((item, index) => (
                        <li
                            className="opacity-0"
                            key={index}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            <Link href={item.href}>
                                {item.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}

export default MobileMenu