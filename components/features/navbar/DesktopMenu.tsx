"use client"

import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { INavItem } from './items';
import { usePathname } from 'next/navigation';
import Cart from '../other/Cart';
import { useModalStore } from '@/lib/store/modalStore';
import { useCartStore } from '@/lib/store/cartStore';

function DesktopMenu({ items }: {items: INavItem[]}) {

    const path = usePathname();

    const { openModal } = useModalStore();
    const cartItems = useCartStore((state) => state.items)

    return (
        <div className="mx-auto px-6 py-4 flex items-center justify-between bg-[#FDFBF7]/90 backdrop-blur-sm border-b border-[#2C2C2C]/10">
            <Link href={"/"} className="flex items-center gap-2 group">
                <div className="aspect-1137/710 w-20 relative -my-4">
                    <img
                        src="/images/logo.webp"
                        alt="logo lumilaya"
                        width={80} 
                        height={80}     
                        loading="lazy" 
                    />
                </div>
            </Link>

            <div className="flex gap-8">

                {items.map((item) => (

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
                    onClick={() => {openModal(<Cart />)} }
                />
                <span className="text-[#7A9B8E] font-bold">{cartItems.length}</span>
            </div> 

        </div>
    )
}

export default DesktopMenu