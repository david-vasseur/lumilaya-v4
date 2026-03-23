import ProductCar from '@/components/features/product/ProductCar';
import ProductConseil from '@/components/features/product/ProductConseil';
import Principal from '@/components/layout/product_page/Principal';
import { getOneProductBySlug } from '@/lib/action/product.action';

interface Props {
    params: { slug: string };
}

export const dynamic = "force-dynamic";

async function page({ params }: Props) {

    const { slug } = await params;

    // const product = products.find((product) => product.meta.slug === slug)!
    const product = await getOneProductBySlug(slug);
    console.log(product);
    
    if (!product) return

    return (
        <div className="min-h-screen bg-[#FDFBF7] pt-24 pb-20 max-w-7xl mx-auto px-6">
            <Principal product={product} />
            <ProductCar />
            <ProductConseil />
        </div>
        
    )
}

export default page;