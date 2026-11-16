"use client";

import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { ProductSchema, IProduct } from "@/schema/product";
import { generateFingerprint } from "@/utils/dbFunction";
import { createProduct } from "@/lib/action/admin.action";
import { useRef, useState } from "react";
import {
    Package,
    Layers,
    Sparkles,
    Gift,
    Image as ImageIcon,
    Tag as TagIcon,
    Plus,
    Trash2,
    Upload,
    Star,
    Loader2,
    Check,
    Wand2,
    Flame,
    Heart,
    Percent,
    X,
} from "lucide-react";

interface ProductFormProps {
    onSuccess?: () => void;
}

interface IStoneItem {
    name: string;
    benefits: string[];
}

interface IVariantItem {
    name: string;
    duration: number;
    weight: number;
    price: number;
}

// Helper pour transformer un nom en slug propre (ex: "Bracelet Pierre de Lune" -> "bracelet-pierre-de-lune")
function slugify(value: string): string {
    return value
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
}

// function getFieldError(errors: unknown[]): string | null {
//     if (!errors || errors.length === 0) return null;
//     const first = errors[0];
//     if (typeof first === "string") return first;
//     if (first && typeof first === "object" && "message" in first) {
//         return String((first as { message: unknown }).message);
//     }
//     return null;
// }


