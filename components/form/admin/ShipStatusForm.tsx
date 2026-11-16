"use client"

import { changeShippingStatus } from '@/lib/action/admin.action';
import { ShippingStatus } from '@/lib/generated/prisma/enums';
import { IShipping, ShippingSchema } from '@/schema/admin';
import { generateFingerprint } from '@/utils/dbFunction';
import { useForm } from '@tanstack/react-form';
import { toast } from 'sonner';
import { Check, ChevronDown, Loader2, RefreshCw } from 'lucide-react';

type ShipStatusFormProps = {
    status: ShippingStatus;
    id: string;
    onStatusUpdated?: (newStatus: ShippingStatus) => void;
}

const SHIPPING_OPTIONS = [
    { code: ShippingStatus.PENDING, label: "En attente (Validée)" },
    { code: ShippingStatus.PROCESSING, label: "En préparation" },
    { code: ShippingStatus.SHIPPED, label: "Commande expédiée" },
    { code: ShippingStatus.DELIVERING, label: "En cours de livraison" },
    { code: ShippingStatus.DELIVERED, label: "Commande livrée" },
    { code: ShippingStatus.CANCELLED, label: "Annuler la commande" },
];

function ShipStatusForm({ status, id, onStatusUpdated }: ShipStatusFormProps) {

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

            if (!token || !fingerprint) {
                toast.error("Session expirée, veuillez vous reconnecter");
                return;
            }

            try {
                const res = await changeShippingStatus(token, fingerprint, id, value.shippingStatus);

                if (res.success) {
                    toast.success("Statut de la commande mis à jour");
                    onStatusUpdated?.(value.shippingStatus as ShippingStatus);
                } else {
                    toast.error("Impossible de mettre à jour le statut");
                }
            } catch {
                toast.error("Une erreur réseau est survenue");
            }
        },
    });

    return (
        <form
            className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-2xs space-y-4"
            onSubmit={(e) => {
                e.preventDefault();
                form.handleSubmit();
            }}
        >
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center">
                        <RefreshCw className="w-4 h-4" />
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-slate-900">Mettre à jour le statut</h3>
                        <p className="text-xs text-slate-500">Suivi d&apos;expédition client</p>
                    </div>
                </div>
            </div>

            <form.Field name="shippingStatus">
                {({ state, handleBlur, handleChange }) => (
                    <div className="space-y-1.5">
                        <div className="relative">
                            <select
                                aria-invalid={state.meta.errors.length > 0 && state.meta.isTouched}
                                value={state.value}
                                onBlur={handleBlur}
                                onChange={(e) =>
                                    handleChange(e.target.value as IShipping["shippingStatus"])
                                }
                                className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50/70 py-2.5 pl-3.5 pr-10 text-sm font-medium text-slate-900 focus:bg-white focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10 focus:outline-none transition cursor-pointer"
                            >
                                {SHIPPING_OPTIONS.map((item) => (
                                    <option key={item.code} value={item.code}>
                                        {item.label}
                                    </option>
                                ))}
                            </select>
                            <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>

                        {state.meta.errors.length > 0 && state.meta.isTouched && (
                            <p className="text-rose-600 text-xs font-medium">
                                {state.meta.errors[0]?.message}
                            </p>
                        )}
                    </div>
                )}
            </form.Field>

            <form.Subscribe
                selector={(state) => ({
                    canSubmit: state.canSubmit,
                    isSubmitting: state.isSubmitting,
                    currentVal: state.values.shippingStatus,
                })}
            >
                {({ canSubmit, isSubmitting, currentVal }) => {
                    const isUnchanged = currentVal === status;

                    return (
                        <button
                            type="submit"
                            disabled={Boolean(!canSubmit || isSubmitting || isUnchanged)}
                            className="w-full bg-slate-900 text-white py-2.5 px-4 rounded-xl font-medium text-sm hover:bg-slate-800 active:scale-[0.99] transition-all shadow-2xs disabled:opacity-40 disabled:pointer-events-none flex items-center justify-center gap-2 cursor-pointer"
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    <span>Enregistrement...</span>
                                </>
                            ) : (
                                <>
                                    <Check className="w-4 h-4" />
                                    <span>{isUnchanged ? "Statut actuel" : "Enregistrer le statut"}</span>
                                </>
                            )}
                        </button>
                    );
                }}
            </form.Subscribe>
        </form>
    );
}

export default ShipStatusForm;
