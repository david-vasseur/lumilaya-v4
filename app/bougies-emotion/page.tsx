import Hero from '@/components/layout/product_page/Hero';
import Interlude from '@/components/layout/product_page/Interlude';

function page() {
    return (
        <div className="min-h-screen bg-[#FDFBF7]">
            <Hero image={"/images/landing/emotion_collection.webp"} url={"bougies-emotion"} title={"Emotions <br/>& <br/>Plaisirs"} />
            <Interlude />
        </div>
    )
}

export default page;