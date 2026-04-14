import BestProducts from "@/components/layout/landing/BestProducts";
import Collections from "@/components/layout/landing/Collections";
import Event from "@/components/layout/landing/Event";
import Faq from "@/components/layout/landing/Faq";
import Hero from "@/components/layout/landing/Hero";
import Quality from "@/components/layout/landing/Quality";
import Reviews from "@/components/layout/landing/Reviews";

export const dynamic = "force-static";

export default function Home() {
    return (
		<>
			<Hero />
			<Quality />
			{/* <Collections /> */}
			<Event />
			{/* <BestProducts />
			<Reviews />
			<Faq /> */}
		</>
    );
}
