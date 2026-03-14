import BestProducts from "@/components/layout/landing/BestProducts";
import Collections from "@/components/layout/landing/Collections";
import Hero from "@/components/layout/landing/Hero";
import Quality from "@/components/layout/landing/Quality";

export const revalidate = 21600;

export default async function Home() {
    return (
		<>
			<Hero />
			<Quality />
			<Collections />
			<BestProducts />
		</>
    );
}
