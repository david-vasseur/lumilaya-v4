import Hero from '@/components/layout/landing/product_page/Hero';

function page() {
    return (
        <div className="min-h-screen bg-[#FDFBF7]">
            <Hero image={"/images/landing/rituel_collection.webp"} url={"bougies-rituel"} title={"Entre Terre <br/>& <br/>Ciel"} />
        </div>
    )
}

export default page;