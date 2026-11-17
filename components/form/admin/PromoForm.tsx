"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
    Megaphone,
    Calendar,
    Palette,
    Eye,
    CheckCircle2,
    Clock,
    AlertCircle,
    PowerOff,
    ExternalLink,
    Tag,
    Save,
    Smartphone,
    Monitor,
    Loader2,
} from "lucide-react";
import { createBanner, IPromoBannerPayload } from "@/lib/action/admin.action";

export interface IPromoBannerData {
    active: boolean;
    title: string;
    promoCode: string;
    linkUrl: string;
    linkLabel: string;
    dateStart: string;
    dateEnd: string;
    bgColor: string;
    textColor: string;
}

interface PromoFormProps {
    promo: IPromoBannerData;
    token: string;
    fingerprint: string;
    onUpdatePromo?: (newPromo: IPromoBannerData) => void;
}

const COLOR_PRESETS = [
    { name: "Sauge Lumilaya", bg: "#7A9B8E", text: "#FFFFFF" },
    { name: "Nuit Étoilée", bg: "#1E293B", text: "#FFFFFF" },
    { name: "Terracotta", bg: "#9A3412", text: "#FFFFFF" },
    { name: "Sable Doux", bg: "#F5EFE6", text: "#2C2C2C" },
    { name: "Forêt Profonde", bg: "#14532D", text: "#FFFFFF" },
];

export function getPromoStatus(promo: IPromoBannerData): {
    code: "ACTIVE" | "SCHEDULED" | "EXPIRED" | "DISABLED";
    label: string;
    badgeClass: string;
    description: string;
} {
    if (!promo.active) {
        return {
            code: "DISABLED",
            label: "Désactivée",
            badgeClass: "bg-slate-100 text-slate-600 border-slate-200",
            description: "La bannière est masquée manuellement.",
        };
    }

    const now = new Date();
    now.setHours(0, 0, 0, 0);

    const start = promo.dateStart ? new Date(promo.dateStart) : null;
    const end = promo.dateEnd ? new Date(promo.dateEnd) : null;

    if (start) start.setHours(0, 0, 0, 0);
    if (end) end.setHours(23, 59, 59, 999);

    if (start && now < start) {
        return {
            code: "SCHEDULED",
            label: "Programmée",
            badgeClass: "bg-blue-50 text-blue-700 border-blue-200",
            description: `S'affichera automatiquement le ${start.toLocaleDateString("fr-FR")}.`,
        };
    }

    if (end && now > end) {
        return {
            code: "EXPIRED",
            label: "Terminée / Expirée",
            badgeClass: "bg-amber-50 text-amber-700 border-amber-200",
            description: `La date de fin (${end.toLocaleDateString("fr-FR")}) est dépassée.`,
        };
    }

    return {
        code: "ACTIVE",
        label: "Promo en cours",
        badgeClass: "bg-emerald-50 text-emerald-700 border-emerald-200",
        description: end
            ? `Visible en ligne jusqu'au ${end.toLocaleDateString("fr-FR")}.`
            : "Visible en ligne actuellement.",
    };
}

