import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

export interface ICollectionCard {
    href: string,
    imageUrl: string,
    title: string,
    resume: string,
}

function CollectionCard({ href, imageUrl, title, resume }: ICollectionCard) {
    return (
        <Link
            href={href}
            className="category-card group w-full aspect-square relative rounded-lg overflow-hidden shadow-xl"
            >
                <img
                    src={imageUrl}
                    alt={`image de la ${title}`}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
            <div className="absolute inset-0 bg-[#2C2C2C]/40 group-hover:bg-[#2C2C2C]/10 transition-colors duration-500" />
            <div className="relative h-full flex flex-col items-center justify-evenly p-2 text-[#FDFBF7]">
                <div className="p-1 backdrop-blur-[2px] rounded-2xl">
                    <h3 className="text-3xl font-base mb-4 tracking-wider text-[#44524c]">{title}</h3>
                </div>                
                <p className="text-center opacity-90 max-w-sm">{resume}</p>
                <span className="mt-8 flex items-center gap-2 text-sm tracking-wide opacity-80 group-hover:opacity-100 group-hover:gap-3 transition-all">
                    Explorer <ChevronRight className="w-4 h-4" />
                </span>
            </div>
        </Link>
    )
}

export default CollectionCard;