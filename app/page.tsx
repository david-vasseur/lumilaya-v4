
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

export const dynamic = "force-static";

export default function Home() {
    return (
		<>
			<ScrollPopupTrigger />
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