export default function PromoForm({
    promo,
    token,
    fingerprint,
    onUpdatePromo,
}: PromoFormProps) {
    const router = useRouter();
    const [formData, setFormData] = useState<IPromoBannerData>({
        active: promo?.active ?? false,
        title: promo?.title ?? "",
        promoCode: promo?.promoCode ?? "",
        linkUrl: promo?.linkUrl ?? "",
        linkLabel: promo?.linkLabel ?? "",
        dateStart: promo?.dateStart ? promo.dateStart.slice(0, 10) : "",
        dateEnd: promo?.dateEnd ? promo.dateEnd.slice(0, 10) : "",
        bgColor: promo?.bgColor || "#7A9B8E",
        textColor: promo?.textColor || "#FFFFFF",
    });
    const [previewDevice, setPreviewDevice] = useState<"desktop" | "mobile">("desktop");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const status = getPromoStatus(formData);

    const updateField = <K extends keyof IPromoBannerData>(
        key: K,
        value: IPromoBannerData[K]
    ) => {
        setFormData((prev) => ({ ...prev, [key]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!token || !fingerprint) {
            toast.error("Session expirée, veuillez vous reconnecter.");
            return;
        }

        if (formData.active && !formData.title.trim()) {
            toast.error("Veuillez saisir un texte pour la bannière avant de l'activer.");
            return;
        }

        if (
            formData.dateStart &&
            formData.dateEnd &&
            new Date(formData.dateStart) > new Date(formData.dateEnd)
        ) {
            toast.error("La date de fin doit être postérieure à la date de début.");
            return;
        }

        setIsSubmitting(true);

        try {
            const payload: IPromoBannerPayload = {
                active: formData.active,
                title: formData.title.trim(),
                promoCode: formData.promoCode.trim() || null,
                linkUrl: formData.linkUrl.trim() || null,
                linkLabel: formData.linkLabel.trim() || null,
                dateStart: formData.dateStart ? new Date(formData.dateStart).toISOString() : null,
                dateEnd: formData.dateEnd ? new Date(formData.dateEnd).toISOString() : null,
                bgColor: formData.bgColor,
                textColor: formData.textColor,
            };

            await createBanner(token, fingerprint, payload);

            onUpdatePromo?.(formData);
            router.refresh();
            toast.success("Bannière promotionnelle enregistrée et mise à jour !");
        } catch (error) {
            toast.error(
                error instanceof Error ? error.message : "Impossible de sauvegarder la bannière."
            );
        } finally {
            setIsSubmitting(false);
        }
    };


    return (
        <div className="space-y-6">
            {/* ===================================================== */}
            {/* APERÇU EN DIRECT DE LA BANNIÈRE                       */}
            {/* ===================================================== */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-2xs space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
                    <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center">
                            <Eye className="w-4 h-4" />
                        </div>
                        <div>
                            <h3 className="text-sm font-bold text-slate-900">
                                Aperçu en direct sur la boutique
                            </h3>
                            <p className="text-xs text-slate-500">{status.description}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <span
                            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${status.badgeClass}`}
                        >
                            {status.code === "ACTIVE" && <CheckCircle2 className="w-3.5 h-3.5" />}
                            {status.code === "SCHEDULED" && <Clock className="w-3.5 h-3.5" />}
                            {status.code === "EXPIRED" && <AlertCircle className="w-3.5 h-3.5" />}
                            {status.code === "DISABLED" && <PowerOff className="w-3.5 h-3.5" />}
                            {status.label}
                        </span>

                        <div className="hidden sm:flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200/60">
                            <button
                                type="button"
                                onClick={() => setPreviewDevice("desktop")}
                                className={`p-1.5 rounded-lg text-xs transition cursor-pointer ${
                                    previewDevice === "desktop"
                                        ? "bg-white text-slate-900 shadow-2xs"
                                        : "text-slate-500 hover:text-slate-900"
                                }`}
                                title="Aperçu Ordinateur"
                            >
                                <Monitor className="w-4 h-4" />
                            </button>
                            <button
                                type="button"
                                onClick={() => setPreviewDevice("mobile")}
                                className={`p-1.5 rounded-lg text-xs transition cursor-pointer ${
                                    previewDevice === "mobile"
                                        ? "bg-white text-slate-900 shadow-2xs"
                                        : "text-slate-500 hover:text-slate-900"
                                }`}
                                title="Aperçu Smartphone"
                            >
                                <Smartphone className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Conteneur de simulation de la bannière */}
                <div className="bg-slate-100/80 rounded-2xl p-4 sm:p-6 flex justify-center border border-slate-200/60">
                    <div
                        className={`w-full transition-all duration-300 rounded-xl overflow-hidden shadow-md ${
                            previewDevice === "mobile" ? "max-w-[360px]" : "w-full"
                        }`}
                        style={{
                            backgroundColor: formData.bgColor,
                            color: formData.textColor,
                        }}
                    >
                        <div className="px-4 py-3 sm:px-6 sm:py-3.5 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-center">
                            <span className="font-medium text-xs sm:text-sm leading-snug">
                                {formData.title || "Saisissez le texte de votre annonce..."}
                            </span>

                            {formData.promoCode && (
                                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/15 backdrop-blur-xs border border-current/25 text-xs font-mono font-bold tracking-wider uppercase">
                                    <Tag className="w-3 h-3" />
                                    {formData.promoCode}
                                </span>
                            )}

                            {formData.linkLabel && (
                                <span className="inline-flex items-center gap-1 text-xs sm:text-sm font-semibold underline underline-offset-4">
                                    {formData.linkLabel}
                                    <ExternalLink className="w-3.5 h-3.5" />
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* ===================================================== */}
            {/* FORMULAIRE D'ÉDITION DE LA BANNIÈRE                   */}
            {/* ===================================================== */}
            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* COLONNE GAUCHE (2/3) : TEXTES & DATES */}
                <div className="lg:col-span-2 space-y-6">
                    {/* 1. Contenu & Liens */}
                    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-2xs space-y-4">
                        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                            <div className="flex items-center gap-2.5">
                                <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                                    <Megaphone className="w-4 h-4" />
                                </div>
                                <h2 className="text-base font-semibold text-slate-900">
                                    Message & Redirection
                                </h2>
                            </div>

                            <label className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={formData.active}
                                    onChange={(e) => updateField("active", e.target.checked)}
                                    className="w-4 h-4 accent-slate-900 rounded cursor-pointer"
                                />
                                <span className="text-xs font-semibold text-slate-800">
                                    {formData.active ? "Activée" : "Désactivée"}
                                </span>
                            </label>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
                                    Texte principal de la bannière *
                                </label>
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) => updateField("title", e.target.value)}
                                    placeholder="Ex: ✨ Offre spéciale : -15% sur tous les coffrets rituels !"
                                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-sm text-slate-900 focus:bg-white focus:border-slate-900 focus:outline-none transition"
                                />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
                                        Code Promo (Optionnel)
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.promoCode}
                                        onChange={(e) =>
                                            updateField("promoCode", e.target.value.toUpperCase())
                                        }
                                        placeholder="Ex: LUMI15"
                                        className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-sm font-mono uppercase text-slate-900 focus:bg-white focus:border-slate-900 focus:outline-none transition"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
                                        Texte du bouton
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.linkLabel}
                                        onChange={(e) => updateField("linkLabel", e.target.value)}
                                        placeholder="Ex: En profiter"
                                        className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-sm text-slate-900 focus:bg-white focus:border-slate-900 focus:outline-none transition"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
                                        Lien URL cible
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.linkUrl}
                                        onChange={(e) => updateField("linkUrl", e.target.value)}
                                        placeholder="Ex: /bougies-rituel"
                                        className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-sm text-slate-900 focus:bg-white focus:border-slate-900 focus:outline-none transition"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 2. Planification (Date de début & Date de fin) */}
                    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-2xs space-y-4">
                        <div className="flex items-center gap-2.5 border-b border-slate-100 pb-3">
                            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                                <Calendar className="w-4 h-4" />
                            </div>
                            <div>
                                <h2 className="text-base font-semibold text-slate-900">
                                    Période de validité
                                </h2>
                                <p className="text-xs text-slate-500">
                                    Laissez vide pour afficher sans limite de date tant que le switch est activé.
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
                                    Date de début
                                </label>
                                <input
                                    type="date"
                                    value={formData.dateStart}
                                    onChange={(e) => updateField("dateStart", e.target.value)}
                                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-sm text-slate-900 focus:bg-white focus:border-slate-900 focus:outline-none transition"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
                                    Date de fin
                                </label>
                                <input
                                    type="date"
                                    value={formData.dateEnd}
                                    onChange={(e) => updateField("dateEnd", e.target.value)}
                                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-sm text-slate-900 focus:bg-white focus:border-slate-900 focus:outline-none transition"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* COLONNE DROITE (1/3) : COULEURS & VALIDATION */}
                <div className="space-y-6 flex flex-col justify-between">
                    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-2xs space-y-4">
                        <div className="flex items-center gap-2.5 border-b border-slate-100 pb-3">
                            <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
                                <Palette className="w-4 h-4" />
                            </div>
                            <h2 className="text-base font-semibold text-slate-900">
                                Apparence & Couleurs
                            </h2>
                        </div>

                        <div className="space-y-2">
                            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block">
                                Thèmes rapides
                            </span>
                            <div className="flex flex-wrap gap-2">
                                {COLOR_PRESETS.map((preset) => (
                                    <button
                                        key={preset.name}
                                        type="button"
                                        onClick={() => {
                                            setFormData((prev) => ({
                                                ...prev,
                                                bgColor: preset.bg,
                                                textColor: preset.text,
                                            }));
                                        }}
                                        className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-700 hover:bg-slate-50 transition cursor-pointer"
                                    >
                                        <span
                                            className="w-3.5 h-3.5 rounded-full border border-black/10"
                                            style={{ backgroundColor: preset.bg }}
                                        />
                                        {preset.name}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3 pt-2">
                            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                                <label className="block text-[11px] font-semibold uppercase text-slate-500 mb-1.5">
                                    Fond (BG)
                                </label>
                                <div className="flex items-center gap-2">
                                    <input
                                        type="color"
                                        value={formData.bgColor}
                                        onChange={(e) => updateField("bgColor", e.target.value)}
                                        className="w-8 h-8 rounded cursor-pointer border-0 bg-transparent shrink-0"
                                    />
                                    <input
                                        type="text"
                                        value={formData.bgColor}
                                        onChange={(e) => updateField("bgColor", e.target.value)}
                                        className="w-full text-xs font-mono bg-white border border-slate-200 rounded-lg px-2 py-1.5"
                                    />
                                </div>
                            </div>

                            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                                <label className="block text-[11px] font-semibold uppercase text-slate-500 mb-1.5">
                                    Texte
                                </label>
                                <div className="flex items-center gap-2">
                                    <input
                                        type="color"
                                        value={formData.textColor}
                                        onChange={(e) => updateField("textColor", e.target.value)}
                                        className="w-8 h-8 rounded cursor-pointer border-0 bg-transparent shrink-0"
                                    />
                                    <input
                                        type="text"
                                        value={formData.textColor}
                                        onChange={(e) => updateField("textColor", e.target.value)}
                                        className="w-full text-xs font-mono bg-white border border-slate-200 rounded-lg px-2 py-1.5"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-3.5 px-5 rounded-xl bg-slate-900 text-white font-semibold text-sm hover:bg-slate-800 disabled:opacity-60 active:scale-[0.99] transition shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                <span>Enregistrement...</span>
                            </>
                        ) : (
                            <>
                                <Save className="w-4 h-4" />
                                <span>Appliquer la bannière</span>
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}
