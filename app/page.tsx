
import Collections from "@/components/layout/landing/Collections";
import CoffretDecouverte from "@/components/layout/landing/Decouverte";
import Event from "@/components/layout/landing/Event";
import EventStory from "@/components/layout/landing/EventStory";
import Faq from "@/components/layout/landing/Faq";
import LumiLayaStory from "@/components/layout/landing/LumilayaStory";
import BestComponent from "@/components/layout/landing/NewBestProducts";
import NewHero from "@/components/layout/landing/NewHero";
import ScrollPopupTrigger from "@/components/layout/landing/PopUpPromo";
import Reviews from "@/components/layout/landing/Reviews";
import { prisma } from "@/lib/prisma/prisma";

export const dynamic = 'force-dynamic';

export default async function Home() {

	const productPromo = await prisma.product.findFirst({
        where: { meta: { slug: "bougie-instant-ete" } },
        select: { images: true }
    });

    // Fallback sur une image par défaut si jamais le produit n'est pas trouvé
    const productImageUrl = productPromo?.images[0];

    return (
		<>
			<ScrollPopupTrigger productUrl={productImageUrl} />
			<NewHero />
			<CoffretDecouverte />
			{/* <Quality /> */}
			<LumiLayaStory />
			<Collections />
			<BestComponent />
			<EventStory />
			<Event />
			{/* <BestProducts /> */}
			<Reviews />
			<Faq />
		</>
    );
}
