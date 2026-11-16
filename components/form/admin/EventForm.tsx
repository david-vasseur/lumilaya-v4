"use client";

import { createEvent } from "@/lib/action/admin.action";
import { EventSchema, IEvent } from "@/schema/event";
import { generateFingerprint } from "@/utils/dbFunction";
import { useForm } from "@tanstack/react-form";
import { useRef, useState } from "react";
import { toast } from "sonner";
import {
    Calendar,
    MapPin,
    Globe,
    Upload,
    Loader2,
    Plus,
    Trash2,
    Sparkles,
} from "lucide-react";

interface EventFormProps {
    onEventCreated?: (newEvent: {
        id: number;
        name: string;
        address: string;
        city: string;
        postalCode: string;
        dateStart: string;
        dateEnd: string;
        url: string;
        imagePreview?: string | null;
    }) => void;
}

function EventForm({ onEventCreated }: EventFormProps) {
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const form = useForm({
        defaultValues: {
            name: "",
            address: "",
            city: "",
            dateStart: "",
            dateEnd: "",
            postalCode: "",
            image: null,
            url: "",
        } as IEvent,
        validators: {
            onChange: EventSchema,
        },
        onSubmit: async ({ value }) => {
            // Mode Démo Front-End immédiat si appelé dans la liste locale
            onEventCreated?.({
                id: Date.now(),
                name: value.name,
                address: value.address,
                city: value.city,
                postalCode: value.postalCode,
                dateStart: value.dateStart,
                dateEnd: value.dateEnd,
                url: value.url || "#",
                imagePreview,
            });

            const fingerprint = generateFingerprint();
            const token = sessionStorage.getItem("admin-token");

            if (!token || !fingerprint) {
                toast.success("Événement ajouté à l'aperçu local !");
                return;
            }

            try {
                const res = await createEvent(token, fingerprint, value);
                if (res?.success) {
                    toast.success("Événement créé avec succès");
                } else {
                    toast.error("Une erreur est survenue côté serveur");
                }
            } catch {
                toast.info("Événement simulé en local (serveur non joint)");
            }
        },
    });

    return (
        <form
            className="bg-white border border-slate-200/80 rounded-2xl p-5 sm:p-7 shadow-2xs space-y-6"
            onSubmit={(e) => {
                e.preventDefault();
                form.handleSubmit();
            }}
        >
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                    <Sparkles className="w-5 h-5" />
                </div>
                <div>
                    <h2 className="text-base sm:text-lg font-bold text-slate-900">
                        Ajouter un salon ou marché physique
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-500">
                        Renseignez le lieu et les dates pour informer vos visiteurs de votre présence.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* NOM DE L'ÉVÉNEMENT */}
                <div className="md:col-span-2">
                    <form.Field name="name">
                        {({ state, handleBlur, handleChange }) => (
                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
                                    Nom de l&apos;événement <span className="text-rose-500">*</span>
                                </label>
                                <input
                                    aria-invalid={
                                        state.meta.errors.length > 0 && state.meta.isTouched
                                    }
                                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2.5 px-3.5 text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-slate-900 focus:outline-none transition"
                                    placeholder="Ex: Salon du Bien-être et de la Lithothérapie"
                                    value={state.value}
                                    onBlur={handleBlur}
                                    onChange={(e) => handleChange(e.target.value)}
                                />
                                {state.meta.errors.length > 0 && state.meta.isTouched && (
                                    <p className="text-rose-600 text-xs mt-1 font-medium">
                                        {state.meta.errors[0]?.message}
                                    </p>
                                )}
                            </div>
                        )}
                    </form.Field>
                </div>

                {/* ADRESSE */}
                <div className="md:col-span-2">
                    <form.Field name="address">
                        {({ state, handleBlur, handleChange }) => (
                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
                                    Adresse / Lieu <span className="text-rose-500">*</span>
                                </label>
                                <div className="relative">
                                    <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                                    <input
                                        aria-invalid={
                                            state.meta.errors.length > 0 && state.meta.isTouched
                                        }
                                        className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2.5 pl-10 pr-3.5 text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-slate-900 focus:outline-none transition"
                                        placeholder="Ex: Parc des Expositions - Hall B"
                                        value={state.value}
                                        onBlur={handleBlur}
                                        onChange={(e) => handleChange(e.target.value)}
                                    />
                                </div>
                                {state.meta.errors.length > 0 && state.meta.isTouched && (
                                    <p className="text-rose-600 text-xs mt-1 font-medium">
                                        {state.meta.errors[0]?.message}
                                    </p>
                                )}
                            </div>
                        )}
                    </form.Field>
                </div>

                {/* CODE POSTAL */}
                <form.Field name="postalCode">
                    {({ state, handleBlur, handleChange }) => (
                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
                                Code postal <span className="text-rose-500">*</span>
                            </label>
                            <input
                                aria-invalid={
                                    state.meta.errors.length > 0 && state.meta.isTouched
                                }
                                className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2.5 px-3.5 text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-slate-900 focus:outline-none transition"
                                placeholder="Ex: 30000"
                                value={state.value}
                                onBlur={handleBlur}
                                onChange={(e) => handleChange(e.target.value)}
                            />
                            {state.meta.errors.length > 0 && state.meta.isTouched && (
                                <p className="text-rose-600 text-xs mt-1 font-medium">
                                    {state.meta.errors[0]?.message}
                                </p>
                            )}
                        </div>
                    )}
                </form.Field>

                {/* VILLE */}
                <form.Field name="city">
                    {({ state, handleBlur, handleChange }) => (
                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
                                Ville <span className="text-rose-500">*</span>
                            </label>
                            <input
                                aria-invalid={
                                    state.meta.errors.length > 0 && state.meta.isTouched
                                }
                                className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2.5 px-3.5 text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-slate-900 focus:outline-none transition"
                                placeholder="Ex: Nîmes, Avignon..."
                                value={state.value}
                                onBlur={handleBlur}
                                onChange={(e) => handleChange(e.target.value)}
                            />
                            {state.meta.errors.length > 0 && state.meta.isTouched && (
                                <p className="text-rose-600 text-xs mt-1 font-medium">
                                    {state.meta.errors[0]?.message}
                                </p>
                            )}
                        </div>
                    )}
                </form.Field>

                {/* DATE DE DÉBUT */}
                <form.Field name="dateStart">
                    {({ state, handleBlur, handleChange }) => (
                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
                                Date de début <span className="text-rose-500">*</span>
                            </label>
                            <div className="relative">
                                <Calendar className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                                <input
                                    type="date"
                                    aria-invalid={
                                        state.meta.errors.length > 0 && state.meta.isTouched
                                    }
                                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2.5 pl-10 pr-3.5 text-sm text-slate-900 focus:bg-white focus:border-slate-900 focus:outline-none transition"
                                    value={state.value}
                                    onBlur={handleBlur}
                                    onChange={(e) => handleChange(e.target.value)}
                                />
                            </div>
                            {state.meta.errors.length > 0 && state.meta.isTouched && (
                                <p className="text-rose-600 text-xs mt-1 font-medium">
                                    {state.meta.errors[0]?.message}
                                </p>
                            )}
                        </div>
                    )}
                </form.Field>

                {/* DATE DE FIN */}
                <form.Field name="dateEnd">
                    {({ state, handleBlur, handleChange }) => (
                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
                                Date de fin <span className="text-rose-500">*</span>
                            </label>
                            <div className="relative">
                                <Calendar className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                                <input
                                    type="date"
                                    aria-invalid={
                                        state.meta.errors.length > 0 && state.meta.isTouched
                                    }
                                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2.5 pl-10 pr-3.5 text-sm text-slate-900 focus:bg-white focus:border-slate-900 focus:outline-none transition"
                                    value={state.value}
                                    onBlur={handleBlur}
                                    onChange={(e) => handleChange(e.target.value)}
                                />
                            </div>
                            {state.meta.errors.length > 0 && state.meta.isTouched && (
                                <p className="text-rose-600 text-xs mt-1 font-medium">
                                    {state.meta.errors[0]?.message}
                                </p>
                            )}
                        </div>
                    )}
                </form.Field>

                {/* URL DE L'ÉVÉNEMENT */}
                <div className="md:col-span-2">
                    <form.Field name="url">
                        {({ state, handleBlur, handleChange }) => (
                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
                                    Lien web de l&apos;événement (Optionnel)
                                </label>
                                <div className="relative">
                                    <Globe className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                                    <input
                                        aria-invalid={
                                            state.meta.errors.length > 0 && state.meta.isTouched
                                        }
                                        className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2.5 pl-10 pr-3.5 text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-slate-900 focus:outline-none transition"
                                        placeholder="https://..."
                                        value={state.value}
                                        onBlur={handleBlur}
                                        onChange={(e) => handleChange(e.target.value)}
                                    />
                                </div>
                                {state.meta.errors.length > 0 && state.meta.isTouched && (
                                    <p className="text-rose-600 text-xs mt-1 font-medium">
                                        {state.meta.errors[0]?.message}
                                    </p>
                                )}
                            </div>
                        )}
                    </form.Field>
                </div>

                {/* IMAGE DE L'ÉVÉNEMENT */}
                <div className="md:col-span-2">
                    <form.Field name="image">
                        {({ handleChange }) => (
                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
                                    Visuel / Affiche de l&apos;événement
                                </label>
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={(e) => {
                                        const file = e.target.files?.[0] ?? null;
                                        handleChange(file);
                                        if (file) {
                                            setImagePreview(URL.createObjectURL(file));
                                        } else {
                                            setImagePreview(null);
                                        }
                                    }}
                                />

                                {imagePreview ? (
                                    <div className="relative h-40 w-full sm:w-72 rounded-xl overflow-hidden border border-slate-200 bg-slate-100">
                                        <img
                                            src={imagePreview}
                                            alt="Aperçu événement"
                                            className="w-full h-full object-cover"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => {
                                                handleChange(null);
                                                setImagePreview(null);
                                                if (fileInputRef.current) {
                                                    fileInputRef.current.value = "";
                                                }
                                            }}
                                            className="absolute top-2 right-2 p-1.5 rounded-lg bg-rose-600 text-white hover:bg-rose-700 transition cursor-pointer"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                ) : (
                                    <button
                                        type="button"
                                        onClick={() => fileInputRef.current?.click()}
                                        className="w-full py-6 px-4 rounded-xl border-2 border-dashed border-slate-200 hover:border-slate-400 bg-slate-50/50 hover:bg-slate-100/60 transition flex flex-col items-center justify-center gap-2 text-slate-500 cursor-pointer"
                                    >
                                        <Upload className="w-5 h-5 text-slate-400" />
                                        <span className="text-xs font-medium">
                                            Sélectionner une image ou affiche
                                        </span>
                                    </button>
                                )}
                            </div>
                        )}
                    </form.Field>
                </div>
            </div>

            <form.Subscribe
                selector={(state) => ({
                    canSubmit: state.canSubmit,
                    isSubmitting: state.isSubmitting,
                })}
            >
                {({ canSubmit, isSubmitting }) => (
                    <button
                        type="submit"
                        disabled={Boolean(!canSubmit || isSubmitting)}
                        className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-900 text-white font-semibold text-sm hover:bg-slate-800 transition shadow-xs disabled:opacity-40 disabled:pointer-events-none flex items-center justify-center gap-2 cursor-pointer"
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                <span>Création en cours...</span>
                            </>
                        ) : (
                            <>
                                <Plus className="w-4 h-4" />
                                <span>Publier l&apos;événement</span>
                            </>
                        )}
                    </button>
                )}
            </form.Subscribe>
        </form>
    );
}

export default EventForm;
