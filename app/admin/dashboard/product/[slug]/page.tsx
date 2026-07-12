"use client";

import { createVariant, getOneProductById, updateProduct, updateVariant, uploadProductImage } from "@/lib/action/admin.action";
import { generateFingerprint } from "@/utils/dbFunction";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";

export type Variant = {
	id: number;
	name: string;
	weight: number;
	duration: number;
	price: number;
	productId?: number;
};

function Page() {
	const params = useParams();
	const slug = params.slug as string;
	const id = Number(slug);

	const [loading, setLoading] = useState(true);
	const [isCoffret, setIsCoffret] = useState(false);
	const [tab, setTab] = useState<"product" | "variant" | "tag" | "" | "image">("");
	const [product, setProduct] = useState<any>(null);
	const [variants, setVariants] = useState<Variant[]>([]);
	const fileInputRef = useRef<HTMLInputElement>(null);
	const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

const handleFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>
	) => {

		const file = e.target.files?.[0];

		console.log("📸 File selected", {
			file,
			name: file?.name,
			size: file?.size,
			type: file?.type,
			selectedImageIndex
		});


		if (!file || selectedImageIndex === null) {
			console.log("❌ Missing file or image index");
			return;
		}


		const fingerprint = generateFingerprint();
		const token = sessionStorage.getItem("admin-token");


		if (!token || !fingerprint) {
			console.log("❌ Missing auth data");
			return;
		}


		console.log("⬆️ Starting image upload");


		const result = await uploadProductImage(
			token,
			fingerprint,
			product.id,
			file
		);


		console.log("📥 Upload result", result);


		const url = result?.url;


		console.log("🔗 Image URL received", url);


		if (!url) {
			console.error("❌ No URL returned from upload");

			toast.error(
				"Une erreur est survenue pendant l'upload"
			);

			return;
		}


		const images = Array.from(
			{ length: 5 },
			(_, index) => product.images?.[index] || null
		);


		images[selectedImageIndex] = url;


		const cleanImages = images.filter(Boolean);


		console.log("🖼️ New images list", {
			images,
			cleanImages
		});


		console.log("💾 Updating product images");


		await updateProduct(
			token,
			fingerprint,
			id,
			{
				images: cleanImages
			}
		);


		console.log("✅ Product updated");


		setProduct((prev: any) => ({
			...prev,
			images: cleanImages
		}));


		toast.success(
			"Image uploadée correctement"
		);
	};

	const formProduct = useForm({
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

	const formVariant = useForm({
		defaultValues: {
			id: undefined as number | undefined,
			name: "",
			weight: 0,
			duration: 0,
			price: 0,
		},

		onSubmit: async ({ value }) => {
			const fingerprint = generateFingerprint();
			const token = sessionStorage.getItem("admin-token");

			if (!token || !fingerprint) return;


			let savedVariant: Variant;


			if (value.id) {
				savedVariant = await updateVariant(
					token,
					fingerprint,
					value.id,
					value
				);


				setVariants((prev) =>
					prev.map((variant) =>
						variant.id === savedVariant.id
							? savedVariant
							: variant
					)
				);

			} else {

				savedVariant = await createVariant(
					token,
					fingerprint,
					id,
					value
				);


				setVariants((prev) => [
					...prev,
					savedVariant
				]);
			}
		},
	});


	useEffect(() => {
		const loadProduct = async () => {
		const fingerprint = generateFingerprint();
		const token = sessionStorage.getItem("admin-token");

		if (!token || !fingerprint || !id) return;

		try {
			const product = await getOneProductById(token, fingerprint, id);

			setProduct(product);
			setVariants(product.variants || []);

			formProduct.setFieldValue(
			"description",
			product.description || []
			);

			formProduct.setFieldValue(
			"images",
			product.images || []
			);


			formProduct.setFieldValue(
			"meta.name",
			product.meta?.name || ""
			);

			formProduct.setFieldValue(
			"meta.intro",
			product.meta?.intro || ""
			);

			formProduct.setFieldValue(
			"meta.collection",
			product.meta?.collection || ""
			);

			formProduct.setFieldValue(
			"meta.content",
			product.meta?.content || []
			);

			formProduct.setFieldValue(
			"meta.stock",
			product.meta?.stock || false
			);

			formProduct.setFieldValue(
			"meta.promo",
			product.meta?.promo || 0
			);

			formProduct.setFieldValue(
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
				Edition du produit: {product.name}
			</h1>

			<div className="flex items-center justify-center">
				<button 
					className="p-2 rounded-2xl bg-green-300/50 font-bold"
					onClick={() => setTab("product")}
				>Editer le produit</button>
				<button 
					className="p-2 rounded-2xl bg-green-300/50 font-bold"
					onClick={() => setTab("variant")}
				>Editer les variants</button>
				<button 
					className="p-2 rounded-2xl bg-green-300/50 font-bold"
					onClick={() => setTab("tag")}
				>Editer les tags</button>
				<button 
					className="p-2 rounded-2xl bg-green-300/50 font-bold"
					onClick={() => setTab("image")}
				>Editer les images</button>
			</div>

			{tab === "product" && (
				<form
					className="space-y-6"
					onSubmit={(e) => {
					e.preventDefault();
					formProduct.handleSubmit();
					}}
				>


					{/* NAME */}
					<formProduct.Field name="meta.name">
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
					</formProduct.Field>



					{/* INTRO */}
					<formProduct.Field name="meta.intro">
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
					</formProduct.Field>



					{/* COLLECTION */}
					<formProduct.Field name="meta.collection">
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
					</formProduct.Field>



					{/* COFFRET */}
					<div className="space-y-4">

					{!isCoffret ? (

						<button
						type="button"
						className="text-sm underline"
						onClick={() => {
							setIsCoffret(true);
							formProduct.setFieldValue(
							"meta.content",
							[""]
							);
						}}
						>
						Est-ce un coffret ?
						</button>

					) : (

						<formProduct.Field
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

								<formProduct.Field
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

								</formProduct.Field>


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

								formProduct.setFieldValue(
									"meta.content",
									[]
								);
								}}
							>
								Retirer le coffret
							</button>


							</div>
						)}
						</formProduct.Field>

					)}

					</div>



					{/* STOCK */}
					<formProduct.Field name="meta.stock">
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
					</formProduct.Field>



					{/* PROMO */}
					<formProduct.Field name="meta.promo">
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
					</formProduct.Field>



					{/* SAVE */}
					<formProduct.Subscribe
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
					</formProduct.Subscribe>


				</form>
			)}

			{tab === "variant" && (
				<div className="space-y-8">

					{/* Header */}
					<div className="flex items-center justify-between">
						<div>
							<h2 className="text-xl font-bold">
								Variants
							</h2>

							<p className="text-sm text-gray-500">
								Gère les déclinaisons du produit.
							</p>
						</div>

						<button
							type="button"
							className="
								rounded-xl
								bg-green-500
								px-4
								py-2
								font-semibold
								text-white
							"
							onClick={() => {
								formVariant.setFieldValue("id", undefined);
								formVariant.setFieldValue("name", "");
								formVariant.setFieldValue("weight", 0);
								formVariant.setFieldValue("duration", 0);
								formVariant.setFieldValue("price", 0);
							}}
						>
							+ Ajouter un variant
						</button>
					</div>


					{/* Liste des variants existants */}
					<div className="grid gap-4 md:grid-cols-2">

						{variants.map((variant) => (
							<div
								key={variant.id}
								className="
									rounded-xl
									border
									p-4
									space-y-3
									shadow-sm
								"
							>

								<div className="flex justify-between">
									<h3 className="font-bold">
										{variant.name}
									</h3>

									<span className="font-semibold">
										{variant.price} €
									</span>
								</div>


								<p className="text-sm text-gray-500">
									{variant.weight}g • {variant.duration} heures
								</p>


								<button
									type="button"
									className="
										w-full
										rounded-lg
										border
										py-2
										hover:bg-gray-100
									"
									onClick={() => {

										formVariant.setFieldValue(
											"id",
											variant.id
										);

										formVariant.setFieldValue(
											"name",
											variant.name
										);

										formVariant.setFieldValue(
											"weight",
											variant.weight
										);

										formVariant.setFieldValue(
											"duration",
											variant.duration
										);

										formVariant.setFieldValue(
											"price",
											variant.price
										);
									}}
								>
									Modifier
								</button>

							</div>
						))}

					</div>


					{/* Formulaire */}
					<div
						className="
							rounded-xl
							border
							bg-gray-50
							p-6
							space-y-5
						"
					>

						<h3 className="font-bold">
							{formVariant.state.values.id
								? "Modifier le variant"
								: "Créer un variant"
							}
						</h3>


						<div className="grid gap-4 md:grid-cols-2">


							<formVariant.Field name="name">
								{(field) => (
									<div>
										<label className="text-sm">
											Nom
										</label>

										<input
											className="
												mt-1
												w-full
												rounded-lg
												border
												p-2
											"
											value={field.state.value}
											onChange={(e) =>
												field.handleChange(e.target.value)
											}
										/>
									</div>
								)}
							</formVariant.Field>



							<formVariant.Field name="price">
								{(field) => (
									<div>
										<label className="text-sm">
											Prix (€)
										</label>

										<input
											type="number"
											className="
												mt-1
												w-full
												rounded-lg
												border
												p-2
											"
											value={field.state.value}
											onChange={(e) =>
												field.handleChange(
													Number(e.target.value)
												)
											}
										/>
									</div>
								)}
							</formVariant.Field>



							<formVariant.Field name="weight">
								{(field) => (
									<div>
										<label className="text-sm">
											Poids (g)
										</label>

										<input
											type="number"
											className="
												mt-1
												w-full
												rounded-lg
												border
												p-2
											"
											value={field.state.value}
											onChange={(e) =>
												field.handleChange(
													Number(e.target.value)
												)
											}
										/>
									</div>
								)}
							</formVariant.Field>



							<formVariant.Field name="duration">
								{(field) => (
									<div>
										<label className="text-sm">
											Durée (heures)
										</label>

										<input
											type="number"
											className="
												mt-1
												w-full
												rounded-lg
												border
												p-2
											"
											value={field.state.value}
											onChange={(e) =>
												field.handleChange(
													Number(e.target.value)
												)
											}
										/>
									</div>
								)}
							</formVariant.Field>

						</div>



						<button
							type="button"
							className="
								w-full
								rounded-xl
								bg-black
								py-3
								font-bold
								text-white
							"
							onClick={() => {
								formVariant.handleSubmit();
							}}
						>
							Enregistrer
						</button>

					</div>

				</div>
			)}

			{tab === "image" && (
				<div>

					<input
					ref={fileInputRef}
					type="file"
					accept="image/*"
					className="hidden"
					onChange={handleFileChange}
					/>


					<div className="grid grid-cols-5 gap-4">

					{Array.from({ length: 5 }).map((_, index) => {

						const image = product.images?.[index];

						return (
						<div
							key={index}
							className="
							aspect-square
							rounded-3xl
							overflow-hidden
							bg-gray-200
							cursor-pointer
							relative
							"
							onClick={() => {
							setSelectedImageIndex(index);
							fileInputRef.current?.click();
							}}
						>

							{image ? (

							<img
								src={image}
								alt={`Image ${index + 1}`}
								className="w-full h-full object-cover"
							/>

							) : (

							<div className="
								w-full
								h-full
								flex
								items-center
								justify-center
								text-gray-400
								text-3xl
							">
								+
							</div>

							)}

						</div>
						);
					})}

					</div>

				</div>
				)}
		</div>
	);
}

export default Page;