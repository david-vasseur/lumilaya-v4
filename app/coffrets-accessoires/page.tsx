
import CoffretHero, { HeroSlide } from '@/components/layout/product_list_page/CoffretHero';
import CoffretsIntro from '@/components/ui/CoffretIntro';
import CoffretsFuture from '@/components/ui/CoffretSuggestion';
import Title from '@/components/ui/Title';
import { getProductsByCollection } from '@/lib/action/product.action';
import { getImageUrl } from '@/utils/image';
import Link from 'next/link';

export const dynamic = "force-dynamic";

async function Page() {
    const items = await getProductsByCollection(["Coffret", "Autre"]);

    const slides: HeroSlide[] =
    items.length > 0
        ? items.map((coffret) => ({
              id: coffret.slug,
              title: coffret.name.replace(" ", "<br />"),
              subtitle: coffret.intro,
              ctaLabel: coffret.slug.includes("decouverte")
                  ? "Composer votre coffret"
                  : "Découvrir le coffret",
              ctaHref: `/coffrets-accessoires/${coffret.slug}`,
              images: [
                  coffret.image
                      ? getImageUrl(coffret.image)
                      : "/images/landing/coffret.webp",
              ],
          }))
        : [
              {
                  id: "fallback",
                  title: "Nos Coffrets<br />& Rituels",
                  subtitle:
                      "Des créations artisanales pensées pour offrir ou prolonger l'expérience Lumi'laya.",
                  ctaLabel: "Découvrir la sélection",
                  ctaHref: "#noscoffrets",
                  images: ["/images/landing/coffret.webp"],
              },
          ];


    return (
        <div className="min-h-screen bg-[#FDFBF7]">
            <CoffretHero slides={slides} />
            <CoffretsIntro />
            <Title id="noscoffrets" title="Nos coffrets & Accessoires" />

            <div className="max-w-7xl mx-auto px-6 py-12">
                {items.length === 0 ? (
                    <p className="text-center text-[#2C2C2C]/60 py-10">
                        Aucune création disponible pour le moment.
                    </p>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
                        {items.map((item) => (
                            <Link
                                key={item.slug}
                                href={`/coffrets-accessoires/${item.slug}`}
                                className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                            >
                                <div>
                                    {/* IMAGE */}
                                    <div className="aspect-square overflow-hidden relative bg-[#F5F2EB]">
                                        <img
                                            src={
                                                item.image
                                                    ? getImageUrl(item.image)
                                                    : "/images/landing/coffret.webp"
                                            }
                                            alt={item.name}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />

                                        {/* Badge catégorie */}
                                        <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[11px] font-medium bg-white/90 text-[#2C2C2C] backdrop-blur-xs shadow-2xs">
                                            {item.collection === "Coffret" ? "Coffret" : "Accessoire"}
                                        </span>

                                        {/* Badge Promo si > 0 */}
                                        {item.promo && item.promo > 0 && (
                                            <span className="absolute top-3 right-3 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-[#7A9B8E] text-white">
                                                -{item.promo}%
                                            </span>
                                        )}
                                    </div>

                                    {/* CONTENT */}
                                    <div className="p-4 flex flex-col gap-2">
                                        <h3 className="text-sm md:text-base font-medium text-[#2C2C2C]">
                                            {item.name}
                                        </h3>
                                        <p className="text-xs md:text-sm text-[#2C2C2C]/70 line-clamp-2">
                                            {item.intro}
                                        </p>
                                    </div>
                                </div>

                                <div className="px-4 pb-4 pt-1 flex items-center justify-between">
                                    {item.price > 0 ? (
                                        <span className="text-sm font-semibold text-[#2C2C2C]">
                                            {item.price.toFixed(2)} €
                                        </span>
                                    ) : (
                                        <span />
                                    )}

                                    <span className="text-xs text-[#5A7B6E] font-medium group-hover:translate-x-1 transition-transform">
                                        Découvrir →
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>

            <CoffretsFuture />
        </div>
    );
}

export default Page;
