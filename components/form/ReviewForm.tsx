"use client";

import { useForm } from "@tanstack/react-form";
import { Star } from "lucide-react";
import { useModalStore } from "@/lib/store/modalStore";
import { toast } from "sonner";
import { createReview } from "@/lib/action/review.action";
import { IReview, ReviewSchema } from "@/schema/review";

function ReviewForm({
    productId
}: {
    productId: number;
}) {

    const { closeModal } = useModalStore();

    const form = useForm({
        defaultValues: {
        name: "",
        comment: "",
        productId,
        note: 1,
        } as IReview,
        validators: {
        onChange: ReviewSchema,
        },
        onSubmit: async ({ value }) => {
            try {
                const { productId, name, comment, note } = value;

                await createReview({ productId, name, comment, note } );

                toast.success("Votre commentaire est pris en compte");
                closeModal()
            } catch (error) {
                toast.error("Une erreur s'est produite");
            }
        },
    });

    return (
        <div className="max-w-xl mx-auto">
            <form
                className="space-y-8"
                onSubmit={(e) => {
                e.preventDefault();
                form.handleSubmit();
                }}
            >
                {/* NOM */}
                <form.Field name="name">
                {({ state, handleBlur, handleChange }) => (
                    <div>
                    <label className="block text-sm font-medium text-[#2C2C2C] mb-2">
                        Votre nom <span className="text-red-500">*</span>
                    </label>

                    <input
                        aria-invalid={
                        state.meta.errors.length > 0 && state.meta.isTouched
                        }
                        className="w-full rounded-lg border-2 border-[#2C2C2C]/10 bg-[#FDFBF7] py-3 px-4 text-[#2C2C2C] placeholder-[#2C2C2C]/40 focus:border-[#7A9B8E] focus:outline-none transition"
                        placeholder="Entrez votre nom"
                        value={state.value}
                        onBlur={handleBlur}
                        onChange={(e) => handleChange(e.target.value)}
                    />

                    {state.meta.errors.length > 0 && state.meta.isTouched && (
                        <p className="text-red-500 text-xs mt-1">
                        {state.meta.errors[0]?.message}
                        </p>
                    )}
                    </div>
                )}
                </form.Field>

                {/* COMMENTAIRE */}
                <form.Field name="comment">
                {({ state, handleBlur, handleChange }) => (
                    <div>
                    <label className="block text-sm font-medium text-[#2C2C2C] mb-2">
                        Votre commentaire <span className="text-red-500">*</span>
                    </label>

                    <textarea
                        rows={4}
                        className="w-full rounded-lg border-2 border-[#2C2C2C]/10 bg-[#FDFBF7] py-3 px-4 text-[#2C2C2C] placeholder-[#2C2C2C]/40 focus:border-[#7A9B8E] focus:outline-none transition resize-none"
                        placeholder="Partagez votre expérience..."
                        value={state.value}
                        onBlur={handleBlur}
                        onChange={(e) => handleChange(e.target.value)}
                    />

                    {state.meta.errors.length > 0 && state.meta.isTouched && (
                        <p className="text-red-500 text-xs mt-1">
                        {state.meta.errors[0]?.message}
                        </p>
                    )}
                    </div>
                )}
                </form.Field>

                {/* NOTE (ETOILES) */}
                <form.Field name="note">
                {({ state, handleChange }) => (
                    <div>
                    <label className="block text-sm font-medium text-[#2C2C2C] mb-3">
                        Note <span className="text-red-500">*</span>
                    </label>

                    <div className="flex items-center gap-2">
                        {[1, 2, 3, 4, 5].map((value) => (
                        <button
                            key={value}
                            type="button"
                            onClick={() => handleChange(value)}
                            className="transition-transform hover:scale-110"
                        >
                            <Star
                            className={`w-7 h-7 ${
                                value <= state.value
                                ? "fill-[#7A9B8E] text-[#7A9B8E]"
                                : "text-[#2C2C2C]/20"
                            }`}
                            />
                        </button>
                        ))}
                    </div>

                    {state.meta.errors.length > 0 && (
                        <p className="text-red-500 text-xs mt-1">
                        {state.meta.errors[0]?.message}
                        </p>
                    )}
                    </div>
                )}
                </form.Field>

                {/* SUBMIT */}
                <form.Subscribe
                selector={(state) => [state.canSubmit, state.isSubmitting]}
                >
                {([canSubmit, isSubmitting]) => (
                    <button
                    type="submit"
                    disabled={!canSubmit || isSubmitting}
                    className="w-full bg-[#7A9B8E] text-white py-4 rounded-xl font-medium text-lg hover:bg-[#6A8B7E] transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                    >
                    {isSubmitting ? "Traitement en cours..." : "Valider votre commentaire"}
                    </button>
                )}
                </form.Subscribe>
            </form>
        </div>
    );
}

export default ReviewForm;
