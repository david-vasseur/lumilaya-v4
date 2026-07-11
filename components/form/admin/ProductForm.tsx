"use client"

import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";

import { ProductSchema, IProduct } from "@/schema/product";
import { generateFingerprint } from "@/utils/dbFunction";
import { createProduct } from "@/lib/action/admin.action";
import { useState } from "react";


function ProductForm() {

    const [showVariants, setShowVariants] = useState(false);

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
                theme: {
                    top: "",
                    heart: "",
                    base: ""
                },
                stock: true,
                promo: undefined,
                like: undefined
            },
            variants: [],           
            tags: []
        } as IProduct,

        validators: {
            onChange: ProductSchema,
        },

        onSubmit: async ({ value }) => {

            const fingerprint = generateFingerprint();

            const token = sessionStorage.getItem("admin-token");

            if (!token) return;

            const res =
                await createProduct(
                    token,
                    fingerprint,
                    value
                );

            if(res.id){
                toast.success(
                    "Produit créé avec succès"
                );

                form.reset();
            } else {
                toast.error(
                    "Une erreur est survenue"
                );
            }
        }
    });



    return (

    <form 
        className="space-y-8 border-2 border-green-100/50 rounded-2xl p-5 shadow-xl"
        onSubmit={(e)=>{
            e.preventDefault();
            form.handleSubmit();
        }}
    >


        {/* NOM */}
        <form.Field name="meta.name">
            {({state,handleChange,handleBlur})=>(

            <div>
                <label className="block text-sm font-medium mb-2">Nom du produit *</label>
                <input
                    className="w-full rounded-lg border-2 border-[#2C2C2C]/10 bg-[#FDFBF7] py-3 px-4"
                    value={state.value}
                    onBlur={handleBlur}
                    onChange={(e)=>
                        handleChange(e.target.value)
                    }

                />

                {state.meta.errors.length > 0 &&
                    <p className="text-red-500 text-xs">{state.meta.errors[0]?.message}</p>
                }
            </div>

            )}
        </form.Field>

        {/* COLLECTION */}
        <form.Field name="meta.collection">
            {({ state, handleChange, handleBlur }) => (
                <div>
                    <label className="block text-sm font-medium mb-2">
                        Collection * <em>"Emotion" ou "Terre"</em>
                    </label>

                    <select
                        className="w-full rounded-lg border-2 border-[#2C2C2C]/10 bg-[#FDFBF7] py-3 px-4"
                        value={state.value}
                        onBlur={handleBlur}
                        onChange={(e) => {
                            const collection = e.target.value;

                            handleChange(collection);

                            if (
                                collection === "Terre" &&
                                !form.state.values.wellness?.stones
                            ) {
                                form.setFieldValue(
                                    "wellness",
                                    {
                                        stones: [
                                            {
                                                name: "",
                                                benefits: [""]
                                            }
                                        ],
                                        idealFor: [""]
                                    }
                                );
                            }

                            if (collection === "Emotion") {
                                form.setFieldValue(
                                    "wellness",
                                    {}
                                );
                            }
                        }}
                    >
                        <option value="">
                            Sélectionner une collection
                        </option>

                        <option value="Emotion">
                            Emotion & Plaisir
                        </option>

                        <option value="Terre">
                            entre Terre & Ciel
                        </option>

                    </select>
                </div>
            )}
        </form.Field>

        <button
            type="button"
            onClick={() => {

                setShowVariants(true);

                if (form.state.values.variants.length === 0) {

                    form.setFieldValue(
                        "variants",
                        [
                            {
                                name: "",
                                duration: 0,
                                weight: 0,
                                price: 0
                            }
                        ]
                    );

                }

            }}
            className="border rounded-lg px-4 py-2"
        >
            + Ajouter un format
        </button>
        
        {/* VARIANTS */}
        {showVariants && (

            <div className="space-y-4 rounded-2xl p-5 border-black/50 border">

                {
                form.state.values.variants.map((_, index) => (

                    <div
                        key={index}
                        className="border rounded-xl p-4 space-y-4"
                    >

                        <div className="flex justify-between">

                            <h3 className="font-medium">
                                Variante n° {index + 1}
                            </h3>


                            <button
                                type="button"
                                className="text-red-500"
                                onClick={() => {

                                    form.setFieldValue(
                                        "variants",
                                        form.state.values.variants.filter(
                                            (_, i) => i !== index
                                        )
                                    );

                                }}
                            >
                                Supprimer
                            </button>

                        </div>



                        <form.Field
                            name={`variants[${index}].name`}
                        >
                            {({state, handleChange, handleBlur}) => (

                                <div className="flex flex-col gap-2 ">
                                    <label className="bg-green-300/30">Nom et poids de la bougie <em>exemple: "Bougie Tendresse 150g"</em></label>
                                    <input
                                        className="input"
                                        placeholder="Nom du format"
                                        value={state.value}
                                        onBlur={handleBlur}
                                        onChange={(e)=>
                                            handleChange(e.target.value)
                                        }
                                    />


                                    {
                                    state.meta.errors.length > 0 &&
                                    <p className="text-red-500 text-xs">
                                        {state.meta.errors[0]?.message}
                                    </p>
                                    }

                                </div>

                            )}
                        </form.Field>




                        <div className="flex flex-col gap-4">


                            <form.Field
                                name={`variants[${index}].duration`}
                            >
                                {({state,handleChange})=>(
                                    <div className="flex flex-col gap-2 ">
                                        <label className="bg-green-300/30">Durée de combustion minimale <em>exemple: "25" pour une bougie emotion</em></label>
                                        <input
                                            className="input"
                                            type="number"
                                            placeholder="Durée"
                                            value={state.value}
                                            onChange={(e)=>
                                                handleChange(
                                                    Number(e.target.value)
                                                )
                                            }
                                        />
                                    </div>
                                )}
                            </form.Field>




                            <form.Field
                                name={`variants[${index}].weight`}
                            >
                                {({state,handleChange})=>(
                                    <div className="flex flex-col gap-2 ">
                                        <label className="bg-green-300/30">Poids de la cire de bougie <em>exemple: "150"</em></label>
                                        <input
                                            className="input"
                                            type="number"
                                            placeholder="Poids"
                                            value={state.value}
                                            onChange={(e)=>
                                                handleChange(
                                                    Number(e.target.value)
                                                )
                                            }
                                        />
                                    </div>
                                )}
                            </form.Field>




                            <form.Field
                                name={`variants[${index}].price`}
                            >
                                {({state,handleChange})=>(
                                    <div className="flex flex-col gap-2 ">
                                        <label className="bg-green-300/30">Prix de la bougie <em>exemple: "19.90" pour une bougie à 19,90€</em></label>
                                        <input
                                            className="input"
                                            type="number"
                                            step="0.01"
                                            placeholder="Prix"
                                            value={state.value}
                                            onChange={(e)=>
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

                ))
                }

            </div>

            )}

        {/* WELLNESS */}
        {form.state.values.meta.collection === "Terre" && (
            <div className="space-y-8">

                <h2 className="text-lg font-semibold">
                    Wellness
                </h2>


                {/* STONES */}
                <form.Field
                    name="wellness.stones"
                    mode="array"
                >
                    {(field) => (
                        <div className="space-y-4">

                            <div className="flex justify-between items-center">
                                <h3 className="font-medium">
                                    Pierres
                                </h3>

                                <button
                                    type="button"
                                    className="text-sm underline"
                                    onClick={() =>
                                        field.pushValue({
                                            name: "",
                                            benefits: [""]
                                        })
                                    }
                                >
                                    + Ajouter une pierre
                                </button>
                            </div>


                            {field.state.value && field.state.value.map((stone, index) => (
                                <div
                                    key={index}
                                    className="rounded-lg border p-4 space-y-4"
                                >

                                    {/* NOM DE LA PIERRE */}
                                    <form.Field
                                        name={`wellness.stones[${index}].name`}
                                    >
                                        {(subField) => (
                                            <div>
                                                <label className="block text-sm font-medium mb-2">
                                                    Nom de la pierre
                                                </label>

                                                <input
                                                    className="w-full rounded-lg border-2 border-[#2C2C2C]/10 bg-[#FDFBF7] py-3 px-4"
                                                    value={subField.state.value}
                                                    onChange={(e) =>
                                                        subField.handleChange(
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                            </div>
                                        )}
                                    </form.Field>


                                    {/* BENEFITS */}
                                    <form.Field
                                        name={`wellness.stones[${index}].benefits`}
                                        mode="array"
                                    >
                                        {(benefitsField) => (
                                            <div className="space-y-3">

                                                <label className="block text-sm font-medium">
                                                    Bienfaits
                                                </label>


                                                {benefitsField.state.value && benefitsField.state.value.map(
                                                    (_, benefitIndex) => (
                                                        <div
                                                            key={benefitIndex}
                                                            className="flex gap-2"
                                                        >

                                                            <form.Field
                                                                name={`wellness.stones[${index}].benefits[${benefitIndex}]`}
                                                            >
                                                                {(benefitField) => (
                                                                    <input
                                                                        className="flex-1 rounded-lg border-2 border-[#2C2C2C]/10 bg-[#FDFBF7] py-3 px-4"
                                                                        value={
                                                                            benefitField.state.value
                                                                        }
                                                                        onChange={(e) =>
                                                                            benefitField.handleChange(
                                                                                e.target.value
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
                                                            >
                                                                ❌
                                                            </button>

                                                        </div>
                                                    )
                                                )}


                                                <button
                                                    type="button"
                                                    className="text-sm underline"
                                                    onClick={() =>
                                                        benefitsField.pushValue("")
                                                    }
                                                >
                                                    + Ajouter un bienfait
                                                </button>

                                            </div>
                                        )}
                                    </form.Field>


                                    <button
                                        type="button"
                                        className="text-sm text-red-600"
                                        onClick={() =>
                                            field.removeValue(index)
                                        }
                                    >
                                        Supprimer cette pierre
                                    </button>

                                </div>
                            ))}

                        </div>
                    )}
                </form.Field>



                {/* IDEAL FOR */}
                <form.Field
                    name="wellness.idealFor"
                    mode="array"
                >
                    {(field) => (
                        <div className="space-y-4">

                            <div className="flex justify-between items-center">
                                <h3 className="font-medium">
                                    Idéal pour
                                </h3>

                                <button
                                    type="button"
                                    className="text-sm underline"
                                    onClick={() =>
                                        field.pushValue("")
                                    }
                                >
                                    + Ajouter
                                </button>
                            </div>


                            {field.state.value && field.state.value.map((_, index) => (
                                <div
                                    key={index}
                                    className="flex gap-2"
                                >

                                    <form.Field
                                        name={`wellness.idealFor[${index}]`}
                                    >
                                        {(subField) => (
                                            <input
                                                className="flex-1 rounded-lg border-2 border-[#2C2C2C]/10 bg-[#FDFBF7] py-3 px-4"
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
                                            field.removeValue(index)
                                        }
                                    >
                                        ❌
                                    </button>

                                </div>
                            ))}

                        </div>
                    )}
                </form.Field>

            </div>
        )}

        {/* SLUG */}
        <form.Field name="meta.slug">
            {({state,handleChange})=>(

            <div>
                <label className="block text-sm font-medium mb-2">Slug * <em>exemple: "bougie-vitalite" pour une Bougie Vitalité</em></label>
                <input
                    className="w-full rounded-lg border-2 border-[#2C2C2C]/10 bg-[#FDFBF7] py-3 px-4"
                    value={state.value}
                    onChange={(e)=>
                        handleChange(e.target.value)
                    }
                />
            </div>

            )}
            </form.Field>




        {/* INTRO */}
        <form.Field name="meta.intro">
            {({state,handleChange})=>(

            <div>
                <label className="block text-sm font-medium mb-2">Introduction *</label>
                <textarea
                    className="w-full rounded-lg border-2 border-[#2C2C2C]/10 bg-[#FDFBF7] py-3 px-4"
                    value={state.value}
                    onChange={(e)=>
                        handleChange(e.target.value)
                    }
                />
            </div>

            )}
        </form.Field>


        {/* THEME */}
        <div className="grid md:grid-cols-3 gap-4 rounded-2xl border border-black/50">
            <form.Field name="meta.theme.top">
                {({state,handleChange})=>(
                    <input
                        placeholder="Note de tête"
                        className="input"
                        value={state.value}
                        onChange={(e)=>
                            handleChange(e.target.value)
                        }
                    />
                )}
            </form.Field>

            <form.Field name="meta.theme.heart">

                {({state,handleChange})=>(
                    <input
                        placeholder="Note de coeur"
                        className="input"
                        value={state.value}
                        onChange={(e)=>
                            handleChange(e.target.value)
                        }
                    />
                )}
            </form.Field>

            <form.Field name="meta.theme.base">

                {({state,handleChange})=>(
                    <input
                        placeholder="Note de fond"
                        className="input"
                        value={state.value}
                        onChange={(e)=>
                            handleChange(e.target.value)
                        }
                    />
                )}
            </form.Field>
        </div>

        {/* STOCK */}
        <form.Field name="meta.stock">
            {({state,handleChange})=>(
                <label className="flex gap-3">
                    <input
                        type="checkbox"
                        checked={state.value}
                        onChange={(e)=>
                            handleChange(e.target.checked)
                        }
                    />
                    En stock
                </label>
            )}
        </form.Field>

        {/* DESCRIPTION */}

        <form.Field name="description">
            {({state,handleChange})=>(
                <div>
                    <label>
                        Description
                    </label>
                    <textarea
                        className="w-full border p-3"
                        value={state.value[0]}
                        onChange={(e)=>
                        handleChange([
                            e.target.value
                        ])
                        }
                    />
                </div>
            )}
        </form.Field>

        {/* IMAGES */}
        <form.Field name="images">
            {({handleChange})=>(
                <div>
                    <label className="block mb-2">Images produit *</label>
                    <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={(e)=>{
                            handleChange(
                                Array.from(
                                    e.target.files ?? []
                                )
                            )
                        }}
                    />
                </div>
            )}
        </form.Field>

        {/* TAGS */}
        <form.Field name="tags">
            {({state,handleChange})=>(
                <input
                    type="text"
                    className="w-full border p-3"
                    placeholder="tags séparés par un espace"
                    value={state.value.join(",")}
                    onChange={(e)=>
                        handleChange(
                            e.target.value
                                .trim()
                                .split(/\s+/)
                                .filter(Boolean)
                        )
                    }
                />
            )}
        </form.Field>


        {/* SUBMIT */}
        <form.Subscribe
            selector={(state)=>
                [
                    state.canSubmit,
                    state.isSubmitting
                ]
            }
        >
            {([canSubmit,isSubmitting])=>(
                <button
                    disabled={ !canSubmit || isSubmitting }
                    className="w-full bg-[#7A9B8E] text-white py-4 rounded-xl font-medium"
                >
                    {isSubmitting ?
                        "Création..."
                    :
                        "Créer le produit"
                    }
                </button>
            )}
        </form.Subscribe>
    </form>

    )
}

export default ProductForm;