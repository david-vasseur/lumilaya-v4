"use client"


import { motion } from 'framer-motion';
import { useForm } from "@tanstack/react-form"
import { ShoppingCart, CreditCard, MapPin, User } from "lucide-react";
import { useEffect, useState } from "react";
import { useCartStore } from "@/lib/store/cartStore";
// import { AddShippingPrice, handleCheckout } from "./CheckOut.action";
import { CheckoutSchema, ICheckout } from "@/schema/checkout";
import { getShippingPrice } from '@/lib/action/checkout.action';
import { ShippingType } from '@/lib/generated/prisma/enums';

type ServerItem = {
  productId: number;
  variantId: number;
  name: string;
  qty: number;
};

const europeanCountries = [
    { code: "NULL", name: "Choisir" },
    { code: "FR", name: "France" },
    { code: "DE", name: "Allemagne" },
    { code: "ES", name: "Espagne" },
    { code: "IT", name: "Italie" },
    { code: "BE", name: "Belgique" },
    { code: "NL", name: "Pays-Bas" },
    { code: "PT", name: "Portugal" },
    { code: "AT", name: "Autriche" },
    { code: "CH", name: "Suisse" },
    { code: "LU", name: "Luxembourg" },
    { code: "IE", name: "Irlande" },
    { code: "DK", name: "Danemark" },
    { code: "SE", name: "Suède" },
    { code: "NO", name: "Norvège" },
    { code: "FI", name: "Finlande" },
    { code: "PL", name: "Pologne" },
    { code: "CZ", name: "République Tchèque" },
    { code: "GR", name: "Grèce" },
];

const shippingType = [
    { code: "NULL", name: "Choisir" },
    { code: "REL", name: "Point relais" },
    { code: "DOM", name: "A domicile" },
]

