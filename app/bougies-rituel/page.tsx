import Final from '@/components/layout/product_page/Final';
import Hero from '@/components/layout/product_page/Hero';
import Interlude from '@/components/layout/product_page/Interlude';

function page() {
    return (
        <div className="min-h-screen bg-[#FDFBF7]">
            <Hero image={"/images/landing/rituel_collection.webp"} url={"bougies-rituel"} title={"Entre Terre <br/>& <br/>Ciel"} />
            <Interlude />
            <Final />
        </div>
    )
}

export default page;