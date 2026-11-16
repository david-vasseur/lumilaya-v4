"use client"

import Link from 'next/link'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { 
    Calendar, 
    Package, 
    ShoppingCart, 
    LogOut, 
    ArrowUpRight, 
    ShieldCheck,
    type LucideIcon 
} from 'lucide-react'
import { useAdminAuth } from '@/hooks/useAdminAuth'

type DashboardItem = {
    title: string;
    icon: LucideIcon;
    href: string;
    description: string;
    badge: string;
    colorClass: string;
    bgGlow: string;
};

const items: DashboardItem[] = [
    {
        title: "Commandes",
        icon: ShoppingCart,
        href: "/admin/dashboard/order",
        description: "Gérer, préparer et suivre l'état des commandes clients en temps réel.",
        badge: "Ventes & Suivi",
        colorClass: "bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white",
        bgGlow: "group-hover:border-blue-200 group-hover:shadow-blue-500/5"
    },
    {
        title: "Produits",
        icon: Package,
        href: "/admin/dashboard/product",
        description: "Ajouter des nouveautés, modifier les fiches, gérer les prix et les stocks.",
        badge: "Catalogue",
        colorClass: "bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white",
        bgGlow: "group-hover:border-emerald-200 group-hover:shadow-emerald-500/5"
    },
    {
        title: "Événements",
        icon: Calendar,
        href: "/admin/dashboard/event",
        description: "Organiser vos dates, salons, marchés et planifier vos prochains événements.",
        badge: "Planning",
        colorClass: "bg-purple-50 text-purple-600 group-hover:bg-purple-600 group-hover:text-white",
        bgGlow: "group-hover:border-purple-200 group-hover:shadow-purple-500/5"
    }
]

export default function Page() {
    const { handleDisconnect } = useAdminAuth();
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Animation du header
            gsap.fromTo(".dashboard-header",
                { opacity: 0, y: -20 },
                { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }
            );

            // Animation des cartes en cascade
            gsap.fromTo(".card-item",
                { opacity: 0, y: 25 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.5,
                    stagger: 0.1,
                    delay: 0.15,
                    ease: "power3.out"
                }
            );
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className="min-h-screen bg-slate-50/70 text-slate-900 flex flex-col justify-between p-4 sm:p-6 md:p-10">
            {/* Décoration de fond subtile */}
            <div className="fixed inset-0 -z-10 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] bg-size-[20px_20px] opacity-50 pointer-events-none" />

            <div className="max-w-6xl w-full mx-auto pt-4 sm:pt-8 md:pt-12">
                
                {/* HEADER */}
                <header className="dashboard-header flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-8 mb-8 border-b border-slate-200/80">
                    <div className="space-y-1">
                        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-slate-900/5 text-slate-700 text-xs font-medium mb-1">
                            <ShieldCheck className="w-3.5 h-3.5 text-slate-900" />
                            <span>Espace Administration</span>
                        </div>
                        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
                            Tableau de bord
                        </h1>
                        <p className="text-sm sm:text-base text-slate-500">
                            Sélectionnez un module pour gérer votre activité.
                        </p>
                    </div>

                    {/* Bouton Déconnexion (Desktop & Mobile) */}
                    <button 
                        onClick={handleDisconnect}
                        className="self-start sm:self-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-slate-700 bg-white border border-slate-200 shadow-2xs hover:bg-red-50 hover:text-red-600 hover:border-red-200 active:scale-[0.98] transition-all duration-200 cursor-pointer w-full sm:w-auto"
                    >
                        <LogOut className="w-4 h-4" />
                        <span>Se déconnecter</span>
                    </button>
                </header>

                {/* GRILLE DES CARTES */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {items.map((item) => {
                        const Icon = item.icon;
                        return (
                            <Link 
                                key={item.title} 
                                href={item.href}
                                className="card-item group block h-full focus:outline-none"
                            >
                                <div className={`h-full rounded-2xl bg-white p-6 sm:p-7 border border-slate-200/80 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between gap-6 ${item.bgGlow}`}>
                                    
                                    {/* Haut de la carte : Icône + Badge + Flèche */}
                                    <div className="flex items-start justify-between gap-4">
                                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors duration-300 ${item.colorClass}`}>
                                            <Icon className="w-6 h-6" />
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">
                                                {item.badge}
                                            </span>
                                            <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-slate-900 group-hover:text-white transition-all duration-300">
                                                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Contenu texte */}
                                    <div className="space-y-2">
                                        <h2 className="text-xl font-semibold text-slate-900 group-hover:text-slate-700 transition-colors">
                                            {item.title}
                                        </h2>
                                        <p className="text-sm text-slate-500 leading-relaxed">
                                            {item.description}
                                        </p>
                                    </div>

                                </div>
                            </Link>
                        )
                    })}
                </div>

            </div>

            {/* FOOTER DISCRET */}
            <footer className="max-w-6xl w-full mx-auto mt-12 pt-6 border-t border-slate-200/50 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-2">
                <span>Panneau de gestion sécurisé</span>
                <span>© {new Date().getFullYear()} — Tous droits réservés</span>
            </footer>
        </div>
    )
}
