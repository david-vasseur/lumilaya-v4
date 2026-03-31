"use client"

import { changeShippingStatus } from '@/lib/action/admin.action';
import { ShippingStatus } from '@/lib/generated/prisma/enums';
import { IShipping, ShippingSchema } from '@/schema/admin';
import { generateFingerprint } from '@/utils/dbFunction';
import { useForm } from '@tanstack/react-form';
import { toast } from 'sonner';

type ShipStatusFormProps = {
  status: ShippingStatus
  id: string
}

function ShipStatusForm({ status, id }: ShipStatusFormProps) {

    const ShippingEnum = [
        {code: ShippingStatus.PROCESSING , label: "En préparation"},
        {code: ShippingStatus.PENDING, label: "Commande validée"},
        {code: ShippingStatus.SHIPPED, label: "Commande envoyée"},
        {code: ShippingStatus.DELIVERING, label: "En livraison"},
        {code: ShippingStatus.DELIVERED, label: "Commande livrée"},
        {code: ShippingStatus.CANCELLED, label: "Annuler la commande"},
    ]

    const form = useForm({
        defaultValues: {
        shippingStatus: status,
        } as IShipping,
        validators: {
        onChange: ShippingSchema,
        },
        onSubmit: async ({ value }) => {

            const fingerprint = generateFingerprint();
            const token = sessionStorage.getItem('admin-token');

            if (!token) return

            const status = await changeShippingStatus(token, fingerprint, id, value.shippingStatus)

            if (status.success) {
                toast.success("Status mis à jour")
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
            <form.Field name="shippingStatus">
                {({ state, handleBlur, handleChange }) => (
                    <div>
                        <select
                            aria-invalid={state.meta.errors.length > 0 && state.meta.isTouched}
                            value={state.value}
                            onBlur={handleBlur}
                            onChange={(e) =>
                            handleChange(e.target.value as IShipping["shippingStatus"])
                            }
                            className="w-full rounded-lg border-2 border-[#2C2C2C]/10 bg-[#FDFBF7] py-3 px-4 text-[#2C2C2C] focus:border-[#7A9B8E] focus:outline-none transition"
                        >
                            {ShippingEnum.map((item) => (
                            <option key={item.code} value={item.code}>
                                {item.label}
                            </option>
                            ))}
                        </select>

                        {state.meta.errors.length > 0 && state.meta.isTouched && (
                            <p className="text-red-500 text-xs mt-1">
                            {state.meta.errors[0]?.message}
                            </p>
                        )}
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

export default ShipStatusForm;