import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export interface ICollectionCard {
    href: string;
    imageUrl: string;
    title: string;
    resume: string;
}

function CollectionCard({
    href,
    imageUrl,
    title,
    resume,
}: ICollectionCard) {
    return (
        <Link
            href={href}
            className="group relative block aspect-4/5 overflow-hidden rounded-4xl bg-[#E8E2D8]"
        >
            {/* IMAGE */}
            <img
                src={imageUrl}
                alt={`Image de la collection ${title}`}
                className="
                    absolute inset-0
                    h-full w-full
                    object-cover
                    transition-transform
                    duration-1000
                    ease-[cubic-bezier(0.22,1,0.36,1)]
                    group-hover:scale-105
                "
            />

            {/* OVERLAY */}
            <div
                className="
                    absolute inset-0
                    bg-linear-to-t
                    from-black/55
                    via-black/5
                    to-transparent
                "
            />

            {/* NUMÉRO */}
            <span
                className="
                    absolute left-8 top-8
                    text-xs uppercase
                    tracking-[0.35em]
                    text-[#6F9083]
                "
            >
                Collection
            </span>

            {/* CONTENT */}
            <div
                className="
                    absolute inset-x-6 bottom-6
                    rounded-3xl
                    border border-white/20
                    bg-white/10
                    p-6
                    text-white
                    backdrop-blur-md
                    transition-all
                    duration-700
                    group-hover:bg-white/15
                "
            >
                <h3
                    className="
                        font-ballet
                        font-semibold
                        text-4xl
                        leading-none
                        text-[#6F9083]
                        md:text-5xl
                    "
                >
                    {title}
                </h3>

                <p
                    className="
                        mt-4
                        max-w-md
                        text-sm
                        leading-relaxed
                        text-white/75
                        md:text-base
                    "
                >
                    {resume}
                </p>

                <div
                    className="
                        mt-6
                        flex
                        items-center
                        justify-between
                        border-t
                        border-white/20
                        pt-4
                        text-xs
                        uppercase
                        tracking-[0.25em]
                    "
                >
                    <span>
                        Découvrir
                    </span>

                    <span
                        className="
                            flex
                            h-10
                            w-10
                            items-center
                            justify-center
                            rounded-full
                            border
                            border-white/30
                            transition-transform
                            duration-500
                            group-hover:rotate-45
                        "
                    >
                        <ArrowUpRight className="h-4 w-4" />
                    </span>
                </div>
            </div>
        </Link>
    );
}

export default CollectionCard;