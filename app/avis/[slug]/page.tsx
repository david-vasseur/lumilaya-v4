import ProductReviewCard from '@/components/ui/ProductReviewCard';
import { getIdProductBySlug } from '@/lib/action/product.action';
import { getReviewById } from '@/lib/action/review.action';

interface Props {
    params: { slug: string };
}

export interface IReviewBDD {

    productId: number,
    id: number,
    name: string,
    comment: string,
    note: number,
    createdAt: Date

}

async function page({ params }: Props) {

    const { slug } = await params;
    const product = await getIdProductBySlug(slug);
    if (!product || !product.id) return null;

    const reviews = await getReviewById(product.id);

    return (
        <div className="max-w-5xl min-h-svh pt-16 mx-auto p-6">
            <h1 className="text-3xl font-semibold mb-6">Avis pour la bougie {product.name}</h1>

            {/* Liste des avis */}
            <div className="mt-8 space-y-6">
                {reviews.length === 0 && (
                <p className="text-gray-500">Aucun avis pour ce produit pour l’instant.</p>
                )}

                {reviews.map((review) => (
                <ProductReviewCard {...review} />
                ))}
            </div>
        </div>
    )
}

export default page;