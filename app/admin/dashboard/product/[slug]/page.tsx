// "use client";

// import { getOneProductById, updateProduct } from "@/lib/action/admin.action";
// import { generateFingerprint } from "@/utils/dbFunction";
// import { useParams } from "next/navigation";
// import { useEffect, useState } from "react";
// import { useForm } from "@tanstack/react-form";

// function Page() {
//   const params = useParams();
//   const slug = params.slug as string;
//   const id = Number(slug);

//   const [loading, setLoading] = useState(true);

//   const form = useForm({
//     defaultValues: {
//       description: [] as string[],
//       images: [] as string[],

//       meta: {
//         name: "",
//         intro: "",
//         collection: "",
//         content: "",
//         stock: false,
//         promo: 0,
//         like: 0,
//       },
//     },

//     onSubmit: async ({ value }) => {
//       const fingerprint = generateFingerprint();
//       const token = sessionStorage.getItem("admin-token");

//       if (!token || !fingerprint) return;

//       await updateProduct(token, fingerprint, id, value);
//     },
//   });

//   useEffect(() => {
//     const loadProduct = async () => {
//       const fingerprint = generateFingerprint();
//       const token = sessionStorage.getItem("admin-token");

//       if (!token || !fingerprint || !id) return;

//       try {
//         const product = await getOneProductById(token, fingerprint, id);

//         form.setFieldValue("description", product.description || []);
//         form.setFieldValue("images", product.images || []);

//         form.setFieldValue("meta.name", product.meta?.name || "");
//         form.setFieldValue("meta.intro", product.meta?.intro || "");
//         form.setFieldValue("meta.collection", product.meta?.collection || "");
//         form.setFieldValue("meta.stock", product.meta?.stock || false);
//         form.setFieldValue("meta.promo", product.meta?.promo || 0);
//         form.setFieldValue("meta.like", product.meta?.like || 0);
//       } catch (e) {
//         console.error("Error loading product", e);
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadProduct();
//   }, [id]);

//   if (loading) return <p className="p-10">Loading...</p>;

//   return (
//     <div className="pt-24 px-6 max-w-3xl mx-auto">
//       <h1 className="text-2xl font-bold mb-6">Edit Product</h1>

//       <form
//         className="space-y-6"
//         onSubmit={(e) => {
//           e.preventDefault();
//           form.handleSubmit();
//         }}
//       >
//         {/* NAME */}
//         <form.Field name="meta.name">
//           {({ state, handleChange }) => (
//             <div>
//               <label>Name</label>
//               <input
//                 className="w-full border p-2 rounded"
//                 value={state.value}
//                 onChange={(e) => handleChange(e.target.value)}
//               />
//             </div>
//           )}
//         </form.Field>

//         {/* INTRO */}
//         <form.Field name="meta.intro">
//           {({ state, handleChange }) => (
//             <div>
//               <label>Intro</label>
//               <textarea
//                 className="w-full border p-2 rounded"
//                 value={state.value}
//                 onChange={(e) => handleChange(e.target.value)}
//               />
//             </div>
//           )}
//         </form.Field>

//         {/* COLLECTION */}
//         <form.Field name="meta.collection">
//           {({ state, handleChange }) => (
//             <div>
//               <label>Collection</label>
//               <input
//                 className="w-full border p-2 rounded"
//                 value={state.value}
//                 onChange={(e) => handleChange(e.target.value)}
//               />
//             </div>
//           )}
//         </form.Field>

//         {/* STOCK */}
//         <form.Field name="meta.stock">
//           {({ state, handleChange }) => (
//             <div className="flex items-center gap-2">
//               <label>Stock</label>
//               <input
//                 type="checkbox"
//                 checked={state.value}
//                 onChange={(e) => handleChange(e.target.checked)}
//               />
//             </div>
//           )}
//         </form.Field>

//         {/* PROMO */}
//         <form.Field name="meta.promo">
//           {({ state, handleChange }) => (
//             <div>
//               <label>Promo</label>
//               <input
//                 type="number"
//                 className="w-full border p-2 rounded"
//                 value={state.value}
//                 onChange={(e) => handleChange(Number(e.target.value))}
//               />
//             </div>
//           )}
//         </form.Field>

//         {/* SAVE */}
//         <form.Subscribe selector={(s) => [s.canSubmit, s.isSubmitting]}>
//           {([canSubmit, isSubmitting]) => (
//             <button
//               disabled={!canSubmit || isSubmitting}
//               className="bg-black text-white px-4 py-2 rounded"
//             >
//               {isSubmitting ? "Enregistrement..." : "Enregistrer"}
//             </button>
//           )}
//         </form.Subscribe>
//       </form>
//     </div>
//   );
// }

// export default Page;


"use client";

import { getOneProductById, updateProduct } from "@/lib/action/admin.action";
import { generateFingerprint } from "@/utils/dbFunction";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "@tanstack/react-form";

