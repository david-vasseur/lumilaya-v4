"use client";

import {
    createVariant,
    getOneProductById,
    updateProduct,
    updateVariant,
    uploadProductImage,
} from "@/lib/action/admin.action";
import BackButton from "@/components/ui/BackButton";
import { generateFingerprint } from "@/utils/dbFunction";
import { getImageUrl } from "@/utils/image";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import {
    Package,
    Layers,
    Image as ImageIcon,
    Sparkles,
    Plus,
    Trash2,
    Check,
    Loader2,
    Save,
    Tag as TagIcon,
    Upload,
    Star,
    ArrowUp,
    ArrowDown,
    Pencil,
    X,
    Gift,
    AlertTriangle,
    Palette,
    Heart,
} from "lucide-react";

// --- TYPES STRICTS ---
export interface IVariant {
    id: number;
    name: string;
    weight: number;
    duration: number;
    price: number;
    productId?: number;
}

export interface ITag {
    id?: number;
    name: string;
}

export interface IProductMeta {
    id?: number;
    name: string;
    slug: string;
    collection: string;
    intro: string;
    content: string[];
    stock: boolean;
    promo: number;
    like: number;
    theme: Record<string, unknown>;
}

export interface IProductData {
    id: number;
    description: string[];
    images: string[];
    wellness: Record<string, unknown> | null;
    meta: IProductMeta;
    variants: IVariant[];
    tags: (ITag | string)[];
}

type TabKey = "general" | "variants" | "images" | "advanced";

