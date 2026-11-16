"use client"

import { getOrders } from "@/lib/action/admin.action";
import { generateFingerprint } from "@/utils/dbFunction";
import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import BackButton from "@/components/ui/BackButton";
import { 
    Search, 
    Package, 
    Clock, 
    Truck, 
    CheckCircle2, 
    XCircle, 
    MapPin, 
    User, 
    ChevronRight,
    Sparkles,
    ShoppingBag,
    AlertCircle,
    type LucideIcon
} from "lucide-react";

type ShippingType = "REL" | "DOM" | "OFF";
type ShippingStatus = "PENDING" | "PROCESSING" | "SHIPPED" | "DELIVERING" | "DELIVERED" | "CANCELLED";

interface IOrder {
    id: number;
    stripeSessionId: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    shippingAddress?: string;
    shippingCity: string;
    shippingPostalCode?: string;
    shippingCountry?: string;
    shippingType?: ShippingType;
    shippingPrice?: number | string;
    shippingStatus: ShippingStatus | string;
    total: number | string;
    createdAt: Date | string;
}

// Configuration visuelle et priorité de tri pour chaque statut Prisma
const STATUS_CONFIG: Record<string, {
    label: string;
    priority: number;
    badgeClass: string;
    cardAccent: string;
    icon: LucideIcon;
}> = {
    PENDING: {
        label: "En attente",
        priority: 1,
        badgeClass: "bg-amber-50 text-amber-700 border-amber-200/80",
        cardAccent: "border-l-4 border-l-amber-500 bg-amber-50/10",
        icon: Clock,
    },
    PROCESSING: {
        label: "En préparation",
        priority: 2,
        badgeClass: "bg-blue-50 text-blue-700 border-blue-200/80",
        cardAccent: "border-l-4 border-l-blue-500",
        icon: Sparkles,
    },
    SHIPPED: {
        label: "Expédiée",
        priority: 3,
        badgeClass: "bg-indigo-50 text-indigo-700 border-indigo-200/80",
        cardAccent: "border-l-4 border-l-indigo-500",
        icon: Package,
    },
    DELIVERING: {
        label: "En livraison",
        priority: 4,
        badgeClass: "bg-purple-50 text-purple-700 border-purple-200/80",
        cardAccent: "border-l-4 border-l-purple-500",
        icon: Truck,
    },
    DELIVERED: {
        label: "Livrée",
        priority: 5,
        badgeClass: "bg-emerald-50 text-emerald-700 border-emerald-200/80",
        cardAccent: "border-l-4 border-l-emerald-500",
        icon: CheckCircle2,
    },
    CANCELLED: {
        label: "Annulée",
        priority: 6,
        badgeClass: "bg-rose-50 text-rose-700 border-rose-200/80",
        cardAccent: "border-l-4 border-l-slate-300 opacity-65 hover:opacity-100",
        icon: XCircle,
    },
};

const SHIPPING_TYPE_LABELS: Record<string, string> = {
    REL: "Point Relais",
    DOM: "Domicile",
    OFF: "Offert / Retrait",
};

const FILTER_TABS = [
    { key: "ALL", label: "Toutes" },
    { key: "PENDING", label: "En attente" },
    { key: "PROCESSING", label: "En préparation" },
    { key: "SHIPPED", label: "Expédiées" },
    { key: "DELIVERING", label: "En livraison" },
    { key: "DELIVERED", label: "Livrées" },
    { key: "CANCELLED", label: "Annulées" },
];

