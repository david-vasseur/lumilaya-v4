import Hero_page from '@/components/features/other/Hero_page';
import CoffretsIntro from '@/components/ui/CoffretIntro';
import CoffretsFuture from '@/components/ui/CoffretSuggestion';
import Title from '@/components/ui/Title';
import Link from 'next/link';

function page() {

    const coffrets = [
        {
            title: "Coffret Découverte",
            description: "Une sélection de nos bougies emblématiques pour découvrir l'univers Lumi'laya.",
            image: "/images/landing/coffret.webp",
            href: "/coffrets/decouverte"
        },
        {
            title: "Coffret Rituel Protection",
            description: "Un coffret pensé pour accompagner vos moments de recentrage et de bien-être.",
            image: "/images/landing/coffret_rit1.webp",
            href: "/coffrets/rituel"
        },
    ];

    return (
        <div className="min-h-screen bg-[#FDFBF7]">
            <Hero_page />
            <CoffretsIntro />
            <Title id='noscoffrets' title='Nos coffrets' />

            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
                
                {coffrets.map((item, i) => (
                    <Link
                    key={i}
                    href={item.href}
                    className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
                    >
                    {/* IMAGE */}
                    <div className="aspect-square overflow-hidden">
                        <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                    </div>

                    {/* CONTENT */}
                    <div className="p-4 flex flex-col gap-2">
                        <h3 className="text-sm md:text-base font-medium text-[#2C2C2C]">
                        {item.title}
                        </h3>
                        <p className="text-xs md:text-sm text-[#2C2C2C]/70 line-clamp-2">
                        {item.description}
                        </p>

                        <span className="text-xs text-[#5A7B6E] mt-2 group-hover:translate-x-1 transition-transform">
                        Découvrir →
                        </span>
                    </div>
                    </Link>
                ))}

                </div>
            </div>
            <CoffretsFuture />
        </div>
    )
}

export default page;