function ProductForm({ onSuccess }: ProductFormProps) {
    const [isCoffret, setIsCoffret] = useState<boolean>(false);
    const [showWellness, setShowWellness] = useState<boolean>(false);
    const [autoSlug, setAutoSlug] = useState<boolean>(true);
    const [tagInput, setTagInput] = useState<string>("");
    const [imagePreviews, setImagePreviews] = useState<{ file: File; url: string }[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const form = useForm({
        defaultValues: {
            description: [""],
            images: [],
            wellness: {},
            meta: {
                collection: "",
                name: "",
                slug: "",
                intro: "",
                content: [],
                theme: {
                    top: "",
                    heart: "",
                    base: "",
                },
                stock: true,
                promo: undefined,
                like: undefined,
            },
            variants: [
                {
                    name: "",
                    duration: 0,
                    weight: 0,
                    price: 0,
                },
            ],
            tags: [],
        } as IProduct,

        validators: {
            onChange: ProductSchema,
        },

        onSubmit: async ({ value }) => {
            const fingerprint = generateFingerprint();
            const token = sessionStorage.getItem("admin-token");

            if (!token || !fingerprint) {
                toast.error("Session expirée, veuillez vous reconnecter");
                return;
            }

            try {
                // Nettoyage des lignes vides avant envoi
                const cleanedValue: IProduct = {
                    ...value,
                    description: value.description.map((d: string) => d.trim()).filter(Boolean),
                    meta: {
                        ...value.meta,
                        content: isCoffret
                            ? (value.meta.content || []).map((c: string) => c.trim()).filter(Boolean)
                            : [],
                    },
                    wellness: showWellness ? value.wellness : {},
                };

                const res = await createProduct(token, fingerprint, cleanedValue);

                if (res?.id) {
                    toast.success("Produit créé avec succès !");
                    form.reset();
                    setImagePreviews([]);
                    setIsCoffret(false);
                    setShowWellness(false);
                    setAutoSlug(true);
                    onSuccess?.();
                } else {
                    toast.error("Une erreur est survenue lors de la création");
                }
            } catch (error) {
                console.error(error);
                toast.error("Erreur serveur lors de la création du produit");
            }
        },
    });

    // Gestion de l'ajout d'images avec aperçu
    const handleFilesSelected = (
        e: React.ChangeEvent<HTMLInputElement>,
        currentFiles: File[],
        onChange: (files: File[]) => void
    ) => {
        const selected = Array.from(e.target.files ?? []);
        if (selected.length === 0) return;

        const combined = [...currentFiles, ...selected].slice(0, 5);
        onChange(combined);

        const previews = combined.map((file: File) => ({
            file,
            url: URL.createObjectURL(file),
        }));
        setImagePreviews(previews);

        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const handleRemoveImage = (
        indexToRemove: number,
        currentFiles: File[],
        onChange: (files: File[]) => void
    ) => {
        const updated = currentFiles.filter((_: File, idx: number) => idx !== indexToRemove);
        onChange(updated);
        setImagePreviews((prev) => prev.filter((_, idx: number) => idx !== indexToRemove));
    };

    return (
        <form
            className="space-y-6 bg-white border border-slate-200/80 rounded-2xl p-5 sm:p-8 shadow-sm"
            onSubmit={(e) => {
                e.preventDefault();
                form.handleSubmit();
            }}
        >
            {/* EN-TÊTE DU FORMULAIRE */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-5">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                        <Package className="w-5 h-5" />
                    </div>
                    <div>
                        <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                            Nouveau produit
                        </h2>
                        <p className="text-xs sm:text-sm text-slate-500">
                            Remplissez les informations pour publier une bougie, un coffret ou un accessoire.
                        </p>
                    </div>
                </div>
            </div>

            {/* ========================================================= */}
            {/* 1. IDENTITÉ, COLLECTION & SLUG                            */}
            {/* ========================================================= */}
            <div className="bg-slate-50/60 rounded-2xl border border-slate-200/70 p-5 space-y-5">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
                    <span>1. Identité & Catégorie</span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* COLLECTION */}
                    <form.Field name="meta.collection">
                        {({ state, handleChange, handleBlur }) => (
                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
                                    Collection <span className="text-rose-500">*</span>
                                </label>
                                <select
                                    className="w-full rounded-xl border border-slate-200 bg-white py-2.5 px-3.5 text-sm font-medium text-slate-900 focus:border-slate-900 focus:outline-none transition cursor-pointer"
                                    value={state.value}
                                    onBlur={handleBlur}
                                    onChange={(e) => {
                                        const col = e.target.value;
                                        handleChange(col);

                                        // Automatisation selon la collection choisie
                                        if (col === "Terre") {
                                            setShowWellness(true);
                                            if (!form.state.values.wellness?.stones) {
                                                form.setFieldValue("wellness", {
                                                    stones: [{ name: "", benefits: [""] }],
                                                    idealFor: [""],
                                                });
                                            }
                                        } else if (col === "Emotion") {
                                            setShowWellness(false);
                                            form.setFieldValue("wellness", {});
                                        } else if (col === "Coffret") {
                                            setIsCoffret(true);
                                            if (
                                                !form.state.values.meta.content ||
                                                form.state.values.meta.content.length === 0
                                            ) {
                                                form.setFieldValue("meta.content", [""]);
                                            }
                                        }
                                    }}
                                >
                                    <option value="">Sélectionner...</option>
                                    <option value="Emotion">Émotion & Plaisir (Parfumées)</option>
                                    <option value="Terre">Entre Terre & Ciel (Énergétiques)</option>
                                    <option value="Coffret">Coffret</option>
                                    <option value="Autre">Autre (Bracelet / Accessoire)</option>
                                </select>
                                {state.meta.errors.length > 0 && (
                                    <p className="text-rose-600 text-xs mt-1">
                                        {state.meta.errors[0]?.message}
                                    </p>
                                )}
                            </div>
                        )}
                    </form.Field>

                    {/* NOM DU PRODUIT */}
                    <form.Field name="meta.name">
                        {({ state, handleChange, handleBlur }) => (
                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
                                    Nom du produit <span className="text-rose-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Ex: Tendresse, Bracelet Quartz Rose..."
                                    className="w-full rounded-xl border border-slate-200 bg-white py-2.5 px-3.5 text-sm text-slate-900 focus:border-slate-900 focus:outline-none transition"
                                    value={state.value}
                                    onBlur={handleBlur}
                                    onChange={(e) => {
                                        const val = e.target.value;
                                        handleChange(val);
                                        if (autoSlug) {
                                            const col = form.state.values.meta.collection;
                                            const prefix =
                                                col === "Emotion" || col === "Terre"
                                                    ? "bougie-"
                                                    : col === "Coffret"
                                                    ? "coffret-"
                                                    : "";
                                            const cleanVal = slugify(val).replace(
                                                /^(bougie-|coffret-)/,
                                                ""
                                            );
                                            form.setFieldValue(
                                                "meta.slug",
                                                cleanVal ? `${prefix}${cleanVal}` : ""
                                            );
                                        }
                                    }}
                                />
                                {state.meta.errors.length > 0 && (
                                    <p className="text-rose-600 text-xs mt-1">
                                        {state.meta.errors[0]?.message}
                                    </p>
                                )}
                            </div>
                        )}
                    </form.Field>

                    {/* SLUG URL */}
                    <form.Field name="meta.slug">
                        {({ state, handleChange }) => (
                            <div>
                                <div className="flex items-center justify-between mb-1.5">
                                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                                        Slug URL <span className="text-rose-500">*</span>
                                    </label>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setAutoSlug(true);
                                            const currentName = form.state.values.meta.name;
                                            handleChange(slugify(currentName));
                                        }}
                                        className="text-[11px] text-emerald-700 hover:underline inline-flex items-center gap-1 cursor-pointer"
                                    >
                                        <Wand2 className="w-3 h-3" />
                                        Auto
                                    </button>
                                </div>
                                <input
                                    type="text"
                                    placeholder="Ex: bougie-tendresse"
                                    className="w-full rounded-xl border border-slate-200 bg-white py-2.5 px-3.5 text-sm font-mono text-slate-700 focus:border-slate-900 focus:outline-none transition"
                                    value={state.value}
                                    onChange={(e) => {
                                        setAutoSlug(false);
                                        handleChange(slugify(e.target.value));
                                    }}
                                />
                            </div>
                        )}
                    </form.Field>
                </div>

                {/* STOCK, PROMO & LIKES */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                    <form.Field name="meta.stock">
                        {({ state, handleChange }) => (
                            <label className="flex items-center justify-between p-3.5 rounded-xl bg-white border border-slate-200 cursor-pointer">
                                <div>
                                    <span className="text-sm font-semibold text-slate-900 block">
                                        En stock
                                    </span>
                                    <span className="text-xs text-slate-400">
                                        Disponible à l&apos;achat immédiat
                                    </span>
                                </div>
                                <input
                                    type="checkbox"
                                    checked={state.value}
                                    onChange={(e) => handleChange(e.target.checked)}
                                    className="w-5 h-5 accent-slate-900 rounded cursor-pointer"
                                />
                            </label>
                        )}
                    </form.Field>

                    <form.Field name="meta.promo">
                        {({ state, handleChange }) => (
                            <div className="p-3 rounded-xl bg-white border border-slate-200">
                                <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-500 mb-1">
                                    Réduction Promo (%)
                                </label>
                                <div className="relative">
                                    <Percent className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                    <input
                                        type="number"
                                        min={0}
                                        max={100}
                                        placeholder="0"
                                        className="w-full pl-9 pr-3 py-1.5 text-sm rounded-lg border border-slate-200 focus:border-slate-900 focus:outline-none"
                                        value={state.value ?? ""}
                                        onChange={(e) =>
                                            handleChange(
                                                e.target.value ? Number(e.target.value) : undefined
                                            )
                                        }
                                    />
                                </div>
                            </div>
                        )}
                    </form.Field>

                    <form.Field name="meta.like">
                        {({ state, handleChange }) => (
                            <div className="p-3 rounded-xl bg-white border border-slate-200">
                                <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-500 mb-1">
                                    Likes initiaux
                                </label>
                                <div className="relative">
                                    <Heart className="w-4 h-4 text-rose-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                    <input
                                        type="number"
                                        min={0}
                                        placeholder="0"
                                        className="w-full pl-9 pr-3 py-1.5 text-sm rounded-lg border border-slate-200 focus:border-slate-900 focus:outline-none"
                                        value={state.value ?? ""}
                                        onChange={(e) =>
                                            handleChange(
                                                e.target.value ? Number(e.target.value) : undefined
                                            )
                                        }
                                    />
                                </div>
                            </div>
                        )}
                    </form.Field>
                </div>
            </div>

            {/* ========================================================= */}
            {/* 2. DÉCLINAISONS / FORMATS (VARIANTS)                      */}
            {/* ========================================================= */}
            <div className="bg-slate-50/60 rounded-2xl border border-slate-200/70 p-5 space-y-4">
                <form.Field name="variants" mode="array">
                    {(variantsField) => (
                        <>
                            <div className="flex flex-wrap items-center justify-between gap-2">
                                <div className="flex items-center gap-2">
                                    <Layers className="w-4 h-4 text-slate-700" />
                                    <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700">
                                        2. Formats & Tarifs ({variantsField.state.value.length})
                                    </h3>
                                </div>

                                <button
                                    type="button"
                                    onClick={() =>
                                        variantsField.pushValue({
                                            name: "",
                                            duration: 0,
                                            weight: 0,
                                            price: 0,
                                        })
                                    }
                                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition cursor-pointer"
                                >
                                    <Plus className="w-3.5 h-3.5" />
                                    Ajouter un format
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {(variantsField.state.value || []).map(
                                    (_: IVariantItem, index: number) => (
                                        <div
                                            key={index}
                                            className="bg-white rounded-xl border border-slate-200 p-4 space-y-3 shadow-2xs"
                                        >
                                            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                                                <span className="text-xs font-bold text-slate-700">
                                                    Format n°{index + 1}
                                                </span>
                                                {variantsField.state.value.length > 1 && (
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            variantsField.removeValue(index)
                                                        }
                                                        className="text-xs text-rose-600 hover:underline inline-flex items-center gap-1 cursor-pointer"
                                                    >
                                                        <Trash2 className="w-3.5 h-3.5" />
                                                        Retirer
                                                    </button>
                                                )}
                                            </div>

                                            <form.Field name={`variants[${index}].name`}>
                                                {({ state, handleChange, handleBlur }) => (
                                                    <div>
                                                        <label className="block text-xs font-medium text-slate-600 mb-1">
                                                            Nom du format (ex: 150g, Taille 18cm...) *
                                                        </label>
                                                        <input
                                                            type="text"
                                                            placeholder="Ex: Bougie 150g ou Taille Unique"
                                                            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-slate-900 focus:outline-none"
                                                            value={state.value}
                                                            onBlur={handleBlur}
                                                            onChange={(e) =>
                                                                handleChange(e.target.value)
                                                            }
                                                        />
                                                    </div>
                                                )}
                                            </form.Field>

                                            <div className="grid grid-cols-3 gap-2.5">
                                                <form.Field name={`variants[${index}].price`}>
                                                    {({ state, handleChange }) => (
                                                        <div>
                                                            <label className="block text-[11px] font-medium text-slate-500 mb-1">
                                                                Prix (€) *
                                                            </label>
                                                            <input
                                                                type="number"
                                                                step="0.01"
                                                                min={0}
                                                                className="w-full rounded-lg border border-slate-200 px-2.5 py-2 text-sm focus:border-slate-900 focus:outline-none"
                                                                value={state.value}
                                                                onChange={(e) =>
                                                                    handleChange(
                                                                        Number(e.target.value)
                                                                    )
                                                                }
                                                            />
                                                        </div>
                                                    )}
                                                </form.Field>

                                                <form.Field name={`variants[${index}].weight`}>
                                                    {({ state, handleChange }) => (
                                                        <div>
                                                            <label className="block text-[11px] font-medium text-slate-500 mb-1">
                                                                Poids (g)
                                                            </label>
                                                            <input
                                                                type="number"
                                                                min={0}
                                                                placeholder="0 si bijou"
                                                                className="w-full rounded-lg border border-slate-200 px-2.5 py-2 text-sm focus:border-slate-900 focus:outline-none"
                                                                value={state.value}
                                                                onChange={(e) =>
                                                                    handleChange(
                                                                        Number(e.target.value)
                                                                    )
                                                                }
                                                            />
                                                        </div>
                                                    )}
                                                </form.Field>

                                                <form.Field name={`variants[${index}].duration`}>
                                                    {({ state, handleChange }) => (
                                                        <div>
                                                            <label className="block text-[11px] font-medium text-slate-500 mb-1">
                                                                Durée (h)
                                                            </label>
                                                            <input
                                                                type="number"
                                                                min={0}
                                                                placeholder="0 si bijou"
                                                                className="w-full rounded-lg border border-slate-200 px-2.5 py-2 text-sm focus:border-slate-900 focus:outline-none"
                                                                value={state.value}
                                                                onChange={(e) =>
                                                                    handleChange(
                                                                        Number(e.target.value)
                                                                    )
                                                                }
                                                            />
                                                        </div>
                                                    )}
                                                </form.Field>
                                            </div>
                                        </div>
                                    )
                                )}
                            </div>
                        </>
                    )}
                </form.Field>
            </div>

            {/* ========================================================= */}
            {/* 3. TEXTES, INTRO SEO & PARAGRAPHES DE DESCRIPTION         */}
            {/* ========================================================= */}
            <div className="bg-slate-50/60 rounded-2xl border border-slate-200/70 p-5 space-y-5">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700">
                    3. Textes & Descriptions (Boutique + SEO)
                </h3>

                {/* INTRO COURTE */}
                <form.Field name="meta.intro">
                    {({ state, handleChange }) => (
                        <div>
                            <div className="flex items-center justify-between mb-1.5">
                                <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                                    Phrase d&apos;introduction (utilisée pour Google SEO) *
                                </label>
                                <span
                                    className={`text-xs ${
                                        state.value.length > 160
                                            ? "text-amber-600 font-semibold"
                                            : "text-slate-400"
                                    }`}
                                >
                                    {state.value.length} / 160 caractères
                                </span>
                            </div>
                            <textarea
                                rows={2}
                                placeholder="Résumé attractif du produit, ses notes ou ses pierres..."
                                className="w-full rounded-xl border border-slate-200 bg-white p-3 text-sm focus:border-slate-900 focus:outline-none"
                                value={state.value}
                                onChange={(e) => handleChange(e.target.value)}
                            />
                        </div>
                    )}
                </form.Field>

                {/* PARAGRAPHES DE DESCRIPTION DÉTAILLÉE */}
                <form.Field name="description" mode="array">
                    {(descField) => (
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                                    Paragraphes de description détaillée *
                                </label>
                                <button
                                    type="button"
                                    onClick={() => descField.pushValue("")}
                                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-100 cursor-pointer"
                                >
                                    <Plus className="w-3.5 h-3.5" />
                                    Ajouter un paragraphe
                                </button>
                            </div>

                            <div className="space-y-2.5">
                                {(descField.state.value || []).map(
                                    (_: string, index: number) => (
                                        <div key={index} className="flex gap-2 items-start">
                                            <span className="text-xs font-bold text-slate-400 pt-3 w-6 text-center">
                                                #{index + 1}
                                            </span>
                                            <form.Field name={`description[${index}]`}>
                                                {(subField) => (
                                                    <textarea
                                                        rows={3}
                                                        placeholder={`Paragraphe ${index + 1}...`}
                                                        className="flex-1 rounded-xl border border-slate-200 bg-white p-3 text-sm focus:border-slate-900 focus:outline-none"
                                                        value={subField.state.value}
                                                        onChange={(e) =>
                                                            subField.handleChange(e.target.value)
                                                        }
                                                    />
                                                )}
                                            </form.Field>
                                            {descField.state.value.length > 1 && (
                                                <button
                                                    type="button"
                                                    onClick={() => descField.removeValue(index)}
                                                    className="p-2 mt-1 text-slate-400 hover:text-rose-600 cursor-pointer"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            )}
                                        </div>
                                    )
                                )}
                            </div>
                        </div>
                    )}
                </form.Field>

                {/* PYRAMIDE OLFACTIVE (THEME) */}
                <div className="pt-2">
                    <label className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
                        <Flame className="w-3.5 h-3.5 text-amber-500" />
                        Pyramide olfactive / Caractéristiques (Optionnel pour un bijou)
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <form.Field name="meta.theme.top">
                            {({ state, handleChange }) => (
                                <input
                                    placeholder="Note de tête (ex: Bergamote)"
                                    className="rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm focus:border-slate-900 focus:outline-none"
                                    value={state.value}
                                    onChange={(e) => handleChange(e.target.value)}
                                />
                            )}
                        </form.Field>

                        <form.Field name="meta.theme.heart">
                            {({ state, handleChange }) => (
                                <input
                                    placeholder="Note de cœur (ex: Jasmin)"
                                    className="rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm focus:border-slate-900 focus:outline-none"
                                    value={state.value}
                                    onChange={(e) => handleChange(e.target.value)}
                                />
                            )}
                        </form.Field>

                        <form.Field name="meta.theme.base">
                            {({ state, handleChange }) => (
                                <input
                                    placeholder="Note de fond (ex: Vanille, Musc)"
                                    className="rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm focus:border-slate-900 focus:outline-none"
                                    value={state.value}
                                    onChange={(e) => handleChange(e.target.value)}
                                />
                            )}
                        </form.Field>
                    </div>
                </div>
            </div>

            {/* ========================================================= */}
            {/* 4. OPTIONS SPÉCIALES : COFFRET & LITHOTHÉRAPIE (WELLNESS) */}
            {/* ========================================================= */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* BLOC COFFRET */}
                <div className="bg-slate-50/60 rounded-2xl border border-slate-200/70 p-5 space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Gift className="w-4 h-4 text-purple-600" />
                            <h3 className="text-sm font-bold text-slate-900">
                                Contenu de Coffret
                            </h3>
                        </div>
                        <button
                            type="button"
                            onClick={() => {
                                const next = !isCoffret;
                                setIsCoffret(next);
                                if (next && (!form.state.values.meta.content || form.state.values.meta.content.length === 0)) {
                                    form.setFieldValue("meta.content", [""]);
                                }
                            }}
                            className={`px-3 py-1 rounded-lg text-xs font-semibold border cursor-pointer ${
                                isCoffret
                                    ? "bg-purple-600 text-white border-purple-600"
                                    : "bg-white text-slate-600 border-slate-200"
                            }`}
                        >
                            {isCoffret ? "Activé" : "Activer"}
                        </button>
                    </div>

                    {isCoffret && (
                        <form.Field name="meta.content" mode="array">
                            {(contentField) => (
                                <div className="space-y-2.5 pt-2 border-t border-slate-200/60">
                                    {(contentField.state.value || []).map(
                                        (_: string, index: number) => (
                                            <div key={index} className="flex gap-2">
                                                <form.Field name={`meta.content[${index}]`}>
                                                    {(sub) => (
                                                        <input
                                                            placeholder="Ex: 1 bougie 180g, 1 sauge..."
                                                            className="flex-1 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm"
                                                            value={sub.state.value}
                                                            onChange={(e) =>
                                                                sub.handleChange(e.target.value)
                                                            }
                                                        />
                                                    )}
                                                </form.Field>
                                                <button
                                                    type="button"
                                                    onClick={() => contentField.removeValue(index)}
                                                    className="p-2 text-slate-400 hover:text-rose-600 cursor-pointer"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        )
                                    )}
                                    <button
                                        type="button"
                                        onClick={() => contentField.pushValue("")}
                                        className="text-xs font-semibold text-purple-700 hover:underline inline-flex items-center gap-1 cursor-pointer"
                                    >
                                        <Plus className="w-3.5 h-3.5" />
                                        Ajouter un élément inclus
                                    </button>
                                </div>
                            )}
                        </form.Field>
                    )}
                </div>

                {/* BLOC LITHOTHÉRAPIE / WELLNESS (Pour Terre, Coffret ou Bracelet) */}
                <div className="bg-slate-50/60 rounded-2xl border border-slate-200/70 p-5 space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-emerald-600" />
                            <div>
                                <h3 className="text-sm font-bold text-slate-900">
                                    Pierres & Lithothérapie
                                </h3>
                                <p className="text-[11px] text-slate-500">
                                    Pour les bougies Terre, bracelets ou coffrets énergétiques
                                </p>
                            </div>
                        </div>
                        <button
                            type="button"
                            onClick={() => {
                                const next = !showWellness;
                                setShowWellness(next);
                                if (next && !form.state.values.wellness?.stones) {
                                    form.setFieldValue("wellness", {
                                        stones: [{ name: "", benefits: [""] }],
                                        idealFor: [""],
                                    });
                                }
                            }}
                            className={`px-3 py-1 rounded-lg text-xs font-semibold border cursor-pointer ${
                                showWellness
                                    ? "bg-emerald-600 text-white border-emerald-600"
                                    : "bg-white text-slate-600 border-slate-200"
                            }`}
                        >
                            {showWellness ? "Activé" : "Activer"}
                        </button>
                    </div>

                    {showWellness && (
                        <div className="space-y-4 pt-2 border-t border-slate-200/60">
                            {/* PIERRES */}
                            <form.Field name="wellness.stones" mode="array">
                                {(stonesField) => (
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs font-bold uppercase text-slate-500">
                                                Pierres naturelles
                                            </span>
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    stonesField.pushValue({
                                                        name: "",
                                                        benefits: [""],
                                                    })
                                                }
                                                className="text-xs font-semibold text-emerald-700 hover:underline inline-flex items-center gap-1 cursor-pointer"
                                            >
                                                <Plus className="w-3.5 h-3.5" />
                                                Ajouter une pierre
                                            </button>
                                        </div>

                                        {(stonesField.state.value || []).map(
                                            (_: IStoneItem, index: number) => (
                                                <div
                                                    key={index}
                                                    className="bg-white rounded-xl border border-slate-200 p-3 space-y-2.5"
                                                >
                                                    <div className="flex items-center justify-between gap-2">
                                                        <form.Field
                                                            name={`wellness.stones[${index}].name`}
                                                        >
                                                            {(subField) => (
                                                                <input
                                                                    placeholder="Nom de la pierre (ex: Pierre de Lune)"
                                                                    className="flex-1 rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-medium"
                                                                    value={subField.state.value}
                                                                    onChange={(e) =>
                                                                        subField.handleChange(
                                                                            e.target.value
                                                                        )
                                                                    }
                                                                />
                                                            )}
                                                        </form.Field>
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                stonesField.removeValue(index)
                                                            }
                                                            className="p-1.5 text-slate-400 hover:text-rose-600 cursor-pointer"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </div>

                                                    {/* Bienfaits de la pierre */}
                                                    <form.Field
                                                        name={`wellness.stones[${index}].benefits`}
                                                        mode="array"
                                                    >
                                                        {(benefitsField) => (
                                                            <div className="space-y-1.5 pl-2 border-l-2 border-emerald-200">
                                                                {(
                                                                    benefitsField.state.value || []
                                                                ).map(
                                                                    (
                                                                        _b: string,
                                                                        benefitIndex: number
                                                                    ) => (
                                                                        <div
                                                                            key={benefitIndex}
                                                                            className="flex gap-1.5"
                                                                        >
                                                                            <form.Field
                                                                                name={`wellness.stones[${index}].benefits[${benefitIndex}]`}
                                                                            >
                                                                                {(bf) => (
                                                                                    <input
                                                                                        placeholder="Bienfait (ex: Apaisement émotionnel)"
                                                                                        className="flex-1 rounded-lg border border-slate-200 px-2.5 py-1 text-xs"
                                                                                        value={
                                                                                            bf.state
                                                                                                .value
                                                                                        }
                                                                                        onChange={(
                                                                                            e
                                                                                        ) =>
                                                                                            bf.handleChange(
                                                                                                e
                                                                                                    .target
                                                                                                    .value
                                                                                            )
                                                                                        }
                                                                                    />
                                                                                )}
                                                                            </form.Field>
                                                                            <button
                                                                                type="button"
                                                                                onClick={() =>
                                                                                    benefitsField.removeValue(
                                                                                        benefitIndex
                                                                                    )
                                                                                }
                                                                                className="text-slate-400 hover:text-rose-600 px-1 cursor-pointer"
                                                                            >
                                                                                <X className="w-3.5 h-3.5" />
                                                                            </button>
                                                                        </div>
                                                                    )
                                                                )}
                                                                <button
                                                                    type="button"
                                                                    onClick={() =>
                                                                        benefitsField.pushValue("")
                                                                    }
                                                                    className="text-[11px] font-medium text-emerald-700 hover:underline cursor-pointer"
                                                                >
                                                                    + Ajouter un bienfait
                                                                </button>
                                                            </div>
                                                        )}
                                                    </form.Field>
                                                </div>
                                            )
                                        )}
                                    </div>
                                )}
                            </form.Field>

                            {/* IDÉAL POUR */}
                            <form.Field name="wellness.idealFor" mode="array">
                                {(idealField) => (
                                    <div className="space-y-2 pt-2 border-t border-slate-200/60">
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs font-bold uppercase text-slate-500">
                                                Idéal pour
                                            </span>
                                            <button
                                                type="button"
                                                onClick={() => idealField.pushValue("")}
                                                className="text-xs font-semibold text-emerald-700 hover:underline inline-flex items-center gap-1 cursor-pointer"
                                            >
                                                <Plus className="w-3.5 h-3.5" />
                                                Ajouter
                                            </button>
                                        </div>

                                        {(idealField.state.value || []).map(
                                            (_: string, index: number) => (
                                                <div key={index} className="flex gap-2">
                                                    <form.Field name={`wellness.idealFor[${index}]`}>
                                                        {(sub) => (
                                                            <input
                                                                placeholder="Ex: Méditation, lâcher-prise..."
                                                                className="flex-1 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs"
                                                                value={sub.state.value}
                                                                onChange={(e) =>
                                                                    sub.handleChange(e.target.value)
                                                                }
                                                            />
                                                        )}
                                                    </form.Field>
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            idealField.removeValue(index)
                                                        }
                                                        className="text-slate-400 hover:text-rose-600 cursor-pointer"
                                                    >
                                                        <Trash2 className="w-3.5 h-3.5" />
                                                    </button>
                                                </div>
                                            )
                                        )}
                                    </div>
                                )}
                            </form.Field>
                        </div>
                    )}
                </div>
            </div>

            {/* ========================================================= */}
            {/* 5. GALERIE PHOTOS & TAGS                                  */}
            {/* ========================================================= */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* UPLOAD PHOTOS (2/3) */}
                <div className="md:col-span-2 bg-slate-50/60 rounded-2xl border border-slate-200/70 p-5 space-y-4">
                    <form.Field name="images">
                        {({ state, handleChange }) => (
                            <>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <ImageIcon className="w-4 h-4 text-slate-700" />
                                        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700">
                                            5. Photos du produit ({state.value.length}/5) *
                                        </h3>
                                    </div>

                                    {state.value.length < 5 && (
                                        <button
                                            type="button"
                                            onClick={() => fileInputRef.current?.click()}
                                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-100 cursor-pointer"
                                        >
                                            <Upload className="w-3.5 h-3.5" />
                                            Sélectionner des photos
                                        </button>
                                    )}
                                </div>

                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    className="hidden"
                                    onChange={(e) =>
                                        handleFilesSelected(e, state.value, handleChange)
                                    }
                                />

                                {imagePreviews.length === 0 ? (
                                    <button
                                        type="button"
                                        onClick={() => fileInputRef.current?.click()}
                                        className="w-full py-10 rounded-xl border-2 border-dashed border-slate-300 bg-white hover:bg-slate-50 transition flex flex-col items-center justify-center gap-2 text-slate-500 cursor-pointer"
                                    >
                                        <Upload className="w-6 h-6 text-slate-400" />
                                        <span className="text-xs font-medium">
                                            Cliquez pour ajouter jusqu&apos;à 5 photos du produit
                                        </span>
                                    </button>
                                ) : (
                                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                                        {imagePreviews.map((item, idx: number) => (
                                            <div
                                                key={idx}
                                                className="relative aspect-square rounded-xl overflow-hidden border border-slate-200 bg-white group"
                                            >
                                                <img
                                                    src={item.url}
                                                    alt={`Aperçu ${idx + 1}`}
                                                    className="w-full h-full object-cover"
                                                />
                                                {idx === 0 && (
                                                    <span className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded bg-slate-900/90 text-white text-[10px] font-bold inline-flex items-center gap-1">
                                                        <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
                                                        Principale
                                                    </span>
                                                )}
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        handleRemoveImage(
                                                            idx,
                                                            state.value,
                                                            handleChange
                                                        )
                                                    }
                                                    className="absolute top-1.5 right-1.5 p-1 rounded-lg bg-rose-600 text-white opacity-90 hover:opacity-100 cursor-pointer"
                                                >
                                                    <Trash2 className="w-3.5 h-3.5" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </>
                        )}
                    </form.Field>
                </div>

                {/* TAGS INTERACTIFS (1/3) */}
                <div className="bg-slate-50/60 rounded-2xl border border-slate-200/70 p-5 space-y-4">
                    <form.Field name="tags">
                        {({ state, handleChange }) => {
                            const addTag = () => {
                                const clean = tagInput.trim().toLowerCase();
                                if (clean && !state.value.includes(clean)) {
                                    handleChange([...state.value, clean]);
                                }
                                setTagInput("");
                            };

                            return (
                                <>
                                    <div className="flex items-center gap-2">
                                        <TagIcon className="w-4 h-4 text-slate-700" />
                                        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700">
                                            Tags ({state.value.length})
                                        </h3>
                                    </div>

                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            value={tagInput}
                                            onChange={(e) => setTagInput(e.target.value)}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    e.preventDefault();
                                                    addTag();
                                                }
                                            }}
                                            placeholder="Ex: vanille, quartz..."
                                            className="flex-1 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm focus:border-slate-900 focus:outline-none"
                                        />
                                        <button
                                            type="button"
                                            onClick={addTag}
                                            className="px-3 py-2 rounded-xl bg-slate-900 text-white text-xs font-semibold cursor-pointer"
                                        >
                                            Ajouter
                                        </button>
                                    </div>

                                    <div className="flex flex-wrap gap-1.5">
                                        {state.value.map((t: string, idx: number) => (
                                            <span
                                                key={`${t}-${idx}`}
                                                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-xs font-medium text-slate-700"
                                            >
                                                #{t}
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        handleChange(
                                                            state.value.filter(
                                                                (_: string, i: number) => i !== idx
                                                            )
                                                        )
                                                    }
                                                    className="text-slate-400 hover:text-rose-600 cursor-pointer"
                                                >
                                                    <X className="w-3 h-3" />
                                                </button>
                                            </span>
                                        ))}
                                    </div>
                                </>
                            );
                        }}
                    </form.Field>
                </div>
            </div>

            {/* ========================================================= */}
            {/* BOUTON DE SOUMISSION                                      */}
            {/* ========================================================= */}
            <form.Subscribe
                selector={(state) => ({
                    canSubmit: state.canSubmit,
                    isSubmitting: state.isSubmitting,
                })}
            >
                {({ canSubmit, isSubmitting }) => (
                    <div className="pt-2 flex justify-end">
                        <button
                            type="submit"
                            disabled={Boolean(!canSubmit || isSubmitting)}
                            className="w-full sm:w-auto min-w-[240px] bg-slate-900 text-white py-3.5 px-6 rounded-xl font-semibold text-sm hover:bg-slate-800 transition shadow-sm disabled:opacity-40 disabled:pointer-events-none flex items-center justify-center gap-2 cursor-pointer"
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    <span>Création du produit...</span>
                                </>
                            ) : (
                                <>
                                    <Check className="w-4 h-4" />
                                    <span>Publier le produit</span>
                                </>
                            )}
                        </button>
                    </div>
                )}
            </form.Subscribe>
        </form>
    );
}

export default ProductForm;
