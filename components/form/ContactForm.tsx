"use client"

import { ContactSchema, IContact } from '@/schema/contact';
import { useForm } from '@tanstack/react-form';

function ContactForm() {
    const form = useForm({
        defaultValues: {
        name: "",
        email: "",
        comment: "",
        } as IContact,
        validators: {
        onChange: ContactSchema,
        },
        onSubmit: async ({ value }) => {
            console.log(value);    
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

                {/* EMAIL */}
                                <form.Field name="email">
                {({ state, handleBlur, handleChange }) => (
                    <div>
                    <label className="block text-sm font-medium text-[#2C2C2C] mb-2">
                        Votre email <span className="text-red-500">*</span>
                    </label>

                    <input
                        aria-invalid={
                        state.meta.errors.length > 0 && state.meta.isTouched
                        }
                        className="w-full rounded-lg border-2 border-[#2C2C2C]/10 bg-[#FDFBF7] py-3 px-4 text-[#2C2C2C] placeholder-[#2C2C2C]/40 focus:border-[#7A9B8E] focus:outline-none transition"
                        placeholder="Entrez votre email"
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
                        Votre question <span className="text-red-500">*</span>
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
                    {isSubmitting ? "Traitement en cours..." : "Envoyer"}
                    </button>
                )}
                </form.Subscribe>
            </form>
        </div>
    );
}

export default ContactForm;