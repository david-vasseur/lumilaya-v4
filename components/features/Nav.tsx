"use client"

import { ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRef } from 'react';

function Nav() {

    const path = usePathname();
    const navRef = useRef<HTMLDivElement | null>(null)

    return (
        <nav ref={navRef} className={`fixed top-0 left-0 right-0 z-50`}>
            <div className="mx-auto px-6 py-4 flex items-center justify-between">

                    <Link href={"/"} className="flex items-center gap-2 group">
                        <div className="aspect-1137/710 w-20 relative -my-4">
                            <Image fill alt="logo lumilaya" src={"/images/logo.webp"} />
                        </div>
                    </Link>

                    <div className="flex gap-8">
                        {[
                            { label: "Accueil", href: "/" },
                            { label: "Notre histoire", href: "/notre-histoire" },
                            { label: "Bougies Emotions & Plaisirs", href: "/bougies-emotion" },
                            { label: "Bougies Entre Terre & Ciel", href: "/bougies-rituel" },
                            { label: "Mes favoris", href: "/favoris" },
                            { label: "Nous contacter", href: "/contact" },
                        ].map((item) => (

                            <Link
                                key={item.href}
                                href={item.href}
                                className={`text-sm tracking-wide transition-colors ${
                                    path === item.href
                                        ? "text-[#2C2C2C] font-medium"
                                        : "text-[#2C2C2C]/60 hover:text-[#2C2C2C]"
                                }`}
                            >
                                {item.label}
                            </Link>
                        ))}

                    </div>

                    <div className="flex gap-2 cursor-pointer">
                        <ShoppingCart
                            className="w-6 h-6 text-[#7A9B8E]"
                        />
                        <span className="text-[#7A9B8E] font-bold">0</span>
                    </div> 
                </div>
        </nav>
    )
}

export default Nav;