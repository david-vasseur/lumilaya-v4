import Hero from '@/components/layout/landing/product_page/Hero';

function page() {
    return (
        <div className="min-h-screen bg-[#FDFBF7]">
            <Hero image={"/images/landing/emotion_collection.webp"} url={"bougies-emotion"} title={"Emotions <br/>& <br/>Plaisirs"} />
        </div>
    )
}

export default page;