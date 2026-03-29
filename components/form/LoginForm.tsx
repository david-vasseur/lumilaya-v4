"use client"

import { ILogin, LoginSchema } from '@/schema/login';
import { useForm } from '@tanstack/react-form';
import { toast } from 'sonner';
import { createHash } from 'crypto';
import { login } from '@/lib/action/admin.action';
import { generateFingerprint } from '@/utils/dbFunction';



function LoginForm() {
    const form = useForm({
        defaultValues: {
        username: "",
        password: "",
        } as ILogin,
        validators: {
        onChange: LoginSchema,
        },
        onSubmit: async ({ value }) => {

            const fingerprint = generateFingerprint()
          
            const data = await login(value.username, value.password, fingerprint);
            if (data.success) {
                sessionStorage.setItem('admin-token', data.access_token);
                toast.success(data.message)
            } else {
                toast.error(data.message)
            }
        },
    });

    return (
        <div className="max-w-xl mx-auto">
            <form
                className="space-y-8 border-2 border-green-100/50 rounded-2xl p-5 shadow-xl"
                onSubmit={(e) => {
                e.preventDefault();
                form.handleSubmit();
                }}
            >
                {/* NOM */}
                <form.Field name="username">
                {({ state, handleBlur, handleChange }) => (
                    <div>
                    <label className="block text-sm font-medium text-[#2C2C2C] mb-2">
                        Votre username <span className="text-red-500">*</span>
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
                                <form.Field name="password">
                {({ state, handleBlur, handleChange }) => (
                    <div>
                    <label className="block text-sm font-medium text-[#2C2C2C] mb-2">
                        Votre mot de passe <span className="text-red-500">*</span>
                    </label>

                    <input
                        aria-invalid={
                        state.meta.errors.length > 0 && state.meta.isTouched
                        }
                        type="password"
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
                    {isSubmitting ? "Traitement en cours..." : "Se connecter"}
                    </button>
                )}
                </form.Subscribe>
            </form>
        </div>
    );
}

export default LoginForm;