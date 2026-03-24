import ProductCar from '@/components/features/product/ProductCar';
import ProductConseil from '@/components/features/product/ProductConseil';
import Principal from '@/components/layout/product_page/Principal';
import Suggest from '@/components/layout/product_page/Suggest';
import { getOneProductBySlug, getSuggestedProduct } from '@/lib/action/product.action';

interface Props {
    params: { slug: string };
}

export const dynamic = "force-dynamic";

async function page({ params }: Props) {

    const { slug } = await params;

    // const product = products.find((product) => product.meta.slug === slug)!
    const product = await getOneProductBySlug(slug);
    
    if (!product) return;

    const suggestedProducts = await getSuggestedProduct(product.id);
    
    console.log(suggestedProducts);

    return (
        <div className="min-h-screen bg-[#FDFBF7] pt-24 pb-20 max-w-7xl mx-auto px-6">
            <Principal product={product} />
            <ProductCar />
            <ProductConseil />
            <Suggest suggestedProducts={suggestedProducts} />
        </div>
        
    )
}

export default page;