export const CheckoutForm = () => {

    const [sameAddress, setSameAddress] = useState(false);
    const { items, total, setShip, ship } = useCartStore();  
    
    const form = useForm({
        defaultValues: {
            // Informations personnelles
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            
            // Adresse de livraison
            shippingAddress: "",
            shippingCity: "",
            shippingPostalCode: "",
            shippingCountry: "NULL",
            shippingType: "NULL",
            
            // Adresse de facturation
            billingAddress: "",
            billingCity: "",
            billingPostalCode: "",
            billingCountry: "FR",
            
            // CGV
            acceptCGV: false,
        } as ICheckout,
        validators: {
            onChange: CheckoutSchema,
        },
        onSubmit: async ({ value }) => {
            console.log(value);
            
            // Transformer les items front vers ServerItem            
            // const serverItems: ServerItem[] = items.map(i => ({
            //     productId: i.productId,
            //     variantId: i.id,
            //     name: i.name,
            //     qty: i.qty,
            // }));

            // 1️⃣ Calcul serveur du prix final par produit
            // const pricesForStripe = await getPricesForStripe(serverItems);

            // 2️⃣ Créer la session Stripe avec les prix serveur
            // const result = await handleCheckout(pricesForStripe, {
            //     firstName: value.firstName,
            //     lastName: value.lastName,
            //     email: value.email,
            //     phone: value.phone,
            //     shippingAddress: value.shippingAddress,
            //     shippingCity: value.shippingCity,
            //     shippingPostalCode: value.shippingPostalCode,
            //     shippingCountry: value.shippingCountry,
            //     billingAddress: value.billingAddress,
            //     billingCity: value.billingCity,
            //     billingPostalCode: value.billingPostalCode,
            //     billingCountry: value.billingCountry,
            //     acceptCGV: value.acceptCGV
            // });

            // 3️⃣ Redirection vers Stripe
            // if (result?.url) {
            //     window.location.href = result.url; 
            // }
        }
    })

    useEffect(() => {
        if (sameAddress) {
            form.setFieldValue("billingAddress", form.state.values.shippingAddress);
            form.setFieldValue("billingPostalCode", form.state.values.shippingPostalCode);
            form.setFieldValue("billingCity", form.state.values.shippingCity);
            form.setFieldValue("billingCountry", form.state.values.shippingCountry);
        }
        }, [
        sameAddress,
        form.state.values.shippingAddress,
        form.state.values.shippingPostalCode,
        form.state.values.shippingCity,
        form.state.values.shippingCountry,
    ]);

    // useEffect(() => {
    //     if (form.state.values.shippingCountry !== "FR") {
    //         const price = getShippingPrice(form.state.values.shippingCountry, form.state.values.shippingType);
    //         if (price) {
    //             setShip({shipping: true, code: form.state.values.shippingCountry, fee: price })
    //         }
    //     }
    // })

    
    // useEffect(() => {

    //     if (form.state.values.shippingCountry === "FR" && total() >= 50) {
    //         setShip({
    //             shipping: true,
    //             code: "OFF",
    //             fee: 0,
    //         });
    //     }
    // }, [total, form.state.values.shippingCountry])
    console.log(ship);
    

    return (
        <div className="min-h-screen bg-[#FDFBF7] pb-20">
            <div className="max-w-4xl mx-auto px-6">
                {/* Header */}
                <motion.div 
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="inline-flex items-center gap-2 bg-[#7A9B8E]/10 px-4 py-2 rounded-full mb-4">
                        <ShoppingCart className="w-5 h-5 text-[#7A9B8E]" />
                        <span className="text-sm font-medium text-[#7A9B8E]">Finaliser ma commande</span>
                    </div>
                    <h1 className="text-4xl font-light text-[#2C2C2C] mb-3">
                        Informations de commande
                    </h1>
                    <p className="text-[#2C2C2C]/60">
                        Renseignez vos coordonnées pour recevoir votre commande
                    </p>
                </motion.div>

                <form 
                    className="space-y-8"
                    onSubmit={(e) => {
                        e.preventDefault()
                        form.handleSubmit()
                    }}
                >
                    {/* Informations personnelles */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        className="bg-white rounded-2xl p-8 shadow-lg"
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 bg-[#7A9B8E]/10 rounded-full flex items-center justify-center">
                                <User className="w-5 h-5 text-[#7A9B8E]" />
                            </div>
                            <h2 className="text-2xl font-light text-[#2C2C2C]">
                                Informations personnelles
                            </h2>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <form.Field name="firstName">
                                {({ state, handleBlur, handleChange }) => (
                                    <div>
                                        <label className="block text-sm font-medium text-[#2C2C2C] mb-2">
                                            Prénom <span className="text-red-500">*</span>
                                        </label>
                                        <input 
                                            aria-invalid={state.meta.errors.length > 0 && state.meta.isTouched}
                                            className="w-full rounded-lg border-2 border-[#2C2C2C]/10 bg-[#FDFBF7] py-3 px-4 text-[#2C2C2C] placeholder-[#2C2C2C]/40 focus:border-[#7A9B8E] focus:outline-none transition"
                                            placeholder="Votre prénom"
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

                            <form.Field name="lastName">
                                {({ state, handleBlur, handleChange }) => (
                                    <div>
                                        <label className="block text-sm font-medium text-[#2C2C2C] mb-2">
                                            Nom <span className="text-red-500">*</span>
                                        </label>
                                        <input 
                                            aria-invalid={state.meta.errors.length > 0 && state.meta.isTouched}
                                            className="w-full rounded-lg border-2 border-[#2C2C2C]/10 bg-[#FDFBF7] py-3 px-4 text-[#2C2C2C] placeholder-[#2C2C2C]/40 focus:border-[#7A9B8E] focus:outline-none transition"
                                            placeholder="Votre nom"
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

                            <form.Field name="email">
                                {({ state, handleBlur, handleChange }) => (
                                    <div>
                                        <label className="block text-sm font-medium text-[#2C2C2C] mb-2">
                                            Email <span className="text-red-500">*</span>
                                        </label>
                                        <input 
                                            type="email"
                                            aria-invalid={state.meta.errors.length > 0 && state.meta.isTouched}
                                            className="w-full rounded-lg border-2 border-[#2C2C2C]/10 bg-[#FDFBF7] py-3 px-4 text-[#2C2C2C] placeholder-[#2C2C2C]/40 focus:border-[#7A9B8E] focus:outline-none transition"
                                            placeholder="votre@email.com"
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

                            <form.Field name="phone">
                                {({ state, handleBlur, handleChange }) => (
                                    <div>
                                        <label className="block text-sm font-medium text-[#2C2C2C] mb-2">
                                            Téléphone <span className="text-red-500">*</span>
                                        </label>
                                        <input 
                                            type="tel"
                                            aria-invalid={state.meta.errors.length > 0 && state.meta.isTouched}
                                            className="w-full rounded-lg border-2 border-[#2C2C2C]/10 bg-[#FDFBF7] py-3 px-4 text-[#2C2C2C] placeholder-[#2C2C2C]/40 focus:border-[#7A9B8E] focus:outline-none transition"
                                            placeholder="06 12 34 56 78"
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
                        </div>
                    </motion.div>

                    {/* Adresse de livraison */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                        className="bg-white rounded-2xl p-8 shadow-lg"
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 bg-[#7A9B8E]/10 rounded-full flex items-center justify-center">
                                <MapPin className="w-5 h-5 text-[#7A9B8E]" />
                            </div>
                            <h2 className="text-2xl font-light text-[#2C2C2C]">
                                Adresse de livraison
                            </h2>
                        </div>

                        <div className="space-y-6">
                            <form.Field name="shippingAddress">
                                {({ state, handleBlur, handleChange }) => (
                                    <div>
                                        <label className="block text-sm font-medium text-[#2C2C2C] mb-2">
                                            Adresse complète <span className="text-red-500">*</span>
                                        </label>
                                        <input 
                                            aria-invalid={state.meta.errors.length > 0 && state.meta.isTouched}
                                            className="w-full rounded-lg border-2 border-[#2C2C2C]/10 bg-[#FDFBF7] py-3 px-4 text-[#2C2C2C] placeholder-[#2C2C2C]/40 focus:border-[#7A9B8E] focus:outline-none transition"
                                            placeholder="Numéro et nom de rue"
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

                            <div className="grid md:grid-cols-3 gap-6">
                                <form.Field name="shippingPostalCode">
                                    {({ state, handleBlur, handleChange }) => (
                                        <div>
                                            <label className="block text-sm font-medium text-[#2C2C2C] mb-2">
                                                Code postal <span className="text-red-500">*</span>
                                            </label>
                                            <input 
                                                aria-invalid={state.meta.errors.length > 0 && state.meta.isTouched}
                                                className="w-full rounded-lg border-2 border-[#2C2C2C]/10 bg-[#FDFBF7] py-3 px-4 text-[#2C2C2C] placeholder-[#2C2C2C]/40 focus:border-[#7A9B8E] focus:outline-none transition"
                                                placeholder="75001"
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

                                <form.Field name="shippingCity">
                                    {({ state, handleBlur, handleChange }) => (
                                        <div>
                                            <label className="block text-sm font-medium text-[#2C2C2C] mb-2">
                                                Ville <span className="text-red-500">*</span>
                                            </label>
                                            <input 
                                                aria-invalid={state.meta.errors.length > 0 && state.meta.isTouched}
                                                className="w-full rounded-lg border-2 border-[#2C2C2C]/10 bg-[#FDFBF7] py-3 px-4 text-[#2C2C2C] placeholder-[#2C2C2C]/40 focus:border-[#7A9B8E] focus:outline-none transition"
                                                placeholder="Paris"
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

                                <form.Field name="shippingCountry">
                                    {({ state, handleBlur, handleChange }) => (
                                        <div>
                                            <label className="block text-sm font-medium text-[#2C2C2C] mb-2">
                                                Pays <span className="text-red-500">*</span>
                                            </label>
                                            <select
                                                aria-invalid={state.meta.errors.length > 0 && state.meta.isTouched}
                                                value={state.value}
                                                onBlur={handleBlur}
                                                onChange={async (e) => {
                                                    const newCountry = e.target.value;

                                                    handleChange(newCountry);

                                                    if (newCountry !== "FR") {
                                                        const price = await getShippingPrice(
                                                        newCountry,
                                                        "REL"
                                                        );

                                                        if (price) {
                                                        setShip({
                                                            shipping: true,
                                                            code: "REL",
                                                            fee: price,
                                                        });
                                                        }
                                                    }

                                                    if (newCountry === "FR" && total() >= 50) {
                                                        setShip({
                                                            shipping: true,
                                                            code: "OFF",
                                                            fee: 0,
                                                        });
                                                    }
                                                }}
                                                // const fee = await AddShippingPrice(form.state.values.shippingCountry, total()) || {shipping: false, code: "", fee: 0}; setShip({shipping: true, code: e.target.value, fee: fee?.status === "free" ? 0 : fee?.shipping?.price ?? 0})}}
                                                className="w-full rounded-lg border-2 border-[#2C2C2C]/10 bg-[#FDFBF7] py-3 px-4 text-[#2C2C2C] focus:border-[#7A9B8E] focus:outline-none transition"
                                            >
                                                {europeanCountries.map((country) => (
                                                    <option key={country.code} value={country.code}>
                                                        {country.name}
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

                                <form.Subscribe selector={(state) => state.values.shippingCountry}>
                                    {(shippingCountry) => {
                                        // 1️⃣ Rien sélectionné
                                        if (shippingCountry === "NULL") return null;

                                        if (shippingCountry === "FR" && total() >= 50) {
                                            return (
                                                <div className="bg-[#7A9B8E]/10 border border-[#7A9B8E]/20 rounded-lg p-4 text-sm text-[#2C2C2C]">
                                                    La livraison à domicile est offerte.
                                                </div>
                                            )
                                        }

                                        // 2️⃣ France → choix du type
                                        if (shippingCountry === "FR") {
                                            return (
                                                <form.Field name="shippingType">
                                                    {({ state, handleBlur, handleChange }) => (
                                                        <div>
                                                            <label className="block text-sm font-medium text-[#2C2C2C] mb-2">
                                                                Type de livraison <span className="text-red-500">*</span>
                                                            </label>

                                                            <select
                                                                value={state.value}
                                                                onBlur={handleBlur}
                                                                onChange={async (e) => {
                                                                    const shipType = e.target.value as ShippingType;

                                                                    handleChange(shipType);

                                                                        const price = await getShippingPrice(
                                                                            "FR",
                                                                            shipType
                                                                        );

                                                                        if (price) {
                                                                            setShip({
                                                                                shipping: true,
                                                                                code: shipType,
                                                                                fee: price,
                                                                            });
                                                                        }
                                                                    
                                                                }}
                                                                className="w-full rounded-lg border-2 border-[#2C2C2C]/10 bg-[#FDFBF7] py-3 px-4"
                                                            >
                                                                {shippingType.map((type) => (
                                                                    <option key={type.code} value={type.code}>
                                                                        {type.name}
                                                                    </option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                    )}
                                                </form.Field>
                                            );
                                        }

                                        // 3️⃣ Autres pays → message UX
                                        return (
                                            
                                            <div className="bg-[#7A9B8E]/10 border border-[#7A9B8E]/20 rounded-lg p-4 text-sm text-[#2C2C2C]">
                                                Seules les livraisons en point relais sont disponibles dans votre région.
                                            </div>
                                        );
                                    }}
                                </form.Subscribe>
                            </div>
                        </div>
                    </motion.div>

                    {/* Checkbox même adresse */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                        className="flex items-center gap-3 px-6"
                    >
                        <input
                            type="checkbox"
                            id="sameAddress"
                            checked={sameAddress}
                            onChange={(e) => setSameAddress(e.target.checked)}
                            className="w-5 h-5 rounded border-2 border-[#2C2C2C]/20 text-[#7A9B8E] focus:ring-[#7A9B8E] focus:ring-offset-0"
                        />
                        <label htmlFor="sameAddress" className="text-[#2C2C2C]/70 cursor-pointer">
                            L'adresse de facturation est identique à l'adresse de livraison
                        </label>
                    </motion.div>

                    {/* Adresse de facturation */}
                    {!sameAddress && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4 }}
                            className="bg-white rounded-2xl p-8 shadow-lg"
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 bg-[#7A9B8E]/10 rounded-full flex items-center justify-center">
                                    <CreditCard className="w-5 h-5 text-[#7A9B8E]" />
                                </div>
                                <h2 className="text-2xl font-light text-[#2C2C2C]">
                                    Adresse de facturation
                                </h2>
                            </div>

                            <div className="space-y-6">
                                <form.Field name="billingAddress">
                                    {({ state, handleBlur, handleChange }) => (
                                        <div>
                                            <label className="block text-sm font-medium text-[#2C2C2C] mb-2">
                                                Adresse complète <span className="text-red-500">*</span>
                                            </label>
                                            <input 
                                                aria-invalid={state.meta.errors.length > 0 && state.meta.isTouched}
                                                className="w-full rounded-lg border-2 border-[#2C2C2C]/10 bg-[#FDFBF7] py-3 px-4 text-[#2C2C2C] placeholder-[#2C2C2C]/40 focus:border-[#7A9B8E] focus:outline-none transition"
                                                placeholder="Numéro et nom de rue"
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

                                <div className="grid md:grid-cols-3 gap-6">
                                    <form.Field name="billingPostalCode">
                                        {({ state, handleBlur, handleChange }) => (
                                            <div>
                                                <label className="block text-sm font-medium text-[#2C2C2C] mb-2">
                                                    Code postal <span className="text-red-500">*</span>
                                                </label>
                                                <input 
                                                    aria-invalid={state.meta.errors.length > 0 && state.meta.isTouched}
                                                    className="w-full rounded-lg border-2 border-[#2C2C2C]/10 bg-[#FDFBF7] py-3 px-4 text-[#2C2C2C] placeholder-[#2C2C2C]/40 focus:border-[#7A9B8E] focus:outline-none transition"
                                                    placeholder="75001"
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

                                    <form.Field name="billingCity">
                                        {({ state, handleBlur, handleChange }) => (
                                            <div>
                                                <label className="block text-sm font-medium text-[#2C2C2C] mb-2">
                                                    Ville <span className="text-red-500">*</span>
                                                </label>
                                                <input 
                                                    aria-invalid={state.meta.errors.length > 0 && state.meta.isTouched}
                                                    className="w-full rounded-lg border-2 border-[#2C2C2C]/10 bg-[#FDFBF7] py-3 px-4 text-[#2C2C2C] placeholder-[#2C2C2C]/40 focus:border-[#7A9B8E] focus:outline-none transition"
                                                    placeholder="Paris"
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

                                    <form.Field name="billingCountry">
                                        {({ state, handleBlur, handleChange }) => (
                                            <div>
                                                <label className="block text-sm font-medium text-[#2C2C2C] mb-2">
                                                    Pays <span className="text-red-500">*</span>
                                                </label>
                                                <select
                                                    aria-invalid={state.meta.errors.length > 0 && state.meta.isTouched}
                                                    value={state.value}
                                                    onBlur={handleBlur}
                                                    onChange={(e) => handleChange(e.target.value)}
                                                    className="w-full rounded-lg border-2 border-[#2C2C2C]/10 bg-[#FDFBF7] py-3 px-4 text-[#2C2C2C] focus:border-[#7A9B8E] focus:outline-none transition"
                                                >
                                                    {europeanCountries.map((country) => (
                                                        <option key={country.code} value={country.code}>
                                                            {country.name}
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
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* CGV */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.6 }}
                        className="bg-[#F5F1EB] rounded-xl p-6"
                    >
                        <form.Field name="acceptCGV">
                            {({ state, handleBlur, handleChange }) => (
                                <div>
                                    <div className="flex items-start gap-3">
                                        <input
                                            type="checkbox"
                                            id="cgv"
                                            aria-invalid={state.meta.errors.length > 0 && state.meta.isTouched}
                                            checked={state.value}
                                            onBlur={handleBlur}
                                            onChange={(e) => handleChange(e.target.checked)}
                                            className="mt-1 w-5 h-5 rounded border-2 border-[#2C2C2C]/20 text-[#7A9B8E] focus:ring-[#7A9B8E] focus:ring-offset-0"
                                        />
                                        <label htmlFor="cgv" className="text-[#2C2C2C]/70 cursor-pointer">
                                            J'accepte les{' '}
                                            <a href="/cgv" className="text-[#7A9B8E] hover:underline font-medium">
                                                Conditions Générales de Vente
                                            </a>{' '}
                                            et la{' '}
                                            <a href="/politique-confidentialite" className="text-[#7A9B8E] hover:underline font-medium">
                                                Politique de confidentialité
                                            </a>
                                            <span className="text-red-500"> *</span>
                                        </label>
                                    </div>
                                    {state.meta.errors.length > 0 && state.meta.isTouched && (
                                        <p className="text-red-500 text-xs mt-2 ml-8">
                                            {state.meta.errors[0]?.message}
                                        </p>
                                    )}
                                </div>
                            )}
                        </form.Field>
                    </motion.div>

                    {/* Bouton de soumission */}
                    <form.Subscribe 
                        selector={(state) => [state.canSubmit, state.isSubmitting]}
                        children={([canSubmit, isSubmitting]) => (
                            <motion.button 
                                type="submit" 
                                disabled={!canSubmit || isSubmitting}
                                className="w-full bg-[#7A9B8E] text-white py-4 rounded-xl font-medium text-lg hover:bg-[#6A8B7E] transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6, duration: 0.6 }}
                                whileHover={{ scale: canSubmit ? 1.02 : 1 }}
                                whileTap={{ scale: canSubmit ? 0.98 : 1 }}    
                            >
                                {isSubmitting ? (
                                    "Traitement en cours..."
                                ) : (
                                    <>
                                        <CreditCard className="w-5 h-5" />
                                        Procéder au paiement
                                    </>
                                )}
                            </motion.button>
                        )}            
                    />
                </form>
            </div>
        </div>
    );
}