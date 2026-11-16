"use client";

import { useRef, useState } from "react";
import { toast } from "sonner";
import {
    Megaphone,
    Calendar,
    Palette,
    Image as ImageIcon,
    Eye,
    Upload,
    Trash2,
    CheckCircle2,
    Clock,
    AlertCircle,
    PowerOff,
    ExternalLink,
    Tag,
    Save,
    Smartphone,
    Monitor,
} from "lucide-react";

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
    imageUrl: string | null;
    imageMode: "background" | "thumbnail";
    overlayOpacity: number;
}

interface PromoFormProps {
    promo: IPromoBannerData;
    onUpdatePromo: (newPromo: IPromoBannerData) => void;
}

const COLOR_PRESETS = [
    { name: "Sauge Lumilaya", bg: "#7A9B8E", text: "#FFFFFF" },
    { name: "Nuit Étoilée", bg: "#1E293B", text: "#FFFFFF" },
    { name: "Terracotta", bg: "#9A3412", text: "#FFFFFF" },
    { name: "Sable Doux", bg: "#F5EFE6", text: "#2C2C2C" },
    { name: "Forêt Profonde", bg: "#14532D", text: "#FFFFFF" },
];

// Calcule le statut réel de la promo selon le switch + les dates
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

export default function PromoForm({ promo, onUpdatePromo }: PromoFormProps) {
    const [formData, setFormData] = useState<IPromoBannerData>(promo);
    const [previewDevice, setPreviewDevice] = useState<"desktop" | "mobile">("desktop");
    const fileInputRef = useRef<HTMLInputElement>(null);

    const status = getPromoStatus(formData);

    const updateField = <K extends keyof IPromoBannerData>(
        key: K,
        value: IPromoBannerData[K]
    ) => {
        const updated = { ...formData, [key]: value };
        setFormData(updated);
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Prévisualisation locale immédiate (sans backend)
        const localPreviewUrl = URL.createObjectURL(file);
        updateField("imageUrl", localPreviewUrl);
        toast.success("Image chargée dans l'aperçu");
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (
            formData.dateStart &&
            formData.dateEnd &&
            new Date(formData.dateStart) > new Date(formData.dateEnd)
        ) {
            toast.error("La date de fin doit être postérieure à la date de début");
            return;
        }

        onUpdatePromo(formData);
        toast.success("Configuration de la bannière mise à jour (Mode démo)");
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

                    {/* Sélecteur d'aperçu Desktop / Mobile + Badge Statut */}
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
                        className={`w-full transition-all duration-300 rounded-xl overflow-hidden shadow-md relative ${
                            previewDevice === "mobile" ? "max-w-[360px]" : "w-full"
                        }`}
                        style={{
                            backgroundColor: formData.bgColor,
                            color: formData.textColor,
                        }}
                    >
                        {/* Image en mode FOND (Background) */}
                        {formData.imageUrl && formData.imageMode === "background" && (
                            <>
                                <img
                                    src={formData.imageUrl}
                                    alt="Fond bannière"
                                    className="absolute inset-0 w-full h-full object-cover z-0"
                                />
                                <div
                                    className="absolute inset-0 z-0 transition-opacity"
                                    style={{
                                        backgroundColor: formData.bgColor,
                                        opacity: formData.overlayOpacity / 100,
                                    }}
                                />
                            </>
                        )}

                        {/* Contenu de la bannière */}
                        <div className="relative z-10 px-4 py-3.5 sm:px-6 sm:py-4 flex flex-col sm:flex-row items-center justify-center gap-3 text-center sm:text-left">
                            {/* Image en mode VIGNETTE (Thumbnail) */}
                            {formData.imageUrl && formData.imageMode === "thumbnail" && (
                                <img
                                    src={formData.imageUrl}
                                    alt="Visuel promo"
                                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl object-cover border border-white/30 shadow-xs shrink-0"
                                />
                            )}

                            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
                                <span className="font-medium text-xs sm:text-sm leading-snug">
                                    {formData.title || "Saisissez le texte de votre annonce..."}
                                </span>

                                {formData.promoCode && (
                                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-white/20 backdrop-blur-xs border border-white/30 text-xs font-mono font-bold tracking-wider uppercase">
                                        <Tag className="w-3 h-3" />
                                        {formData.promoCode}
                                    </span>
                                )}

                                {formData.linkLabel && (
                                    <span className="inline-flex items-center gap-1 text-xs sm:text-sm font-bold underline underline-offset-4 cursor-pointer hover:opacity-80">
                                        {formData.linkLabel}
                                        <ExternalLink className="w-3.5 h-3.5" />
                                    </span>
                                )}
                            </div>
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

                            {/* Switch Actif / Inactif */}
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
                                        placeholder="Ex: En profiter →"
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
                                    Définissez quand la bannière doit s&apos;afficher et s&apos;arrêter automatiquement.
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

                {/* COLONNE DROITE (1/3) : COULEURS & IMAGE */}
                <div className="space-y-6">
                    
                    {/* 3. Couleurs & Thème */}
                    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-2xs space-y-4">
                        <div className="flex items-center gap-2.5 border-b border-slate-100 pb-3">
                            <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
                                <Palette className="w-4 h-4" />
                            </div>
                            <h2 className="text-base font-semibold text-slate-900">
                                Apparence & Couleurs
                            </h2>
                        </div>

                        {/* Presets rapides */}
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

                        {/* Color pickers personnalisés */}
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

                    {/* 4. Image de bannière */}
                    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-2xs space-y-4">
                        <div className="flex items-center gap-2.5 border-b border-slate-100 pb-3">
                            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                                <ImageIcon className="w-4 h-4" />
                            </div>
                            <div>
                                <h2 className="text-base font-semibold text-slate-900">
                                    Image d&apos;illustration
                                </h2>
                                <p className="text-xs text-slate-500">
                                    En fond de bannière ou en vignette.
                                </p>
                            </div>
                        </div>

                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleImageUpload}
                        />

                        {formData.imageUrl ? (
                            <div className="space-y-3">
                                <div className="relative h-28 w-full rounded-xl overflow-hidden border border-slate-200 bg-slate-100">
                                    <img
                                        src={formData.imageUrl}
                                        alt="Aperçu upload"
                                        className="w-full h-full object-cover"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => updateField("imageUrl", null)}
                                        className="absolute top-2 right-2 p-1.5 rounded-lg bg-rose-600 text-white hover:bg-rose-700 transition cursor-pointer shadow-xs"
                                        title="Retirer l'image"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>

                                {/* Mode d'affichage de l'image */}
                                <div className="grid grid-cols-2 gap-2">
                                    <button
                                        type="button"
                                        onClick={() => updateField("imageMode", "background")}
                                        className={`py-2 px-3 rounded-xl text-xs font-semibold border transition cursor-pointer ${
                                            formData.imageMode === "background"
                                                ? "bg-slate-900 text-white border-slate-900"
                                                : "bg-slate-50 text-slate-600 border-slate-200"
                                        }`}
                                    >
                                        Image de fond
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => updateField("imageMode", "thumbnail")}
                                        className={`py-2 px-3 rounded-xl text-xs font-semibold border transition cursor-pointer ${
                                            formData.imageMode === "thumbnail"
                                                ? "bg-slate-900 text-white border-slate-900"
                                                : "bg-slate-50 text-slate-600 border-slate-200"
                                        }`}
                                    >
                                        Vignette côté texte
                                    </button>
                                </div>

                                {/* Réglage de l'opacité du voile si mode background */}
                                {formData.imageMode === "background" && (
                                    <div className="space-y-1 pt-1">
                                        <div className="flex justify-between text-xs">
                                            <span className="text-slate-500">Voile de couleur</span>
                                            <span className="font-semibold text-slate-700">
                                                {formData.overlayOpacity}%
                                            </span>
                                        </div>
                                        <input
                                            type="range"
                                            min={20}
                                            max={95}
                                            value={formData.overlayOpacity}
                                            onChange={(e) =>
                                                updateField("overlayOpacity", Number(e.target.value))
                                            }
                                            className="w-full accent-slate-900 cursor-pointer"
                                        />
                                    </div>
                                )}
                            </div>
                        ) : (
                            <button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                className="w-full py-6 px-4 rounded-xl border-2 border-dashed border-slate-200 hover:border-slate-400 bg-slate-50/50 hover:bg-slate-100/60 transition flex flex-col items-center justify-center gap-2 text-slate-500 cursor-pointer"
                            >
                                <Upload className="w-5 h-5 text-slate-400" />
                                <span className="text-xs font-medium">
                                    Cliquez pour ajouter une image
                                </span>
                            </button>
                        )}
                    </div>

                    {/* Bouton de validation */}
                    <button
                        type="submit"
                        className="w-full py-3.5 px-5 rounded-xl bg-slate-900 text-white font-semibold text-sm hover:bg-slate-800 active:scale-[0.99] transition shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                    >
                        <Save className="w-4 h-4" />
                        <span>Appliquer la bannière</span>
                    </button>
                </div>

            </form>
        </div>
    );
}
