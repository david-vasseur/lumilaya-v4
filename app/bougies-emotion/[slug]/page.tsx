import ProductCar from '@/components/features/product/ProductCar';
import ProductConseil from '@/components/features/product/ProductConseil';
import Principal from '@/components/layout/product_page/Principal';
import Suggest from '@/components/layout/product_page/Suggest';
import { getOneProductBySlug, getSuggestedProduct } from '@/lib/action/product.action';
import { getReviewById } from '@/lib/action/review.action';

interface Props {
    params: { slug: string };
}

export const dynamic = "force-dynamic";

async function page({ params }: Props) {

    const { slug } = await params;

    const product = await getOneProductBySlug(slug);

    if (!product) return;

    const suggestedProducts = await getSuggestedProduct(product.id);

    const reviews = await getReviewById(product.id);

    return (
        <div className="min-h-screen bg-[#FDFBF7] pt-24 pb-20 max-w-7xl mx-auto px-6">
            <Principal product={product} reviews={reviews} />
            <ProductCar />
            <ProductConseil />
            <Suggest suggestedProducts={suggestedProducts} />
        </div>
        
    )
}

export default page;