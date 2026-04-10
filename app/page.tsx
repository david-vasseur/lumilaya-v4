import BestProducts from "@/components/layout/landing/BestProducts";
import Collections from "@/components/layout/landing/Collections";
import CoffretDecouverte from "@/components/layout/landing/Decouverte";
import Event from "@/components/layout/landing/Event";
import Faq from "@/components/layout/landing/Faq";
import Hero from "@/components/layout/landing/Hero";
import Quality from "@/components/layout/landing/Quality";
import Reviews from "@/components/layout/landing/Reviews";

export const revalidate = 21600;

export default async function Home() {
    return (
		<>
			<Hero />
			<CoffretDecouverte />
			<Quality />
			<Collections />
			<Event />
			<BestProducts />
			<Reviews />
			<Faq />
		</>
    );
}