function Page() {
  const params = useParams();
  const slug = params.slug as string;
  const id = Number(slug);

  const [loading, setLoading] = useState(true);
  const [isCoffret, setIsCoffret] = useState(false);

  const form = useForm({
    defaultValues: {
      description: [] as string[],
      images: [] as string[],

      meta: {
        name: "",
        intro: "",
        collection: "",
        content: [] as string[],
        stock: false,
        promo: 0,
        like: 0,
      },
    },

    onSubmit: async ({ value }) => {
      const fingerprint = generateFingerprint();
      const token = sessionStorage.getItem("admin-token");

      if (!token || !fingerprint) return;

      await updateProduct(token, fingerprint, id, value);
    },
  });


  useEffect(() => {
    const loadProduct = async () => {
      const fingerprint = generateFingerprint();
      const token = sessionStorage.getItem("admin-token");

      if (!token || !fingerprint || !id) return;

      try {
        const product = await getOneProductById(token, fingerprint, id);

        form.setFieldValue(
          "description",
          product.description || []
        );

        form.setFieldValue(
          "images",
          product.images || []
        );


        form.setFieldValue(
          "meta.name",
          product.meta?.name || ""
        );

        form.setFieldValue(
          "meta.intro",
          product.meta?.intro || ""
        );

        form.setFieldValue(
          "meta.collection",
          product.meta?.collection || ""
        );

        form.setFieldValue(
          "meta.content",
          product.meta?.content || []
        );

        form.setFieldValue(
          "meta.stock",
          product.meta?.stock || false
        );

        form.setFieldValue(
          "meta.promo",
          product.meta?.promo || 0
        );

        form.setFieldValue(
          "meta.like",
          product.meta?.like || 0
        );


        setIsCoffret(
          Boolean(
            product.meta?.content &&
            product.meta.content.length > 0
          )
        );


      } catch (e) {
        console.error("Error loading product", e);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);


  if (loading) {
    return <p className="p-10">Loading...</p>;
  }


  return (
    <div className="pt-24 px-6 max-w-3xl mx-auto">

      <h1 className="text-2xl font-bold mb-6">
        Edit Product
      </h1>


      <form
        className="space-y-6"
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >


        {/* NAME */}
        <form.Field name="meta.name">
          {({ state, handleChange }) => (
            <div>
              <label>Name</label>

              <input
                className="w-full border p-2 rounded"
                value={state.value}
                onChange={(e) =>
                  handleChange(e.target.value)
                }
              />
            </div>
          )}
        </form.Field>



        {/* INTRO */}
        <form.Field name="meta.intro">
          {({ state, handleChange }) => (
            <div>
              <label>Intro</label>

              <textarea
                className="w-full border p-2 rounded"
                value={state.value}
                onChange={(e) =>
                  handleChange(e.target.value)
                }
              />
            </div>
          )}
        </form.Field>



        {/* COLLECTION */}
        <form.Field name="meta.collection">
          {({ state, handleChange }) => (
            <div>
              <label>Collection</label>

              <input
                className="w-full border p-2 rounded"
                value={state.value}
                onChange={(e) =>
                  handleChange(e.target.value)
                }
              />
            </div>
          )}
        </form.Field>



        {/* COFFRET */}
        <div className="space-y-4">

          {!isCoffret ? (

            <button
              type="button"
              className="text-sm underline"
              onClick={() => {
                setIsCoffret(true);
                form.setFieldValue(
                  "meta.content",
                  [""]
                );
              }}
            >
              Est-ce un coffret ?
            </button>

          ) : (

            <form.Field
              name="meta.content"
              mode="array"
            >
              {(field) => (
                <div className="space-y-4">

                  <div className="flex justify-between items-center">

                    <h3 className="font-medium">
                      Ce coffret contient :
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


                  {field.state.value.map((_, index) => (

                    <div
                      key={index}
                      className="flex gap-2"
                    >

                      <form.Field
                        name={`meta.content[${index}]`}
                      >
                        {(subField) => (

                          <input
                            className="flex-1 border p-2 rounded"
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


                  <button
                    type="button"
                    className="text-sm underline"
                    onClick={() => {
                      setIsCoffret(false);

                      form.setFieldValue(
                        "meta.content",
                        []
                      );
                    }}
                  >
                    Retirer le coffret
                  </button>


                </div>
              )}
            </form.Field>

          )}

        </div>



        {/* STOCK */}
        <form.Field name="meta.stock">
          {({ state, handleChange }) => (
            <div className="flex items-center gap-2">

              <label>
                Stock
              </label>

              <input
                type="checkbox"
                checked={state.value}
                onChange={(e) =>
                  handleChange(
                    e.target.checked
                  )
                }
              />

            </div>
          )}
        </form.Field>



        {/* PROMO */}
        <form.Field name="meta.promo">
          {({ state, handleChange }) => (
            <div>

              <label>
                Promo
              </label>

              <input
                type="number"
                className="w-full border p-2 rounded"
                value={state.value}
                onChange={(e) =>
                  handleChange(
                    Number(e.target.value)
                  )
                }
              />

            </div>
          )}
        </form.Field>



        {/* SAVE */}
        <form.Subscribe
          selector={(s) => [
            s.canSubmit,
            s.isSubmitting
          ]}
        >
          {([canSubmit, isSubmitting]) => (

            <button
              disabled={
                !canSubmit ||
                isSubmitting
              }
              className="bg-black text-white px-4 py-2 rounded"
            >
              {
                isSubmitting
                  ? "Enregistrement..."
                  : "Enregistrer"
              }
            </button>

          )}
        </form.Subscribe>


      </form>

    </div>
  );
}

export default Page;