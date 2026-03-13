import Hero from "@/components/layout/landing/Hero";
import Quality from "@/components/layout/landing/Quality";

export const revalidate = 21600;

export default async function Home() {
    return (
		<>
			<Hero />
			<Quality />
		</>
    );
}