export default function ProductEditPage() {
    const params = useParams();
    const slug = params.slug as string;
    const id = Number(slug);

    // États globaux
    const [loading, setLoading] = useState<boolean>(true);
    const [savingProduct, setSavingProduct] = useState<boolean>(false);
    const [tab, setTab] = useState<TabKey>("general");
    const [product, setProduct] = useState<IProductData | null>(null);

    // États du formulaire Produit & Meta
    const [name, setName] = useState<string>("");
    const [productSlug, setProductSlug] = useState<string>("");
    const [collection, setCollection] = useState<string>("");
    const [intro, setIntro] = useState<string>("");
    const [descriptions, setDescriptions] = useState<string[]>([]);
    const [isCoffret, setIsCoffret] = useState<boolean>(false);
    const [coffretContent, setCoffretContent] = useState<string[]>([]);
    const [stock, setStock] = useState<boolean>(false);
    const [promo, setPromo] = useState<number>(0);
    const [likes, setLikes] = useState<number>(0);

    // États Images
    const [images, setImages] = useState<string[]>([]);
    const [uploadingSlot, setUploadingSlot] = useState<number | null>(null);
    const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // États Variants
    const [variants, setVariants] = useState<IVariant[]>([]);
    const [savingVariant, setSavingVariant] = useState<boolean>(false);
    const [editingVariantId, setEditingVariantId] = useState<number | undefined>(undefined);
    const [variantName, setVariantName] = useState<string>("");
    const [variantPrice, setVariantPrice] = useState<number>(0);
    const [variantWeight, setVariantWeight] = useState<number>(0);
    const [variantDuration, setVariantDuration] = useState<number>(0);

    // États Tags, Theme & Wellness (JSON)
    const [tags, setTags] = useState<string[]>([]);
    const [newTagInput, setNewTagInput] = useState<string>("");
    const [themeObj, setThemeObj] = useState<Record<string, unknown>>({});
    const [wellnessJsonText, setWellnessJsonText] = useState<string>("{}");
    const [wellnessError, setWellnessError] = useState<string | null>(null);

    // --- CHARGEMENT INITIAL ---
    useEffect(() => {
        const loadProduct = async () => {
            setLoading(true);
            const fingerprint = generateFingerprint();
            const token = sessionStorage.getItem("admin-token");

            if (!token || !fingerprint || !id) {
                setLoading(false);
                return;
            }

            try {
                const data = await getOneProductById(token, fingerprint, id);
                if (!data) return;

                setProduct(data);
                setVariants(data.variants || []);
                setImages(data.images || []);
                setDescriptions(
                    Array.isArray(data.description) && data.description.length > 0
                        ? data.description
                        : [""]
                );

                // Meta
                setName(data.meta?.name || "");
                setProductSlug(data.meta?.slug || "");
                setCollection(data.meta?.collection || "");
                setIntro(data.meta?.intro || "");
                setStock(Boolean(data.meta?.stock));
                setPromo(Number(data.meta?.promo || 0));
                setLikes(Number(data.meta?.like || 0));

                const contentArr: string[] = Array.isArray(data.meta?.content)
                    ? data.meta.content
                    : [];
                setCoffretContent(contentArr);
                setIsCoffret(contentArr.length > 0);

                // Tags
                const rawTags = Array.isArray(data.tags) ? data.tags : [];
                setTags(
                    rawTags.map((t: ITag | string) =>
                        typeof t === "string" ? t : t.name
                    )
                );

                // Theme & Wellness JSON
                setThemeObj(
                    data.meta?.theme && typeof data.meta.theme === "object"
                        ? (data.meta.theme as Record<string, unknown>)
                        : {}
                );
                setWellnessJsonText(
                    data.wellness
                        ? JSON.stringify(data.wellness, null, 2)
                        : "{\n}"
                );
            } catch (e) {
                console.error("Error loading product", e);
                toast.error("Erreur lors du chargement du produit");
            } finally {
                setLoading(false);
            }
        };

        loadProduct();
    }, [id]);

    // Helper d'affichage d'image compatible URL complète ou chemin relatif
    const resolveImg = (rawUrl?: string) => {
        if (!rawUrl) return "";
        if (rawUrl.startsWith("http://") || rawUrl.startsWith("https://") || rawUrl.startsWith("/")) {
            return rawUrl;
        }
        try {
            return getImageUrl(rawUrl);
        } catch {
            return rawUrl;
        }
    };

    // --- SAUVEGARDE DU PRODUIT (GENERAL + TAGS + THEME + WELLNESS) ---
    const handleSaveProduct = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();

        const fingerprint = generateFingerprint();
        const token = sessionStorage.getItem("admin-token");

        if (!token || !fingerprint) {
            toast.error("Session expirée, veuillez vous reconnecter");
            return;
        }

        // Validation du JSON Wellness
        let parsedWellness: Record<string, unknown> | null = null;
        if (wellnessJsonText.trim() && wellnessJsonText.trim() !== "{}") {
            try {
                parsedWellness = JSON.parse(wellnessJsonText);
                setWellnessError(null);
            } catch {
                setWellnessError("Le format JSON du bloc Bien-être est invalide.");
                toast.error("Format JSON invalide dans l'onglet Configuration avancée");
                setTab("advanced");
                return;
            }
        }

        setSavingProduct(true);
        try {
            const cleanDescriptions = descriptions.map((d) => d.trim()).filter(Boolean);
            const cleanCoffret = isCoffret
                ? coffretContent.map((c) => c.trim()).filter(Boolean)
                : [];

            const payload = {
                description: cleanDescriptions,
                images,
                wellness: parsedWellness,
                tags,
                meta: {
                    name: name.trim(),
                    slug: productSlug.trim(),
                    intro: intro.trim(),
                    collection: collection.trim(),
                    content: cleanCoffret,
                    stock,
                    promo: Number(promo) || 0,
                    like: Number(likes) || 0,
                    theme: themeObj,
                },
            };

            await updateProduct(token, fingerprint, id, payload);
            toast.success("Produit mis à jour avec succès");
        } catch (error) {
            console.error(error);
            toast.error("Erreur lors de l'enregistrement du produit");
        } finally {
            setSavingProduct(false);
        }
    };

    // --- GESTION DES IMAGES ---
    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file || selectedImageIndex === null || !product) return;

        const fingerprint = generateFingerprint();
        const token = sessionStorage.getItem("admin-token");
        if (!token || !fingerprint) {
            toast.error("Session expirée");
            return;
        }

        setUploadingSlot(selectedImageIndex);

        try {
            const result = await uploadProductImage(token, fingerprint, product.id, file);
            const url = result?.url;

            if (!url) {
                toast.error("Aucune URL d'image retournée par le serveur");
                return;
            }

            const slots = Array.from({ length: 5 }, (_, idx) => images[idx] || null);
            slots[selectedImageIndex] = url;
            const cleanImages = slots.filter((img): img is string => Boolean(img));

            await updateProduct(token, fingerprint, id, { images: cleanImages });
            setImages(cleanImages);
            toast.success("Image téléversée et enregistrée");
        } catch (err) {
            console.error(err);
            toast.error("Erreur lors de l'upload de l'image");
        } finally {
            setUploadingSlot(null);
            if (fileInputRef.current) fileInputRef.current.value = "";
        }
    };

    const handleRemoveImage = async (indexToRemove: number) => {
        const fingerprint = generateFingerprint();
        const token = sessionStorage.getItem("admin-token");
        if (!token || !fingerprint) return;

        const updatedImages = images.filter((_, idx) => idx !== indexToRemove);
        try {
            await updateProduct(token, fingerprint, id, { images: updatedImages });
            setImages(updatedImages);
            toast.success("Image supprimée");
        } catch {
            toast.error("Impossible de supprimer l'image");
        }
    };

    const handleSetMainImage = async (indexToPromote: number) => {
        if (indexToPromote === 0 || !images[indexToPromote]) return;
        const fingerprint = generateFingerprint();
        const token = sessionStorage.getItem("admin-token");
        if (!token || !fingerprint) return;

        const target = images[indexToPromote];
        const remaining = images.filter((_, idx) => idx !== indexToPromote);
        const reordered = [target, ...remaining];

        try {
            await updateProduct(token, fingerprint, id, { images: reordered });
            setImages(reordered);
            toast.success("Image principale mise à jour");
        } catch {
            toast.error("Erreur lors du réagencement des images");
        }
    };

    // --- GESTION DES VARIANTS ---
    const resetVariantForm = () => {
        setEditingVariantId(undefined);
        setVariantName("");
        setVariantPrice(0);
        setVariantWeight(0);
        setVariantDuration(0);
    };

    const selectVariantForEdit = (v: IVariant) => {
        setEditingVariantId(v.id);
        setVariantName(v.name);
        setVariantPrice(Number(v.price));
        setVariantWeight(Number(v.weight));
        setVariantDuration(Number(v.duration));
    };

    const handleSaveVariant = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!variantName.trim()) {
            toast.error("Veuillez indiquer un nom de variant");
            return;
        }

        const fingerprint = generateFingerprint();
        const token = sessionStorage.getItem("admin-token");
        if (!token || !fingerprint) return;

        setSavingVariant(true);
        try {
            const payload = {
                name: variantName.trim(),
                price: Number(variantPrice),
                weight: Number(variantWeight),
                duration: Number(variantDuration),
            };

            if (editingVariantId) {
                const updated = await updateVariant(token, fingerprint, editingVariantId, payload);
                setVariants((prev: IVariant[]) =>
                    prev.map((v: IVariant) => (v.id === editingVariantId ? { ...v, ...updated, ...payload } : v))
                );
                toast.success("Variant modifié");
            } else {
                const created = await createVariant(token, fingerprint, id, payload);
                setVariants((prev: IVariant[]) => [...prev, created]);
                toast.success("Nouveau variant ajouté");
                resetVariantForm();
            }
        } catch (err) {
            console.error(err);
            toast.error("Erreur lors de l'enregistrement du variant");
        } finally {
            setSavingVariant(false);
        }
    };

    // --- GESTION DES PARAGRAPHES DE DESCRIPTION ---
    const moveDescription = (index: number, direction: "up" | "down") => {
        const targetIndex = direction === "up" ? index - 1 : index + 1;
        if (targetIndex < 0 || targetIndex >= descriptions.length) return;
        const copy = [...descriptions];
        const temp = copy[index];
        copy[index] = copy[targetIndex];
        copy[targetIndex] = temp;
        setDescriptions(copy);
    };

    // --- ÉTAT DE CHARGEMENT ---
    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50/70 p-4 sm:p-6 md:p-10">
                <div className="max-w-5xl mx-auto pt-6 space-y-6 animate-pulse">
                    <div className="h-9 w-28 bg-slate-200 rounded-xl" />
                    <div className="h-28 bg-white rounded-2xl border border-slate-200/70" />
                    <div className="h-12 bg-white rounded-xl border border-slate-200/70" />
                    <div className="h-96 bg-white rounded-2xl border border-slate-200/70" />
                </div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen bg-slate-50/70 p-6 flex items-center justify-center">
                <div className="bg-white border border-slate-200 rounded-2xl p-8 max-w-md w-full text-center space-y-4">
                    <AlertTriangle className="w-10 h-10 text-rose-500 mx-auto" />
                    <h2 className="text-lg font-bold text-slate-900">Produit introuvable</h2>
                    <p className="text-sm text-slate-500">Ce produit n&apos;existe pas ou a été supprimé.</p>
                    <BackButton />
                </div>
            </div>
        );
    }

    const TABS: { key: TabKey; label: string; icon: typeof Package; badge?: number }[] = [
        { key: "general", label: "Informations & Textes", icon: Package },
        { key: "variants", label: "Variants & Prix", icon: Layers, badge: variants.length },
        { key: "images", label: "Galerie Photos", icon: ImageIcon, badge: images.length },
        { key: "advanced", label: "Tags, Thème & Bien-être", icon: Sparkles, badge: tags.length },
    ];

    return (
        <div className="min-h-screen bg-slate-50/70 text-slate-900 p-4 sm:p-6 md:p-10 pb-24">
            <div className="fixed inset-0 -z-10 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:20px_20px] opacity-50 pointer-events-none" />

            <div className="max-w-5xl mx-auto pt-4 sm:pt-6 space-y-6">
                
                {/* BOUTON RETOUR */}
                <div>
                    <BackButton />
                </div>

                {/* HEADER DU PRODUIT */}
                <div className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-2xl bg-slate-100 border border-slate-200 overflow-hidden shrink-0 flex items-center justify-center">
                            {images[0] ? (
                                <img
                                    src={resolveImg(images[0])}
                                    alt={name}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <Package className="w-7 h-7 text-slate-400" />
                            )}
                        </div>

                        <div className="space-y-1">
                            <div className="flex items-center gap-2.5 flex-wrap">
                                <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
                                    {name || "Produit sans nom"}
                                </h1>
                                <span
                                    className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
                                        stock
                                            ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                            : "bg-rose-50 text-rose-700 border-rose-200"
                                    }`}
                                >
                                    {stock ? "En stock" : "Rupture"}
                                </span>
                                {promo > 0 && (
                                    <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                                        -{promo}%
                                    </span>
                                )}
                            </div>
                            <p className="text-xs sm:text-sm text-slate-500">
                                ID #{product.id} • Collection :{" "}
                                <span className="font-medium text-slate-700">
                                    {collection || "Non définie"}
                                </span>
                            </p>
                        </div>
                    </div>

                    {/* Bouton de sauvegarde rapide global */}
                    <button
                        type="button"
                        onClick={() => handleSaveProduct()}
                        disabled={savingProduct}
                        className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 text-white text-sm font-medium hover:bg-slate-800 active:scale-[0.99] transition shadow-xs disabled:opacity-50 cursor-pointer shrink-0"
                    >
                        {savingProduct ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                <span>Enregistrement...</span>
                            </>
                        ) : (
                            <>
                                <Save className="w-4 h-4" />
                                <span>Enregistrer les modifications</span>
                            </>
                        )}
                    </button>
                </div>

                {/* BARRE D'ONGLETS RESPONSIVE */}
                <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
                    {TABS.map((t) => {
                        const Icon = t.icon;
                        const isActive = tab === t.key;
                        return (
                            <button
                                key={t.key}
                                type="button"
                                onClick={() => setTab(t.key)}
                                className={`shrink-0 inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer border ${
                                    isActive
                                        ? "bg-slate-900 text-white border-slate-900 shadow-xs"
                                        : "bg-white text-slate-600 border-slate-200/80 hover:bg-slate-100 hover:text-slate-900"
                                }`}
                            >
                                <Icon className="w-4 h-4" />
                                <span>{t.label}</span>
                                {t.badge !== undefined && (
                                    <span
                                        className={`px-1.5 py-0.5 text-[11px] rounded-md font-semibold ${
                                            isActive
                                                ? "bg-white/20 text-white"
                                                : "bg-slate-100 text-slate-600"
                                        }`}
                                    >
                                        {t.badge}
                                    </span>
                                )}
                            </button>
                        );
                    })}
                </div>

                {/* ========================================================= */}
                {/* ONGLET 1 : INFORMATIONS & TEXTES                          */}
                {/* ========================================================= */}
                {tab === "general" && (
                    <form onSubmit={handleSaveProduct} className="space-y-6">
                        
                        {/* Bloc Identité & Paramètres */}
                        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-2xs space-y-5">
                            <h2 className="text-base font-semibold text-slate-900 border-b border-slate-100 pb-3">
                                Identité & Paramètres de vente
                            </h2>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
                                        Nom du produit
                                    </label>
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="Ex: Tendresse, Ancrage..."
                                        className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-sm text-slate-900 focus:bg-white focus:border-slate-900 focus:outline-none transition"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
                                        Slug (URL)
                                    </label>
                                    <input
                                        type="text"
                                        value={productSlug}
                                        onChange={(e) => setProductSlug(e.target.value)}
                                        placeholder="Ex: bougie-tendresse"
                                        className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-sm font-mono text-slate-700 focus:bg-white focus:border-slate-900 focus:outline-none transition"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
                                        Collection
                                    </label>
                                    <input
                                        type="text"
                                        value={collection}
                                        onChange={(e) => setCollection(e.target.value)}
                                        placeholder="Ex: Émotions & Plaisirs, Rituel..."
                                        className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-sm text-slate-900 focus:bg-white focus:border-slate-900 focus:outline-none transition"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
                                            Promotion (%)
                                        </label>
                                        <input
                                            type="number"
                                            min={0}
                                            max={100}
                                            value={promo}
                                            onChange={(e) => setPromo(Number(e.target.value))}
                                            className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-sm text-slate-900 focus:bg-white focus:border-slate-900 focus:outline-none transition"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
                                            Compteur Likes
                                        </label>
                                        <div className="relative">
                                            <Heart className="w-4 h-4 text-rose-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                            <input
                                                type="number"
                                                min={0}
                                                value={likes}
                                                onChange={(e) => setLikes(Number(e.target.value))}
                                                className="w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-9 pr-3.5 py-2.5 text-sm text-slate-900 focus:bg-white focus:border-slate-900 focus:outline-none transition"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Switch Disponibilité Stock */}
                            <div className="pt-2">
                                <label className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-200/80 cursor-pointer hover:bg-slate-100/70 transition">
                                    <div>
                                        <span className="text-sm font-semibold text-slate-900 block">
                                            Produit disponible en stock
                                        </span>
                                        <span className="text-xs text-slate-500">
                                            Si désactivé, le produit sera affiché en rupture de stock sur la boutique.
                                        </span>
                                    </div>
                                    <input
                                        type="checkbox"
                                        checked={stock}
                                        onChange={(e) => setStock(e.target.checked)}
                                        className="w-5 h-5 accent-slate-900 rounded cursor-pointer"
                                    />
                                </label>
                            </div>
                        </div>

                        {/* Bloc Intro (SEO) & Paragraphes de Description */}
                        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-2xs space-y-5">
                            <h2 className="text-base font-semibold text-slate-900 border-b border-slate-100 pb-3">
                                Textes & Descriptions (Boutique + SEO)
                            </h2>

                            {/* Intro courte */}
                            <div>
                                <div className="flex items-center justify-between mb-1.5">
                                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                                        Phrase d&apos;introduction (utilisée aussi pour le SEO Google)
                                    </label>
                                    <span
                                        className={`text-xs font-medium ${
                                            intro.length > 160 ? "text-amber-600" : "text-slate-400"
                                        }`}
                                    >
                                        {intro.length} / 160 caractères recommandés
                                    </span>
                                </div>
                                <textarea
                                    rows={3}
                                    value={intro}
                                    onChange={(e) => setIntro(e.target.value)}
                                    placeholder="Résumé court de la bougie, ses notes principales ou ses pierres..."
                                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 p-3.5 text-sm text-slate-900 focus:bg-white focus:border-slate-900 focus:outline-none transition"
                                />
                            </div>

                            {/* Paragraphes de description (Product.description[]) */}
                            <div className="space-y-3 pt-2">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 block">
                                            Paragraphes de description détaillée
                                        </label>
                                        <p className="text-xs text-slate-400">
                                            Chaque bloc correspond à un paragraphe sur la fiche produit.
                                        </p>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setDescriptions((prev) => [...prev, ""])}
                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition cursor-pointer"
                                    >
                                        <Plus className="w-3.5 h-3.5" />
                                        Ajouter un paragraphe
                                    </button>
                                </div>

                                <div className="space-y-3">
                                    {descriptions.map((desc: string, index: number) => (
                                        <div
                                            key={index}
                                            className="flex gap-2 items-start bg-slate-50/70 p-3 rounded-xl border border-slate-200/70"
                                        >
                                            <div className="flex flex-col gap-1 pt-1">
                                                <span className="text-[11px] font-bold text-slate-400 text-center">
                                                    #{index + 1}
                                                </span>
                                                <button
                                                    type="button"
                                                    onClick={() => moveDescription(index, "up")}
                                                    disabled={index === 0}
                                                    className="p-1 rounded hover:bg-slate-200 text-slate-500 disabled:opacity-30 cursor-pointer"
                                                    title="Monter"
                                                >
                                                    <ArrowUp className="w-3.5 h-3.5" />
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => moveDescription(index, "down")}
                                                    disabled={index === descriptions.length - 1}
                                                    className="p-1 rounded hover:bg-slate-200 text-slate-500 disabled:opacity-30 cursor-pointer"
                                                    title="Descendre"
                                                >
                                                    <ArrowDown className="w-3.5 h-3.5" />
                                                </button>
                                            </div>

                                            <textarea
                                                rows={3}
                                                value={desc}
                                                onChange={(e) => {
                                                    const copy = [...descriptions];
                                                    copy[index] = e.target.value;
                                                    setDescriptions(copy);
                                                }}
                                                placeholder={`Paragraphe ${index + 1}...`}
                                                className="flex-1 rounded-xl border border-slate-200 bg-white p-3 text-sm text-slate-900 focus:border-slate-900 focus:outline-none transition"
                                            />

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setDescriptions((prev) =>
                                                        prev.filter((_, i) => i !== index)
                                                    )
                                                }
                                                className="p-2 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition cursor-pointer"
                                                title="Supprimer ce paragraphe"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Bloc Coffret (meta.content[]) */}
                        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-2xs space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2.5">
                                    <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
                                        <Gift className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <h2 className="text-base font-semibold text-slate-900">
                                            Option Coffret
                                        </h2>
                                        <p className="text-xs text-slate-500">
                                            Liste des éléments inclus si ce produit est un coffret.
                                        </p>
                                    </div>
                                </div>

                                <button
                                    type="button"
                                    onClick={() => {
                                        if (!isCoffret) {
                                            setIsCoffret(true);
                                            if (coffretContent.length === 0) setCoffretContent([""]);
                                        } else {
                                            setIsCoffret(false);
                                            setCoffretContent([]);
                                        }
                                    }}
                                    className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer border ${
                                        isCoffret
                                            ? "bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100"
                                            : "bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200"
                                    }`}
                                >
                                    {isCoffret ? "Désactiver le mode coffret" : "Activer le mode coffret"}
                                </button>
                            </div>

                            {isCoffret && (
                                <div className="space-y-3 pt-3 border-t border-slate-100">
                                    {coffretContent.map((item: string, index: number) => (
                                        <div key={index} className="flex items-center gap-2">
                                            <input
                                                type="text"
                                                value={item}
                                                onChange={(e) => {
                                                    const copy = [...coffretContent];
                                                    copy[index] = e.target.value;
                                                    setCoffretContent(copy);
                                                }}
                                                placeholder="Ex: 1 bougie énergétique 180g, 1 bracelet en pierre..."
                                                className="flex-1 rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2 text-sm text-slate-900 focus:bg-white focus:border-slate-900 focus:outline-none"
                                            />
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setCoffretContent((prev) =>
                                                        prev.filter((_, i) => i !== index)
                                                    )
                                                }
                                                className="p-2 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition cursor-pointer"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ))}

                                    <button
                                        type="button"
                                        onClick={() => setCoffretContent((prev) => [...prev, ""])}
                                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-purple-700 bg-purple-50 hover:bg-purple-100 px-3 py-2 rounded-xl transition cursor-pointer"
                                    >
                                        <Plus className="w-3.5 h-3.5" />
                                        Ajouter un élément au coffret
                                    </button>
                                </div>
                            )}
                        </div>
                    </form>
                )}

                {/* ========================================================= */}
                {/* ONGLET 2 : DÉCLINAISONS / VARIANTS                        */}
                {/* ========================================================= */}
                {tab === "variants" && (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
                        
                        {/* Liste des variants (2/3) */}
                        <div className="lg:col-span-2 space-y-4">
                            <div className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-2xs space-y-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h2 className="text-base font-semibold text-slate-900">
                                            Déclinaisons existantes ({variants.length})
                                        </h2>
                                        <p className="text-xs text-slate-500">
                                            Sélectionnez une déclinaison pour modifier son prix, son poids ou sa durée.
                                        </p>
                                    </div>
                                    {editingVariantId && (
                                        <button
                                            type="button"
                                            onClick={resetVariantForm}
                                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 text-white text-xs font-medium cursor-pointer"
                                        >
                                            <Plus className="w-3.5 h-3.5" />
                                            Nouveau variant
                                        </button>
                                    )}
                                </div>

                                {variants.length === 0 ? (
                                    <p className="text-sm text-slate-400 py-8 text-center">
                                        Aucun variant configuré pour ce produit.
                                    </p>
                                ) : (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        {variants.map((v: IVariant) => {
                                            const isSelected = editingVariantId === v.id;
                                            return (
                                                <div
                                                    key={v.id}
                                                    className={`rounded-2xl border p-4 transition flex flex-col justify-between gap-4 ${
                                                        isSelected
                                                            ? "border-slate-900 bg-slate-900/5 ring-2 ring-slate-900/10"
                                                            : "border-slate-200/80 bg-white hover:border-slate-300"
                                                    }`}
                                                >
                                                    <div className="flex items-start justify-between gap-2">
                                                        <div>
                                                            <span className="text-[11px] font-mono text-slate-400">
                                                                ID #{v.id}
                                                            </span>
                                                            <h3 className="font-bold text-slate-900 text-base">
                                                                {v.name}
                                                            </h3>
                                                        </div>
                                                        <span className="px-2.5 py-1 rounded-xl bg-emerald-50 text-emerald-700 font-bold text-sm border border-emerald-200/60">
                                                            {Number(v.price).toFixed(2)} €
                                                        </span>
                                                    </div>

                                                    <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
                                                        <span>Poids : {v.weight} g</span>
                                                        <span>Combustion : ~{v.duration} h</span>
                                                    </div>

                                                    <button
                                                        type="button"
                                                        onClick={() => selectVariantForEdit(v)}
                                                        className={`w-full py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition cursor-pointer ${
                                                            isSelected
                                                                ? "bg-slate-900 text-white"
                                                                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                                                        }`}
                                                    >
                                                        <Pencil className="w-3.5 h-3.5" />
                                                        {isSelected ? "En cours d'édition" : "Modifier ce format"}
                                                    </button>
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Formulaire Création / Édition de Variant (1/3) */}
                        <form
                            onSubmit={handleSaveVariant}
                            className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-2xs space-y-4"
                        >
                            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                                <div>
                                    <h3 className="text-base font-semibold text-slate-900">
                                        {editingVariantId
                                            ? `Modifier #${editingVariantId}`
                                            : "Ajouter un variant"}
                                    </h3>
                                    <p className="text-xs text-slate-500">
                                        {editingVariantId
                                            ? "Modifiez les valeurs ci-dessous"
                                            : "Créez une nouvelle taille ou déclinaison"}
                                    </p>
                                </div>
                                {editingVariantId && (
                                    <button
                                        type="button"
                                        onClick={resetVariantForm}
                                        className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
                                        title="Annuler l'édition"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                )}
                            </div>

                            <div className="space-y-3">
                                <div>
                                    <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">
                                        Nom du format
                                    </label>
                                    <input
                                        type="text"
                                        value={variantName}
                                        onChange={(e) => setVariantName(e.target.value)}
                                        placeholder="Ex: Format Classique 180g"
                                        className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2 text-sm text-slate-900 focus:bg-white focus:border-slate-900 focus:outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">
                                        Prix TTC (€)
                                    </label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        value={variantPrice}
                                        onChange={(e) => setVariantPrice(Number(e.target.value))}
                                        className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2 text-sm text-slate-900 focus:bg-white focus:border-slate-900 focus:outline-none"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">
                                            Poids (g)
                                        </label>
                                        <input
                                            type="number"
                                            value={variantWeight}
                                            onChange={(e) => setVariantWeight(Number(e.target.value))}
                                            className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2 text-sm text-slate-900 focus:bg-white focus:border-slate-900 focus:outline-none"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">
                                            Durée (heures)
                                        </label>
                                        <input
                                            type="number"
                                            value={variantDuration}
                                            onChange={(e) => setVariantDuration(Number(e.target.value))}
                                            className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2 text-sm text-slate-900 focus:bg-white focus:border-slate-900 focus:outline-none"
                                        />
                                    </div>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={savingVariant}
                                className="w-full py-2.5 px-4 rounded-xl bg-slate-900 text-white text-sm font-medium hover:bg-slate-800 transition flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
                            >
                                {savingVariant ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        <span>Enregistrement...</span>
                                    </>
                                ) : (
                                    <>
                                        <Check className="w-4 h-4" />
                                        <span>
                                            {editingVariantId ? "Mettre à jour" : "Créer le variant"}
                                        </span>
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                )}

                {/* ========================================================= */}
                {/* ONGLET 3 : GALERIE PHOTOS (5 EMPLACEMENTS)                */}
                {/* ========================================================= */}
                {tab === "images" && (
                    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-2xs space-y-5">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
                            <div>
                                <h2 className="text-base font-semibold text-slate-900">
                                    Galerie du produit (jusqu&apos;à 5 photos)
                                </h2>
                                <p className="text-xs text-slate-500">
                                    La première photo est utilisée comme image principale sur la boutique et Google. Cliquez sur une case pour remplacer ou ajouter une photo.
                                </p>
                            </div>
                        </div>

                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleFileChange}
                        />

                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                            {Array.from({ length: 5 }).map((_, index: number) => {
                                const imageUrl = images[index];
                                const isUploading = uploadingSlot === index;

                                return (
                                    <div
                                        key={index}
                                        className={`group relative aspect-square rounded-2xl border-2 overflow-hidden transition flex flex-col justify-between ${
                                            imageUrl
                                                ? "border-slate-200 bg-slate-100"
                                                : "border-dashed border-slate-300 bg-slate-50 hover:bg-slate-100/80 hover:border-slate-400"
                                        }`}
                                    >
                                        {/* Badge Emplacement */}
                                        <div className="absolute top-2.5 left-2.5 z-10 flex items-center gap-1">
                                            {index === 0 ? (
                                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase bg-slate-900 text-white shadow-xs">
                                                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                                                    Principale
                                                </span>
                                            ) : (
                                                <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-white/90 text-slate-700 shadow-2xs">
                                                    Photo #{index + 1}
                                                </span>
                                            )}
                                        </div>

                                        {isUploading ? (
                                            <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-slate-500">
                                                <Loader2 className="w-6 h-6 animate-spin text-slate-900" />
                                                <span className="text-xs font-medium">Upload...</span>
                                            </div>
                                        ) : imageUrl ? (
                                            <>
                                                <img
                                                    src={resolveImg(imageUrl)}
                                                    alt={`Produit ${index + 1}`}
                                                    className="w-full h-full object-cover"
                                                />

                                                {/* Overlay d'actions au survol / mobile */}
                                                <div className="absolute inset-x-0 bottom-0 p-2 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-center justify-between gap-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            setSelectedImageIndex(index);
                                                            fileInputRef.current?.click();
                                                        }}
                                                        className="flex-1 py-1.5 px-2 rounded-lg bg-white/95 text-slate-900 text-[11px] font-semibold hover:bg-white transition cursor-pointer text-center"
                                                    >
                                                        Remplacer
                                                    </button>

                                                    {index > 0 && (
                                                        <button
                                                            type="button"
                                                            onClick={() => handleSetMainImage(index)}
                                                            title="Définir comme image principale"
                                                            className="p-1.5 rounded-lg bg-amber-400/95 text-slate-900 hover:bg-amber-400 transition cursor-pointer"
                                                        >
                                                            <Star className="w-3.5 h-3.5" />
                                                        </button>
                                                    )}

                                                    <button
                                                        type="button"
                                                        onClick={() => handleRemoveImage(index)}
                                                        title="Supprimer cette photo"
                                                        className="p-1.5 rounded-lg bg-rose-600/95 text-white hover:bg-rose-600 transition cursor-pointer"
                                                    >
                                                        <Trash2 className="w-3.5 h-3.5" />
                                                    </button>
                                                </div>
                                            </>
                                        ) : (
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setSelectedImageIndex(index);
                                                    fileInputRef.current?.click();
                                                }}
                                                className="w-full h-full flex flex-col items-center justify-center gap-2 text-slate-400 hover:text-slate-700 transition cursor-pointer"
                                            >
                                                <Upload className="w-6 h-6" />
                                                <span className="text-xs font-medium">Ajouter</span>
                                            </button>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* ========================================================= */}
                {/* ONGLET 4 : TAGS, THÈME COULEURS & BIEN-ÊTRE (JSON)        */}
                {/* ========================================================= */}
                {tab === "advanced" && (
                    <div className="space-y-6">
                        
                        {/* 1. GESTION DES TAGS */}
                        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-2xs space-y-4">
                            <div className="flex items-center gap-2.5 border-b border-slate-100 pb-3">
                                <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center">
                                    <TagIcon className="w-4 h-4" />
                                </div>
                                <div>
                                    <h2 className="text-base font-semibold text-slate-900">
                                        Tags associés
                                    </h2>
                                    <p className="text-xs text-slate-500">
                                        Mots-clés utilisés pour filtrer et suggérer des produits similaires.
                                    </p>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-2">
                                {tags.length === 0 ? (
                                    <span className="text-xs text-slate-400">Aucun tag pour le moment.</span>
                                ) : (
                                    tags.map((t: string, idx: number) => (
                                        <span
                                            key={`${t}-${idx}`}
                                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 text-slate-800 text-xs font-semibold"
                                        >
                                            #{t}
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setTags((prev) => prev.filter((_, i) => i !== idx))
                                                }
                                                className="text-slate-400 hover:text-rose-600 cursor-pointer"
                                            >
                                                <X className="w-3.5 h-3.5" />
                                            </button>
                                        </span>
                                    ))
                                )}
                            </div>

                            <div className="flex gap-2 max-w-md">
                                <input
                                    type="text"
                                    value={newTagInput}
                                    onChange={(e) => setNewTagInput(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            e.preventDefault();
                                            const val = newTagInput.trim();
                                            if (val && !tags.includes(val)) {
                                                setTags((prev) => [...prev, val]);
                                                setNewTagInput("");
                                            }
                                        }
                                    }}
                                    placeholder="Ajouter un tag (ex: vanille, ancrage...)"
                                    className="flex-1 rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2 text-sm text-slate-900 focus:bg-white focus:border-slate-900 focus:outline-none"
                                />
                                <button
                                    type="button"
                                    onClick={() => {
                                        const val = newTagInput.trim();
                                        if (val && !tags.includes(val)) {
                                            setTags((prev) => [...prev, val]);
                                            setNewTagInput("");
                                        }
                                    }}
                                    className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition cursor-pointer"
                                >
                                    Ajouter
                                </button>
                            </div>
                        </div>

                        {/* 2. THÈME DU PRODUIT (meta.theme) */}
                        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-2xs space-y-4">
                            <div className="flex items-center gap-2.5 border-b border-slate-100 pb-3">
                                <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                                    <Palette className="w-4 h-4" />
                                </div>
                                <div>
                                    <h2 className="text-base font-semibold text-slate-900">
                                        Thème visuel (`meta.theme`)
                                    </h2>
                                    <p className="text-xs text-slate-500">
                                        Couleurs et variables visuelles associées à la fiche produit.
                                    </p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                {Object.entries(themeObj).map(([key, val]: [string, unknown]) => {
                                    const strVal = String(val ?? "");
                                    const isHexColor = /^#([0-9A-F]{3}){1,2}$/i.test(strVal);

                                    return (
                                        <div
                                            key={key}
                                            className="p-3 rounded-xl border border-slate-200/80 bg-slate-50/50 space-y-1.5"
                                        >
                                            <label className="block text-xs font-semibold text-slate-600 capitalize">
                                                {key}
                                            </label>
                                            <div className="flex items-center gap-2">
                                                {isHexColor && (
                                                    <input
                                                        type="color"
                                                        value={strVal}
                                                        onChange={(e) =>
                                                            setThemeObj((prev) => ({
                                                                ...prev,
                                                                [key]: e.target.value,
                                                            }))
                                                        }
                                                        className="w-8 h-8 rounded cursor-pointer border-0 bg-transparent"
                                                    />
                                                )}
                                                <input
                                                    type="text"
                                                    value={strVal}
                                                    onChange={(e) =>
                                                        setThemeObj((prev) => ({
                                                            ...prev,
                                                            [key]: e.target.value,
                                                        }))
                                                    }
                                                    className="flex-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-mono text-slate-800 focus:border-slate-900 focus:outline-none"
                                                />
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* 3. DONNÉES BIEN-ÊTRE / ÉNERGÉTIQUE (Product.wellness JSON) */}
                        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-2xs space-y-4">
                            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                                <div className="flex items-center gap-2.5">
                                    <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                                        <Sparkles className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <h2 className="text-base font-semibold text-slate-900">
                                            Propriétés Bien-être & Lithothérapie (`wellness`)
                                        </h2>
                                        <p className="text-xs text-slate-500">
                                            Configuration JSON des pierres, chakras ou vertus associés au produit.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <textarea
                                rows={8}
                                value={wellnessJsonText}
                                onChange={(e) => {
                                    setWellnessJsonText(e.target.value);
                                    setWellnessError(null);
                                }}
                                className="w-full rounded-xl border border-slate-200 bg-slate-900 text-emerald-400 p-4 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-slate-900/20"
                            />

                            {wellnessError && (
                                <p className="text-xs font-semibold text-rose-600">{wellnessError}</p>
                            )}
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}
