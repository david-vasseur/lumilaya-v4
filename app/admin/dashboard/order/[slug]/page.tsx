"use client"

import ShipStatusForm from '@/components/form/admin/ShipStatusForm';
import BackButton from '@/components/ui/BackButton';
import { getOneOrderById } from '@/lib/action/admin.action';
import { Order, OrderItem } from '@/lib/generated/prisma/client';
import { ShippingStatus } from '@/lib/generated/prisma/enums';
import { generateFingerprint } from '@/utils/dbFunction';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import {
    Clock,
    Sparkles,
    Package,
    Truck,
    CheckCircle2,
    XCircle,
    Copy,
    Check,
    User,
    Mail,
    Phone,
    MapPin,
    FileText,
    ShoppingBag,
    CreditCard,
    ShieldCheck,
    AlertTriangle,
    type LucideIcon
} from 'lucide-react';

type OrderWithItems = Order & {
    items: OrderItem[];
};

// Configuration des statuts
const STATUS_DETAILS: Record<string, {
    label: string;
    stepIndex: number;
    badgeClass: string;
    icon: LucideIcon;
}> = {
    PENDING: {
        label: "En attente",
        stepIndex: 0,
        badgeClass: "bg-amber-50 text-amber-700 border-amber-200",
        icon: Clock,
    },
    PROCESSING: {
        label: "En préparation",
        stepIndex: 1,
        badgeClass: "bg-blue-50 text-blue-700 border-blue-200",
        icon: Sparkles,
    },
    SHIPPED: {
        label: "Expédiée",
        stepIndex: 2,
        badgeClass: "bg-indigo-50 text-indigo-700 border-indigo-200",
        icon: Package,
    },
    DELIVERING: {
        label: "En livraison",
        stepIndex: 3,
        badgeClass: "bg-purple-50 text-purple-700 border-purple-200",
        icon: Truck,
    },
    DELIVERED: {
        label: "Livrée",
        stepIndex: 4,
        badgeClass: "bg-emerald-50 text-emerald-700 border-emerald-200",
        icon: CheckCircle2,
    },
    CANCELLED: {
        label: "Annulée",
        stepIndex: -1,
        badgeClass: "bg-rose-50 text-rose-700 border-rose-200",
        icon: XCircle,
    },
};

const PROGRESS_STEPS = [
    { key: "PENDING", label: "Validée", icon: Clock },
    { key: "PROCESSING", label: "Préparation", icon: Sparkles },
    { key: "SHIPPED", label: "Expédiée", icon: Package },
    { key: "DELIVERING", label: "En transit", icon: Truck },
    { key: "DELIVERED", label: "Livrée", icon: CheckCircle2 },
];

const SHIPPING_TYPE_LABELS: Record<string, string> = {
    REL: "Point Relais",
    DOM: "Livraison à domicile",
    OFF: "Livraison offerte / Retrait",
};

/**
 * Helper de formatage des prix :
 * Ajuster "/ 100" si tes Decimal Prisma sont déjà stockés en Euros (ex: 29.90)
 * ou en centimes (ex: 2990).
 */
function formatPrice(value: unknown, divideBy100 = true): string {
    const num = Number(value || 0);
    const amount = divideBy100 ? num / 100 : num;
    return `${amount.toFixed(2)} €`;
}

// Helper pour afficher proprement le champ JSON "options" d'un OrderItem
function renderItemOptions(options: unknown) {
    if (!options || typeof options !== "object") return null;
    const entries = Object.entries(options as Record<string, unknown>);
    if (entries.length === 0) return null;

    return (
        <div className="flex flex-wrap gap-1.5 mt-1.5">
            {entries.map(([key, val]) => (
                <span
                    key={key}
                    className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-medium bg-slate-100 text-slate-600"
                >
                    <span className="text-slate-400 mr-1 capitalize">{key}:</span>
                    {String(val)}
                </span>
            ))}
        </div>
    );
}

