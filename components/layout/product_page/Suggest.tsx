import Best from '@/components/features/other/Best';

export interface ISuggProduct {
    id: number,
    collection: string,
    name: string,
    slug: string,
    image: string,
    variants: IBestSuggVariant[]
}

export interface IBestSuggVariant {
    id: number,
    name: string,
    duration: string,
    price: number
}

function Suggest({ suggestedProducts }: { suggestedProducts: ISuggProduct[] }) {
    return (
        <div>
          <h2 className="text-3xl font-light text-[#2C2C2C] mb-12 text-center">
            Vous aimerez aussi
          </h2>
            <Best products={suggestedProducts} />
        </div>
    )
}

export default Suggest;