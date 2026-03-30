"use client"

import Link from 'next/link'
import { useEffect } from 'react'
import gsap from 'gsap'
import { Calendar, Package, ShoppingCart, type LucideIcon } from 'lucide-react'

type DashboardItem = {
    title: string;
    icon: LucideIcon;
    href: string;
    description: string;
};

const items: DashboardItem[] = [
    {
        title: "Commandes",
        icon: ShoppingCart,
        href: "/admin/dashboard/order",
        description: "Gérer et suivre les commandes"
    },
    {
        title: "Produits",
        icon: Package,
        href: "/admin/dashboard/products",
        description: "Ajouter, modifier ou supprimer des produits"
    },
    {
        title: "Événements",
        icon: Calendar,
        href: "/admin/dashboard/events",
        description: "Organiser et planifier vos événements"
    }
]

export default function Page() {
    useEffect(() => {
        gsap.fromTo(".card",
        { opacity: 0, y: 30 },
        {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power3.out"
        }
        )
    }, [])

    return (
        <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 p-6">
            <div className="max-w-5xl mx-auto pt-20">
                <h1 className="text-3xl font-bold mb-10 text-center">Dashboard Admin</h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {items.map((item) => {
                    const Icon = item.icon;
                    return (
                    <Link key={item.title} href={item.href}>
                    <div className="card cursor-pointer rounded-2xl bg-white p-6 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col gap-3">
                        <div className="w-10 h-10 flex items-center justify-center bg-gray-200 rounded-full">
                            <Icon className="w-5 h-5 text-gray-600" />
                        </div>

                        <h2 className="text-xl font-semibold">{item.title}</h2>
                        <p className="text-sm text-gray-500">{item.description}</p>
                    </div>
                    </Link>
                )})}
                </div>
            </div>
        </div>
    )
}