export default function OrderDetailPage() {
    const params = useParams();
    const slug = params.slug as string;

    const [order, setOrder] = useState<OrderWithItems | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [copiedStripe, setCopiedStripe] = useState<boolean>(false);

    useEffect(() => {
        const loadOrder = async () => {
            setIsLoading(true);
            const fingerprint = generateFingerprint();
            const token = sessionStorage.getItem('admin-token');

            if (!fingerprint || !token || !slug) {
                setIsLoading(false);
                return;
            }

            try {
                const res = await getOneOrderById(token, fingerprint, slug);
                if (res?.order) {
                    setOrder(res.order);
                }
            } catch (error) {
                console.error("Error loading order", error);
                toast.error("Erreur lors du chargement de la commande");
            } finally {
                setIsLoading(false);
            }
        };

        loadOrder();
    }, [slug]);

    const handleCopyStripeId = () => {
        if (!order?.stripeSessionId) return;
        navigator.clipboard.writeText(order.stripeSessionId);
        setCopiedStripe(true);
        toast.success("ID Stripe copié dans le presse-papier");
        setTimeout(() => setCopiedStripe(false), 2000);
    };

    // Squelette de chargement
    if (isLoading) {
        return (
            <div className="min-h-screen bg-slate-50/70 p-4 sm:p-6 md:p-10">
                <div className="max-w-6xl mx-auto pt-4 sm:pt-8 space-y-6 animate-pulse">
                    <div className="h-9 w-28 bg-slate-200 rounded-xl" />
                    <div className="h-24 w-full bg-white rounded-2xl border border-slate-200/70" />
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2 h-80 bg-white rounded-2xl border border-slate-200/70" />
                        <div className="h-80 bg-white rounded-2xl border border-slate-200/70" />
                    </div>
                </div>
            </div>
        );
    }

    // Commande introuvable
    if (!order) {
        return (
            <div className="min-h-screen bg-slate-50/70 p-4 sm:p-6 md:p-10 flex items-center justify-center">
                <div className="bg-white border border-slate-200/80 rounded-2xl p-8 max-w-md w-full text-center space-y-4 shadow-2xs">
                    <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto">
                        <AlertTriangle className="w-6 h-6" />
                    </div>
                    <h2 className="text-lg font-bold text-slate-900">Commande introuvable</h2>
                    <p className="text-sm text-slate-500">
                        Impossible de récupérer les informations de cette commande.
                    </p>
                    <div className="pt-2 flex justify-center">
                        <BackButton />
                    </div>
                </div>
            </div>
        );
    }

    const statusInfo = STATUS_DETAILS[order.shippingStatus] || STATUS_DETAILS.PENDING;
    const StatusIcon = statusInfo.icon;

    // Calcul du sous-total des articles (hors livraison)
    const itemsSubtotal = order.items.reduce(
        (acc, item) => acc + Number(item.price) * item.quantity,
        0
    );

    // Vérifie si l'adresse de facturation est identique à celle de livraison
    const isSameBillingAddress =
        order.shippingAddress === order.billingAddress &&
        order.shippingPostalCode === order.billingPostalCode &&
        order.shippingCity === order.billingCity;

    return (
        <div className="min-h-screen bg-slate-50/70 text-slate-900 p-4 sm:p-6 md:p-10">
            {/* Fond subtil */}
            <div className="fixed inset-0 -z-10 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:20px_20px] opacity-50 pointer-events-none" />

            <div className="max-w-6xl mx-auto pt-4 sm:pt-8 space-y-6">

                {/* BOUTON RETOUR */}
                <div>
                    <BackButton />
                </div>

                {/* EN-TÊTE DE LA COMMANDE */}
                <div className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-2xs space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="space-y-1.5">
                            <div className="flex items-center gap-3 flex-wrap">
                                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
                                    Commande #{order.id}
                                </h1>
                                <span
                                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${statusInfo.badgeClass}`}
                                >
                                    <StatusIcon className="w-3.5 h-3.5" />
                                    {statusInfo.label}
                                </span>
                            </div>

                            <p className="text-xs sm:text-sm text-slate-500">
                                Passée le{" "}
                                <span className="font-medium text-slate-700">
                                    {new Date(order.createdAt).toLocaleDateString("fr-FR", {
                                        day: "2-digit",
                                        month: "long",
                                        year: "numeric",
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    })}
                                </span>
                            </p>
                        </div>

                        {/* Badge Stripe Session avec copie */}
                        <div className="flex items-center gap-2 self-start sm:self-auto bg-slate-50 border border-slate-200/80 rounded-xl px-3 py-2">
                            <CreditCard className="w-4 h-4 text-slate-400 shrink-0" />
                            <div className="text-xs">
                                <span className="text-slate-400 block text-[10px] uppercase font-semibold">
                                    Session Stripe
                                </span>
                                <span className="font-mono text-slate-700">
                                    {order.stripeSessionId.slice(0, 18)}…
                                </span>
                            </div>
                            <button
                                type="button"
                                onClick={handleCopyStripeId}
                                title="Copier l'ID Stripe complet"
                                className="ml-1 p-1.5 rounded-lg hover:bg-slate-200/70 text-slate-500 hover:text-slate-900 transition cursor-pointer"
                            >
                                {copiedStripe ? (
                                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                                ) : (
                                    <Copy className="w-3.5 h-3.5" />
                                )}
                            </button>
                        </div>
                    </div>

                    {/* BARRE DE PROGRESSION DU STATUT */}
                    {order.shippingStatus === "CANCELLED" ? (
                        <div className="flex items-center gap-3 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-sm">
                            <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                            <span>Cette commande a été annulée.</span>
                        </div>
                    ) : (
                        <div className="pt-4 border-t border-slate-100">
                            <div className="grid grid-cols-5 gap-2">
                                {PROGRESS_STEPS.map((step, index) => {
                                    const StepIcon = step.icon;
                                    const isCompleted = index <= statusInfo.stepIndex;
                                    const isCurrent = index === statusInfo.stepIndex;

                                    return (
                                        <div key={step.key} className="flex flex-col items-center text-center">
                                            <div className="w-full flex items-center justify-center relative mb-2">
                                                {/* Ligne de connexion gauche */}
                                                {index > 0 && (
                                                    <div
                                                        className={`hidden sm:block absolute right-1/2 top-1/2 -translate-y-1/2 w-full h-0.5 -z-0 ${
                                                            index <= statusInfo.stepIndex
                                                                ? "bg-slate-900"
                                                                : "bg-slate-200"
                                                        }`}
                                                    />
                                                )}
                                                <div
                                                    className={`relative z-10 w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition-colors ${
                                                        isCurrent
                                                            ? "bg-slate-900 text-white ring-4 ring-slate-900/10"
                                                            : isCompleted
                                                            ? "bg-emerald-600 text-white"
                                                            : "bg-slate-100 text-slate-400"
                                                    }`}
                                                >
                                                    <StepIcon className="w-4 h-4" />
                                                </div>
                                            </div>
                                            <span
                                                className={`text-[11px] sm:text-xs font-medium leading-tight ${
                                                    isCurrent
                                                        ? "text-slate-900 font-semibold"
                                                        : isCompleted
                                                        ? "text-slate-700"
                                                        : "text-slate-400"
                                                }`}
                                            >
                                                {step.label}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>

                {/* GRILLE PRINCIPALE : 2 COLONNES SUR DESKTOP */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">

                    {/* COLONNE GAUCHE (2/3) : ARTICLES & TOTAL */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs overflow-hidden">
                            <div className="p-5 sm:p-6 border-b border-slate-100 flex items-center justify-between">
                                <div className="flex items-center gap-2.5">
                                    <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center">
                                        <ShoppingBag className="w-4 h-4" />
                                    </div>
                                    <h2 className="font-semibold text-base sm:text-lg text-slate-900">
                                        Articles commandés
                                    </h2>
                                </div>
                                <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">
                                    {order.items.reduce((sum, i) => sum + i.quantity, 0)} article(s)
                                </span>
                            </div>

                            {/* Liste des articles (Responsive : cartes sur mobile, lignes sur desktop) */}
                            <div className="divide-y divide-slate-100">
                                {order.items.map((item) => {
                                    const lineTotal = Number(item.price) * item.quantity;

                                    return (
                                        <div
                                            key={item.id}
                                            className="p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/50 transition"
                                        >
                                            <div className="space-y-1 min-w-0">
                                                <div className="flex items-center gap-2 flex-wrap">
                                                    <p className="font-semibold text-slate-900 text-sm sm:text-base">
                                                        {item.name}
                                                    </p>
                                                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-500">
                                                        Prod #{item.productId} • Var #{item.variantId}
                                                    </span>
                                                </div>

                                                {/* Affichage des options JSON si présentes */}
                                                {renderItemOptions(item.options)}

                                                <p className="text-xs text-slate-500 pt-0.5">
                                                    Prix unitaire : {formatPrice(item.price)}
                                                </p>
                                            </div>

                                            <div className="flex items-center justify-between sm:justify-end gap-6 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100 shrink-0">
                                                <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs font-semibold">
                                                    x{item.quantity}
                                                </span>
                                                <span className="font-bold text-slate-900 text-sm sm:text-base min-w-[75px] text-right">
                                                    {formatPrice(lineTotal)}
                                                </span>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* RÉCAPITULATIF FINANCIER */}
                            <div className="bg-slate-50/80 p-5 sm:p-6 border-t border-slate-200/60 space-y-3 text-sm">
                                <div className="flex justify-between text-slate-600">
                                    <span>Sous-total articles</span>
                                    <span className="font-medium text-slate-900">
                                        {formatPrice(itemsSubtotal)}
                                    </span>
                                </div>

                                <div className="flex justify-between text-slate-600">
                                    <span className="flex items-center gap-2 flex-wrap">
                                        <span>Livraison</span>
                                        <span className="text-xs px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-600 font-medium">
                                            {SHIPPING_TYPE_LABELS[order.shippingType] || order.shippingType}
                                        </span>
                                    </span>
                                    <span className="font-medium text-slate-900">
                                        {Number(order.shippingPrice) === 0
                                            ? "Offerte"
                                            : formatPrice(order.shippingPrice)}
                                    </span>
                                </div>

                                <div className="pt-3 border-t border-slate-200 flex justify-between items-baseline">
                                    <span className="text-base font-bold text-slate-900">Total payé</span>
                                    <span className="text-xl sm:text-2xl font-bold text-slate-900">
                                        {formatPrice(order.total)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* COLONNE DROITE (1/3) : STATUT, CLIENT, ADRESSES */}
                    <div className="space-y-6">

                        {/* 1. Formulaire de changement de statut */}
                        <ShipStatusForm
                            status={order.shippingStatus}
                            id={String(order.id)}
                            onStatusUpdated={(newStatus: ShippingStatus) =>
                                setOrder((prev) => (prev ? { ...prev, shippingStatus: newStatus } : prev))
                            }
                        />

                        {/* 2. Fiche Client */}
                        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-2xs space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center">
                                        <User className="w-4 h-4" />
                                    </div>
                                    <h2 className="font-semibold text-sm text-slate-900">Client</h2>
                                </div>

                                {order.acceptCGV && (
                                    <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                                        <ShieldCheck className="w-3 h-3" />
                                        CGV acceptées
                                    </span>
                                )}
                            </div>

                            <div className="space-y-2.5 text-sm">
                                <p className="font-semibold text-slate-900 text-base">
                                    {order.firstName} {order.lastName}
                                </p>

                                <a
                                    href={`mailto:${order.email}`}
                                    className="flex items-center gap-2.5 text-slate-600 hover:text-slate-900 transition break-all"
                                >
                                    <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                                    <span className="underline underline-offset-2">{order.email}</span>
                                </a>

                                {order.phone && (
                                    <a
                                        href={`tel:${order.phone}`}
                                        className="flex items-center gap-2.5 text-slate-600 hover:text-slate-900 transition"
                                    >
                                        <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                                        <span>{order.phone}</span>
                                    </a>
                                )}
                            </div>
                        </div>

                        {/* 3. Adresse de livraison */}
                        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-2xs space-y-3">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center">
                                        <MapPin className="w-4 h-4" />
                                    </div>
                                    <h2 className="font-semibold text-sm text-slate-900">
                                        Adresse de livraison
                                    </h2>
                                </div>
                                <span className="text-xs font-medium px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                                    {order.shippingType}
                                </span>
                            </div>

                            <div className="text-sm text-slate-600 space-y-1 pl-10">
                                <p className="font-medium text-slate-900">
                                    {order.firstName} {order.lastName}
                                </p>
                                <p>{order.shippingAddress}</p>
                                <p className="font-medium text-slate-800">
                                    {order.shippingPostalCode} {order.shippingCity}
                                </p>
                                <p className="text-xs text-slate-400 uppercase">
                                    Pays : {order.shippingCountry}
                                </p>
                            </div>
                        </div>

                        {/* 4. Adresse de facturation */}
                        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-2xs space-y-3">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center">
                                        <FileText className="w-4 h-4" />
                                    </div>
                                    <h2 className="font-semibold text-sm text-slate-900">
                                        Adresse de facturation
                                    </h2>
                                </div>

                                {isSameBillingAddress && (
                                    <span className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-slate-100 text-slate-500">
                                        Identique
                                    </span>
                                )}
                            </div>

                            <div className="text-sm text-slate-600 space-y-1 pl-10">
                                <p>{order.billingAddress}</p>
                                <p className="font-medium text-slate-800">
                                    {order.billingPostalCode} {order.billingCity}
                                </p>
                                <p className="text-xs text-slate-400 uppercase">
                                    Pays : {order.billingCountry}
                                </p>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
}
