"use client"

import { createEvent } from '@/lib/action/admin.action';
import { EventSchema, IEvent } from '@/schema/event';
import { generateFingerprint } from '@/utils/dbFunction';
import { useForm } from '@tanstack/react-form';
import { toast } from 'sonner';



function EventForm() {

    const form = useForm({
        defaultValues: {
        name: "",
        address: "",
        city: "",
        dateStart: "",
        dateEnd: "",
        postalCode: "",
        image: null,
        url: ""
    } as IEvent,
        validators: {
            onChange: EventSchema,
        },
        onSubmit: async ({ value }) => {

            const fingerprint = generateFingerprint();
            const token = sessionStorage.getItem('admin-token');

            if (!token) return

            const res = await createEvent(token, fingerprint, value);
           
            if (res.success) {
                toast.success("Evennement créé avec succès")
            } else {
                toast.error("Une erreur est survenue")
            }
        },
    });

    return (
        <form
            className="space-y-8 border-2 border-green-100/50 rounded-2xl p-5 shadow-xl"
            onSubmit={(e) => {
                e.preventDefault();
                form.handleSubmit();
            }}
        >
            <form.Field name="name">
                {({ state, handleBlur, handleChange }) => (
                    <div>
                    <label className="block text-sm font-medium text-[#2C2C2C] mb-2">
                        Nom de l'evenement <span className="text-red-500">*</span>
                    </label>

                    <input
                        aria-invalid={
                        state.meta.errors.length > 0 && state.meta.isTouched
                        }
                        className="w-full rounded-lg border-2 border-[#2C2C2C]/10 bg-[#FDFBF7] py-3 px-4 text-[#2C2C2C] placeholder-[#2C2C2C]/40 focus:border-[#7A9B8E] focus:outline-none transition"
                        placeholder="Votre evenement"
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

            <form.Field name="address">
                {({ state, handleBlur, handleChange }) => (
                    <div>
                    <label className="block text-sm font-medium text-[#2C2C2C] mb-2">
                        Adresse <span className="text-red-500">*</span>
                    </label>

                    <input
                        aria-invalid={state.meta.errors.length > 0 && state.meta.isTouched}
                        className="w-full rounded-lg border-2 border-[#2C2C2C]/10 bg-[#FDFBF7] py-3 px-4 text-[#2C2C2C] placeholder-[#2C2C2C]/40 focus:border-[#7A9B8E] focus:outline-none transition"
                        placeholder="Adresse de l'événement"
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

            <form.Field name="city">
                {({ state, handleBlur, handleChange }) => (
                    <div>
                    <label className="block text-sm font-medium text-[#2C2C2C] mb-2">
                        Ville <span className="text-red-500">*</span>
                    </label>

                    <input
                        aria-invalid={state.meta.errors.length > 0 && state.meta.isTouched}
                        className="w-full rounded-lg border-2 border-[#2C2C2C]/10 bg-[#FDFBF7] py-3 px-4 text-[#2C2C2C] placeholder-[#2C2C2C]/40 focus:border-[#7A9B8E] focus:outline-none transition"
                        placeholder="Ville"
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

            <form.Field name="postalCode">
                {({ state, handleBlur, handleChange }) => (
                    <div>
                    <label className="block text-sm font-medium text-[#2C2C2C] mb-2">
                        Code postal <span className="text-red-500">*</span>
                    </label>

                    <input
                        aria-invalid={state.meta.errors.length > 0 && state.meta.isTouched}
                        className="w-full rounded-lg border-2 border-[#2C2C2C]/10 bg-[#FDFBF7] py-3 px-4 text-[#2C2C2C] placeholder-[#2C2C2C]/40 focus:border-[#7A9B8E] focus:outline-none transition"
                        placeholder="06000"
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

            <form.Field name="dateStart">
                {({ state, handleBlur, handleChange }) => (
                    <div>
                    <label className="block text-sm font-medium text-[#2C2C2C] mb-2">
                        Date de début <span className="text-red-500">*</span>
                    </label>

                    <input
                        type="date"
                        aria-invalid={state.meta.errors.length > 0 && state.meta.isTouched}
                        className="w-full rounded-lg border-2 border-[#2C2C2C]/10 bg-[#FDFBF7] py-3 px-4 text-[#2C2C2C] focus:border-[#7A9B8E] focus:outline-none transition"
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

            <form.Field name="dateEnd">
                {({ state, handleBlur, handleChange }) => (
                    <div>
                    <label className="block text-sm font-medium text-[#2C2C2C] mb-2">
                        Date de fin <span className="text-red-500">*</span>
                    </label>

                    <input
                        type="date"
                        aria-invalid={state.meta.errors.length > 0 && state.meta.isTouched}
                        className="w-full rounded-lg border-2 border-[#2C2C2C]/10 bg-[#FDFBF7] py-3 px-4 text-[#2C2C2C] focus:border-[#7A9B8E] focus:outline-none transition"
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

            <form.Field name="url">
                {({ state, handleBlur, handleChange }) => (
                    <div>
                    <label className="block text-sm font-medium text-[#2C2C2C] mb-2">
                        URL de l'événement
                    </label>

                    <input
                        aria-invalid={state.meta.errors.length > 0 && state.meta.isTouched}
                        className="w-full rounded-lg border-2 border-[#2C2C2C]/10 bg-[#FDFBF7] py-3 px-4 text-[#2C2C2C] placeholder-[#2C2C2C]/40 focus:border-[#7A9B8E] focus:outline-none transition"
                        placeholder="https://..."
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

            <form.Field name="image">
                {({ handleChange }) => (
                    <div>
                    <label className="block text-sm font-medium text-[#2C2C2C] mb-2">
                        Image de l'événement
                    </label>

                    <input
                        type="file"
                        accept="image/*"
                        className="w-full text-sm"
                        onChange={(e) =>
                        handleChange(e.target.files?.[0] ?? null)
                        }
                    />
                    </div>
                )}
            </form.Field>

            <form.Subscribe
                selector={(state) => [state.canSubmit, state.isSubmitting]}
                >
                {([canSubmit, isSubmitting]) => (
                    <button
                    type="submit"
                    disabled={!canSubmit || isSubmitting}
                    className="w-full bg-[#7A9B8E] text-white py-4 rounded-xl font-medium text-lg hover:bg-[#6A8B7E] transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                    >
                    {isSubmitting ? "Traitement en cours..." : "Valider"}
                    </button>
                )}
            </form.Subscribe>
        </form>
    )
}

export default EventForm;