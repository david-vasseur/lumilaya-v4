"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import BackButton from "@/components/ui/BackButton";
import EventForm from "@/components/form/admin/EventForm";
import PromoForm, {
    getPromoStatus,
    IPromoBannerData,
} from "@/components/form/admin/PromoForm";
import {
    Calendar,
    Megaphone,
    MapPin,
    Clock,
    CheckCircle2,
    AlertCircle,
    PowerOff,
    Tag,
    Trash2,
    Loader2,
} from "lucide-react";
import { generateFingerprint } from "@/utils/dbFunction";
import { createBanner, getEvents, IPromoBannerPayload } from "@/lib/action/admin.action";

interface IAdminEvent {
    id: number;
    name: string;
    address: string;
    city: string;
    postalCode: string;
    dateStart: string;
    dateEnd: string;
    url: string;
    imagePreview?: string | null;
}

const DEFAULT_PROMO: IPromoBannerData = {
    active: false,
    title: "",
    promoCode: "",
    linkLabel: "",
    linkUrl: "",
    dateStart: "",
    dateEnd: "",
    bgColor: "#7A9B8E",
    textColor: "#FFFFFF",
};

export default function EventAndPromoPage() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<"promo" | "events">("promo");
    const [loading, setLoading] = useState(true);
    const [togglingBanner, setTogglingBanner] = useState(false);

    // Auth stockée en state pour la passer aux formulaires enfants
    const [token, setToken] = useState<string>("");
    const [fingerprint, setFingerprint] = useState<string>("");

    const [promo, setPromo] = useState<IPromoBannerData>(DEFAULT_PROMO);
    const [events, setEvents] = useState<IAdminEvent[]>([]);

    // --- CHARGEMENT INITIAL (même pattern que Product) ---
    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            const fp = generateFingerprint();
            const adminToken = sessionStorage.getItem("admin-token");

            if (!adminToken || !fp) {
                setLoading(false);
                return;
            }

            setToken(adminToken);
            setFingerprint(fp);

            try {
                // Charge les événements (et la bannière si ton endpoint ou une Server Action la retourne)
                const eventsData = await getEvents(adminToken, fp);
                if (Array.isArray(eventsData)) {
                    setEvents(eventsData);
                }

                // Si tu as une Server Action getBanner() (ex: via Prisma), décommente :
                // const bannerData = await getBanner();
                // if (bannerData) setPromo(bannerData);
            } catch (e) {
                console.error("Error loading events/promo", e);
                toast.error("Erreur lors du chargement des données");
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

    // --- BOUTON RAPIDE ACTIVER / COUPER LA BANNIÈRE ---
    const handleQuickToggleBanner = async () => {
        if (!token || !fingerprint) {
            toast.error("Session expirée, veuillez vous reconnecter.");
            return;
        }

        const nextActive = !promo.active;

        if (nextActive && !promo.title.trim()) {
            toast.error("Saisissez d'abord un texte de bannière avant de l'activer.");
            return;
        }

        setTogglingBanner(true);
        try {
            const payload: IPromoBannerPayload = {
                active: nextActive,
                title: promo.title.trim(),
                promoCode: promo.promoCode.trim() || null,
                linkUrl: promo.linkUrl.trim() || null,
                linkLabel: promo.linkLabel.trim() || null,
                dateStart: promo.dateStart ? new Date(promo.dateStart).toISOString() : null,
                dateEnd: promo.dateEnd ? new Date(promo.dateEnd).toISOString() : null,
                bgColor: promo.bgColor,
                textColor: promo.textColor,
            };

            await createBanner(token, fingerprint, payload);
            setPromo((prev) => ({ ...prev, active: nextActive }));
            router.refresh();
            toast.success(nextActive ? "Bannière activée en ligne !" : "Bannière coupée.");
        } catch (error) {
            console.error(error);
            toast.error("Impossible de mettre à jour la bannière.");
        } finally {
            setTogglingBanner(false);
        }
    };

    const promoStatus = getPromoStatus(promo);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50/70">
                <Loader2 className="w-8 h-8 animate-spin text-slate-700" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50/70 text-slate-900 p-4 sm:p-6 md:p-10 pb-24">
            <div className="fixed inset-0 -z-10 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] bg-size-[20px_20px] opacity-50 pointer-events-none" />

            <div className="max-w-6xl mx-auto pt-4 sm:pt-8 space-y-6 sm:space-y-8">
                {/* BOUTON RETOUR & TITRE */}
                <div className="space-y-4">
                    <div className="self-start">
                        <BackButton />
                    </div>

                    <div className="border-b border-slate-200/80 pb-6">
                        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
                            Événements & Bannière Promo
                        </h1>
                        <p className="text-sm sm:text-base text-slate-500 mt-1">
                            Pilotez votre bandeau promotionnel en ligne et planifiez vos prochains salons physiques.
                        </p>
                    </div>
                </div>

                {/* RÉCAPITULATIF EN DIRECT */}
                <div className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-2xs flex flex-col lg:flex-row lg:items-center justify-between gap-5">
                    <div className="flex items-start sm:items-center gap-4">
                        <div
                            className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-xs border border-black/10"
                            style={{ backgroundColor: promo.bgColor, color: promo.textColor }}
                        >
                            <Megaphone className="w-6 h-6" />
                        </div>

                        <div className="space-y-1">
                            <div className="flex items-center gap-2.5 flex-wrap">
                                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                                    État de la bannière :
                                </span>
                                <span
                                    className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${promoStatus.badgeClass}`}
                                >
                                    {promoStatus.code === "ACTIVE" && <CheckCircle2 className="w-3.5 h-3.5" />}
                                    {promoStatus.code === "SCHEDULED" && <Clock className="w-3.5 h-3.5" />}
                                    {promoStatus.code === "EXPIRED" && <AlertCircle className="w-3.5 h-3.5" />}
                                    {promoStatus.code === "DISABLED" && <PowerOff className="w-3.5 h-3.5" />}
                                    {promoStatus.label}
                                </span>

                                {promo.promoCode && (
                                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-xs font-mono font-semibold">
                                        <Tag className="w-3 h-3 text-slate-400" />
                                        {promo.promoCode}
                                    </span>
                                )}
                            </div>

                            <p className="text-sm font-semibold text-slate-900 line-clamp-1">
                                {promo.title || "Aucune annonce configurée"}
                            </p>

                            <p className="text-xs text-slate-500">
                                Du{" "}
                                <span className="font-medium text-slate-700">
                                    {promo.dateStart ? new Date(promo.dateStart).toLocaleDateString("fr-FR") : "—"}
                                </span>{" "}
                                au{" "}
                                <span className="font-medium text-slate-700">
                                    {promo.dateEnd ? new Date(promo.dateEnd).toLocaleDateString("fr-FR") : "—"}
                                </span>
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 self-start lg:self-auto">
                        <button
                            type="button"
                            disabled={togglingBanner}
                            onClick={handleQuickToggleBanner}
                            className={`px-4 py-2 rounded-xl text-xs font-semibold border transition cursor-pointer disabled:opacity-60 ${
                                promo.active
                                    ? "bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100"
                                    : "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100"
                            }`}
                        >
                            {promo.active ? "Couper la bannière" : "Activer maintenant"}
                        </button>
                    </div>
                </div>

                {/* NAVIGATION PAR ONGLETS */}
                <div className="flex items-center gap-2 border-b border-slate-200/80 pb-4">
                    <button
                        type="button"
                        onClick={() => setActiveTab("promo")}
                        className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition cursor-pointer border ${
                            activeTab === "promo"
                                ? "bg-slate-900 text-white border-slate-900 shadow-xs"
                                : "bg-white text-slate-600 border-slate-200/80 hover:bg-slate-100"
                        }`}
                    >
                        <Megaphone className="w-4 h-4" />
                        <span>Configurer la Bannière Promo</span>
                    </button>

                    <button
                        type="button"
                        onClick={() => setActiveTab("events")}
                        className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition cursor-pointer border ${
                            activeTab === "events"
                                ? "bg-slate-900 text-white border-slate-900 shadow-xs"
                                : "bg-white text-slate-600 border-slate-200/80 hover:bg-slate-100"
                        }`}
                    >
                        <Calendar className="w-4 h-4" />
                        <span>Salons & Événements physiques</span>
                        <span
                            className={`px-1.5 py-0.5 text-[11px] rounded-md ${
                                activeTab === "events"
                                    ? "bg-white/20 text-white"
                                    : "bg-slate-100 text-slate-600"
                            }`}
                        >
                            {events.length}
                        </span>
                    </button>
                </div>

                {/* CONTENU DE L'ONGLET SÉLECTIONNÉ */}
                {activeTab === "promo" ? (
                    <PromoForm
                        key={JSON.stringify(promo)}
                        promo={promo}
                        token={token}
                        fingerprint={fingerprint}
                        onUpdatePromo={setPromo}
                    />
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
                        <div className="lg:col-span-2">
                            <EventForm
                                onEventCreated={(newEv) =>
                                    setEvents((prev) => [newEv, ...prev])
                                }
                            />
                        </div>

                        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-2xs space-y-4">
                            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                                <h3 className="text-base font-bold text-slate-900">
                                    Prochaines dates ({events.length})
                                </h3>
                            </div>

                            <div className="space-y-3">
                                {events.map((ev: IAdminEvent) => (
                                    <div
                                        key={ev.id}
                                        className="p-4 rounded-xl border border-slate-200/80 bg-slate-50/50 space-y-2 relative group"
                                    >
                                        {ev.imagePreview && (
                                            <img
                                                src={ev.imagePreview}
                                                alt={ev.name}
                                                className="w-full h-24 object-cover rounded-lg mb-2"
                                            />
                                        )}

                                        <div className="flex items-start justify-between gap-2">
                                            <h4 className="font-bold text-sm text-slate-900">
                                                {ev.name}
                                            </h4>
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setEvents((prev) =>
                                                        prev.filter((item) => item.id !== ev.id)
                                                    )
                                                }
                                                className="text-slate-400 hover:text-rose-600 transition cursor-pointer"
                                                title="Supprimer"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>

                                        <p className="text-xs text-slate-600 flex items-center gap-1.5">
                                            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                                            <span>
                                                {ev.address}, {ev.postalCode} {ev.city}
                                            </span>
                                        </p>

                                        <p className="text-xs text-purple-700 font-medium flex items-center gap-1.5">
                                            <Calendar className="w-3.5 h-3.5 shrink-0" />
                                            <span>
                                                Du{" "}
                                                {new Date(ev.dateStart).toLocaleDateString("fr-FR")}{" "}
                                                au{" "}
                                                {new Date(ev.dateEnd).toLocaleDateString("fr-FR")}
                                            </span>
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
