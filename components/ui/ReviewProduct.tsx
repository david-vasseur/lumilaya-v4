import { Star } from 'lucide-react';
import Link from 'next/link';

type Props = { 
    productId: number; 
    productName: string; 
    productSlug: string; 
    averageRating: number; 
    reviewCount: number; 
};

function ReviewProduct({ productId, productSlug, productName, averageRating, reviewCount }: Props) {

    // const { openModal } = useModalStore();  #TODO
    const fullStars = Math.floor(averageRating);

    return (
        <div className="flex items-center gap-4 mb-6">
            <Link href={`/avis/${encodeURIComponent(productSlug)}`} className="flex items-center gap-1 text-[#2C2C2C] hover:underline">
                {[...Array(5)].map((_, i) => (
                <Star key={i} className={`w-5 h-5 ${i < fullStars ? "fill-[#7A9B8E] text-[#7A9B8E]" : "fill-[#E5E5E5] text-[#E5E5E5]"}`} />
                ))}
                <span className="ml-2 text-[#2C2C2C]/60">({reviewCount} avis)</span>
            </Link>
            {/* #TODO
            <div onClick={() => openModal(<ReviewForm productId={productId} productName={productName} />)} className="text-[#7A9B8E] cursor-pointer underline">
                Laisser un avis
            </div> */} 
            <div className="text-[#7A9B8E] cursor-pointer underline">
                Laisser un avis
            </div>
        </div>
    )
}

export default ReviewProduct