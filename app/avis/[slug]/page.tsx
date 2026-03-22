interface Props {
    params: { slug: string };
}

async function page({ params }: Props) {

    const { slug } = await params;
    // const result = await GetItemBySlug(slug); #TODO
    // if (!result || !result.product) return null;

    // const { product } = result;

    // const reviews = await getReviewsByProduct(product.id);

    return (
        <div className="max-w-5xl min-h-svh pt-16 mx-auto p-6">
            {/* <h1 className="text-3xl font-semibold mb-6">Avis pour la bougie {product.name}</h1> */}

            {/* Liste des avis */}
            {/* <div className="mt-8 space-y-6">
                {reviews.length === 0 && (
                <p className="text-gray-500">Aucun avis pour ce produit pour l’instant.</p>
                )}

                {reviews.map((review) => (
                <div key={review.id} className="p-4 border rounded-lg shadow-sm bg-white">
                    <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">{review.name}</span>
                        <span className="text-yellow-500">{review.note.toFixed(1)} ⭐</span>
                    </div>
                    <p className="text-gray-700">{review.comment}</p>
                    <span className="text-gray-400 text-sm">
                    {new Date(review.createdAt).toLocaleDateString()}
                    </span>
                </div>
                ))}
            </div> */}
        </div>
    )
}

export default page;