export default function Page() {
    const [orders, setOrders] = useState<IOrder[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [statusFilter, setStatusFilter] = useState<string>("ALL");
    const [searchQuery, setSearchQuery] = useState<string>("");

    useEffect(() => {
        const loadOrders = async () => {
            setIsLoading(true);
            const fingerprint = generateFingerprint();
            const token = sessionStorage.getItem("admin-token");

            if (!fingerprint || !token) {
                setIsLoading(false);
                return;
            }

            try {
                const newOrders = await getOrders(token, fingerprint);
                setOrders(newOrders || []);
            } catch (error) {
                console.error("Error loading orders", error);
            } finally {
                setIsLoading(false);
            }
        };

        loadOrders();
    }, []);

    // Compteurs par statut pour les badges de filtres et KPI
    const statusCounts = useMemo(() => {
        const counts: Record<string, number> = { ALL: orders.length };
        for (const order of orders) {
            counts[order.shippingStatus] = (counts[order.shippingStatus] || 0) + 1;
        }
        return counts;
    }, [orders]);

    // Filtrage + Tri prioritaire (PENDING en premier, puis par date décroissante)
    const filteredAndSortedOrders = useMemo(() => {
        return orders
            .filter((order) => {
                const matchesStatus = statusFilter === "ALL" || order.shippingStatus === statusFilter;
                
                if (!searchQuery.trim()) return matchesStatus;

                const query = searchQuery.toLowerCase();
                const fullName = `${order.firstName || ""} ${order.lastName || ""}`.toLowerCase();
                const matchesSearch =
                    order.id.toString().includes(query) ||
                    order.stripeSessionId.toLowerCase().includes(query) ||
                    order.shippingCity.toLowerCase().includes(query) ||
                    (order.email && order.email.toLowerCase().includes(query)) ||
                    fullName.includes(query);

                return matchesStatus && matchesSearch;
            })
            .sort((a, b) => {
                const priorityA = STATUS_CONFIG[a.shippingStatus]?.priority ?? 99;
                const priorityB = STATUS_CONFIG[b.shippingStatus]?.priority ?? 99;

                // 1. Tri par priorité de statut (PENDING = 1 passe toujours devant)
                if (priorityA !== priorityB) {
                    return priorityA - priorityB;
                }

                // 2. À statut égal, tri du plus récent au plus ancien
                return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
            });
    }, [orders, statusFilter, searchQuery]);

    // Calcul du chiffre d'affaires (hors commandes annulées)
    const totalRevenue = useMemo(() => {
        return orders
            .filter((o) => o.shippingStatus !== "CANCELLED")
            .reduce((acc, curr) => acc + Number(curr.total || 0), 0);
    }, [orders]);

    return (
        <div className="min-h-screen bg-slate-50/70 text-slate-900 p-4 sm:p-6 md:p-10">
            {/* Fond subtil */}
            <div className="fixed inset-0 -z-10 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:20px_20px] opacity-50 pointer-events-none" />

            <div className="max-w-6xl mx-auto pt-4 sm:pt-8 space-y-6 sm:space-y-8">
                
                {/* NAVIGATION & EN-TÊTE */}
                <div className="flex flex-col gap-4">
                    <div className="self-start">
                        <BackButton />
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200/80 pb-6">
                        <div>
                            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
                                Gestion des commandes
                            </h1>
                            <p className="text-sm sm:text-base text-slate-500 mt-1">
                                Suivez les expéditions et traitez les commandes en attente en priorité.
                            </p>
                        </div>

                        {/* Alerte rapide s'il y a des commandes en attente */}
                        {(statusCounts["PENDING"] || 0) > 0 && (
                            <button
                                onClick={() => setStatusFilter("PENDING")}
                                className="self-start sm:self-auto inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs sm:text-sm font-medium hover:bg-amber-100 transition cursor-pointer"
                            >
                                <span className="relative flex h-2.5 w-2.5">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500"></span>
                                </span>
                                {statusCounts["PENDING"]} commande{statusCounts["PENDING"] > 1 ? "s" : ""} à traiter
                            </button>
                        )}
                    </div>
                </div>

                {/* CARTES KPI RÉCAPITULATIVES */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                    <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-2xs">
                        <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">À traiter</p>
                        <p className="text-2xl sm:text-3xl font-bold text-amber-600 mt-1">
                            {(statusCounts["PENDING"] || 0) + (statusCounts["PROCESSING"] || 0)}
                        </p>
                        <p className="text-xs text-slate-400 mt-1">En attente ou préparation</p>
                    </div>

                    <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-2xs">
                        <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">En transit</p>
                        <p className="text-2xl sm:text-3xl font-bold text-indigo-600 mt-1">
                            {(statusCounts["SHIPPED"] || 0) + (statusCounts["DELIVERING"] || 0)}
                        </p>
                        <p className="text-xs text-slate-400 mt-1">Expédiées ou en cours</p>
                    </div>

                    <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-2xs">
                        <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Terminées</p>
                        <p className="text-2xl sm:text-3xl font-bold text-emerald-600 mt-1">
                            {statusCounts["DELIVERED"] || 0}
                        </p>
                        <p className="text-xs text-slate-400 mt-1">Commandes livrées</p>
                    </div>

                    <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-2xs">
                        <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Chiffre d&apos;affaires</p>
                        <p className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
                            {totalRevenue.toFixed(2)} €
                        </p>
                        <p className="text-xs text-slate-400 mt-1">Hors commandes annulées</p>
                    </div>
                </div>

                {/* BARRE DE RECHERCHE & FILTRES */}
                <div className="space-y-4">
                    {/* Recherche */}
                    <div className="relative">
                        <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Rechercher par client, ville, email, n° de commande..."
                            className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200/90 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 transition shadow-2xs"
                        />
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery("")}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 px-2 py-1"
                            >
                                Effacer
                            </button>
                        )}
                    </div>

                    {/* Onglets de statut (Scroll horizontal fluide sur mobile) */}
                    <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap">
                        {FILTER_TABS.map((tab) => {
                            const count = statusCounts[tab.key] || 0;
                            const isActive = statusFilter === tab.key;
                            const isPendingTab = tab.key === "PENDING" && count > 0;

                            return (
                                <button
                                    key={tab.key}
                                    onClick={() => setStatusFilter(tab.key)}
                                    className={`shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer border ${
                                        isActive
                                            ? "bg-slate-900 text-white border-slate-900 shadow-xs"
                                            : isPendingTab
                                            ? "bg-amber-50/80 text-amber-900 border-amber-200 hover:bg-amber-100"
                                            : "bg-white text-slate-600 border-slate-200/80 hover:bg-slate-100 hover:text-slate-900"
                                    }`}
                                >
                                    <span>{tab.label}</span>
                                    <span
                                        className={`px-1.5 py-0.5 text-[11px] rounded-md font-semibold ${
                                            isActive
                                                ? "bg-white/20 text-white"
                                                : isPendingTab
                                                ? "bg-amber-200/70 text-amber-900"
                                                : "bg-slate-100 text-slate-500"
                                        }`}
                                    >
                                        {count}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* LISTE DES COMMANDES */}
                <div className="space-y-3 sm:space-y-4">
                    {isLoading ? (
                        // Squelettes de chargement
                        Array.from({ length: 4 }).map((_, index) => (
                            <div
                                key={index}
                                className="h-32 rounded-2xl bg-white border border-slate-200/70 p-5 animate-pulse flex flex-col justify-between"
                            >
                                <div className="flex justify-between">
                                    <div className="h-5 w-40 bg-slate-200 rounded-md" />
                                    <div className="h-6 w-24 bg-slate-200 rounded-full" />
                                </div>
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="h-4 w-28 bg-slate-100 rounded-md" />
                                    <div className="h-4 w-24 bg-slate-100 rounded-md" />
                                    <div className="h-4 w-20 bg-slate-100 rounded-md" />
                                </div>
                            </div>
                        ))
                    ) : filteredAndSortedOrders.length === 0 ? (
                        // État vide
                        <div className="bg-white rounded-2xl border border-slate-200/80 p-10 sm:p-14 text-center max-w-md mx-auto my-8 shadow-2xs">
                            <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-500 flex items-center justify-center mx-auto mb-4">
                                <ShoppingBag className="w-6 h-6" />
                            </div>
                            <h3 className="text-base font-semibold text-slate-900">
                                Aucune commande trouvée
                            </h3>
                            <p className="text-sm text-slate-500 mt-1">
                                {searchQuery || statusFilter !== "ALL"
                                    ? "Essayez de modifier vos filtres ou votre recherche."
                                    : "Les nouvelles commandes apparaîtront ici dès leur validation."}
                            </p>
                            {(searchQuery || statusFilter !== "ALL") && (
                                <button
                                    onClick={() => {
                                        setStatusFilter("ALL");
                                        setSearchQuery("");
                                    }}
                                    className="mt-4 px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-medium hover:bg-slate-800 transition cursor-pointer"
                                >
                                    Réinitialiser les filtres
                                </button>
                            )}
                        </div>
                    ) : (
                        filteredAndSortedOrders.map((order) => {
                            const statusInfo = STATUS_CONFIG[order.shippingStatus] || {
                                label: order.shippingStatus,
                                priority: 99,
                                badgeClass: "bg-slate-100 text-slate-700 border-slate-200",
                                cardAccent: "border-l-4 border-l-slate-400",
                                icon: AlertCircle,
                            };
                            const StatusIcon = statusInfo.icon;
                            const hasCustomerName = order.firstName || order.lastName;
                            const formattedDate = new Date(order.createdAt).toLocaleDateString("fr-FR", {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                            });

                            return (
                                <Link
                                    key={order.id}
                                    href={`/admin/dashboard/order/${order.id}`}
                                    className="group block focus:outline-none"
                                >
                                    <div
                                        className={`bg-white rounded-2xl border border-slate-200/80 p-4 sm:p-6 shadow-2xs hover:shadow-md hover:border-slate-300 transition-all duration-200 ${statusInfo.cardAccent}`}
                                    >
                                        {/* Ligne supérieure : ID + Date + Badge de Statut */}
                                        <div className="flex flex-wrap items-start justify-between gap-2 pb-4 border-b border-slate-100">
                                            <div className="space-y-1">
                                                <div className="flex items-center gap-2.5 flex-wrap">
                                                    <span className="font-bold text-base sm:text-lg text-slate-900 group-hover:text-slate-700 transition-colors">
                                                        Commande #{order.id}
                                                    </span>
                                                    <span className="text-xs font-mono px-2 py-0.5 rounded-md bg-slate-100 text-slate-500">
                                                        {order.stripeSessionId.slice(0, 14)}…
                                                    </span>
                                                </div>
                                                <p className="text-xs text-slate-400">{formattedDate}</p>
                                            </div>

                                            <div className="flex items-center gap-2">
                                                <span
                                                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${statusInfo.badgeClass}`}
                                                >
                                                    <StatusIcon className="w-3.5 h-3.5" />
                                                    {statusInfo.label}
                                                </span>
                                                <div className="w-7 h-7 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-slate-900 group-hover:text-white transition-colors">
                                                    <ChevronRight className="w-4 h-4" />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Ligne inférieure : Grille d'informations */}
                                        <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6 text-sm">
                                            
                                            {/* Client */}
                                            <div className="flex items-center gap-2.5">
                                                <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-500 flex items-center justify-center shrink-0">
                                                    <User className="w-4 h-4" />
                                                </div>
                                                <div className="min-w-0">
                                                    <p className="text-xs text-slate-400">Client</p>
                                                    <p className="font-medium text-slate-800 truncate">
                                                        {hasCustomerName
                                                            ? `${order.firstName || ""} ${order.lastName || ""}`
                                                            : order.email || "Client enregistré"}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Destination & Mode de livraison */}
                                            <div className="flex items-center gap-2.5">
                                                <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-500 flex items-center justify-center shrink-0">
                                                    <MapPin className="w-4 h-4" />
                                                </div>
                                                <div className="min-w-0">
                                                    <p className="text-xs text-slate-400">
                                                        Livraison{" "}
                                                        {order.shippingType && (
                                                            <span className="text-slate-600 font-medium">
                                                                • {SHIPPING_TYPE_LABELS[order.shippingType] || order.shippingType}
                                                            </span>
                                                        )}
                                                    </p>
                                                    <p className="font-medium text-slate-800 truncate">
                                                        {order.shippingPostalCode ? `${order.shippingPostalCode} ` : ""}
                                                        {order.shippingCity}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Montant Total */}
                                            <div className="flex items-center sm:justify-end justify-between pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                                                <span className="text-xs text-slate-400 sm:mr-3">Montant total</span>
                                                <span className="text-base sm:text-lg font-bold text-slate-900 bg-slate-100/80 px-3 py-1 rounded-xl">
                                                    {Number(order.total).toFixed(2)} €
                                                </span>
                                            </div>

                                        </div>
                                    </div>
                                </Link>
                            );
                        })
                    )}
                </div>

            </div>
        </div>
    );
}
