import { 
    MapPin, 
    Phone, 
    Mail, 
    Clock, 
    Send, 
    MessageCircle,
    Instagram,
    Facebook,
    Youtube,
    Sparkles
} from 'lucide-react';

// Interface pour le formulaire de contact
interface ContactForm {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
}



const ContactPage = async () => {
    
    // const thumb = await getTikTokThumbnail("https://vm.tiktok.com/ZNRY8RgLC/");



    const socialPosts = [
        {
            id: 1,
            platform: "tiktok",
            url: "https://vm.tiktok.com/ZNRY8RgLC/",
            thumbnail: "https://p16-sign.tiktokcdn.com/..."
        },
        {
            id: 2,
            platform: "tiktok",
            url: "https://vm.tiktok.com/ZNRY8RgLC/",
            thumbnail: "https://p16-sign.tiktokcdn.com/..."
        },
        {
            id: 3,
            platform: "tiktok",
            url: "https://vm.tiktok.com/ZNRY8RgLC/",
            thumbnail: "https://p16-sign.tiktokcdn.com/..."
        },
        {
            id: 4,
            platform: "tiktok",
            url: "https://vm.tiktok.com/ZNRY8RgLC/",
            thumbnail: "https://p16-sign.tiktokcdn.com/..."
        }
    ];

    return (
        <div className="min-h-screen bg-[#FDFBF7]">
            {/* Hero Section */}
            <div className="relative h-[50vh] overflow-hidden">
                <img 
                    src={"/images/landing/hero.webp"} 
                    alt="image de fond" 
                    className="absolute inset-0 h-full object-cover" />

                <div className="contact-hero relative h-full flex items-center justify-center text-center px-6">
                    <div>
                        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white px-5 py-2 rounded-full mb-6">
                            <MessageCircle className="w-4 h-4" />
                            <span className="text-sm font-medium">Nous contacter</span>
                        </div>
                        <h1 className="text-5xl md:text-6xl font-light text-white mb-4">
                            Parlons ensemble
                        </h1>
                        <p className="text-xl text-white/90 max-w-2xl mx-auto">
                            Une question ? Un projet ? Notre équipe est là pour vous répondre
                        </p>
                    </div>
                </div>
            </div>

            {/* Informations de contact */}
            <div className="contact-info-section max-w-7xl mx-auto px-6 -mt-20 relative z-10 mb-20">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="contact-info-card bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all">
                        <div className="w-14 h-14 bg-[#7A9B8E]/10 rounded-full flex items-center justify-center mb-6">
                            <Phone className="w-7 h-7 text-[#7A9B8E]" />
                        </div>
                        <h3 className="text-lg font-medium text-[#2C2C2C] mb-2">Téléphone</h3>
                        <a href="tel:+33123456789" className="text-[#2C2C2C]/60 hover:text-[#7A9B8E] transition-colors block mb-2">
                            +33 6 18 65 95 10
                        </a>
                    </div>

                    <div className="contact-info-card bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all">
                        <div className="w-14 h-14 bg-[#7A9B8E]/10 rounded-full flex items-center justify-center mb-6">
                            <Mail className="w-7 h-7 text-[#7A9B8E]" />
                        </div>
                        <h3 className="text-lg font-medium text-[#2C2C2C] mb-2">Email</h3>
                        <a href="mailto:contact@lumilaya.fr" className="text-[#2C2C2C]/60 hover:text-[#7A9B8E] transition-colors block mb-2">
                            contact@lumilaya.fr
                        </a>
                    </div>

                    <div className="contact-info-card bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all">
                        <div className="w-14 h-14 bg-[#7A9B8E]/10 rounded-full flex items-center justify-center mb-6">
                            <Clock className="w-7 h-7 text-[#7A9B8E]" />
                        </div>
                        <h3 className="text-lg font-medium text-[#2C2C2C] mb-2">Horaires</h3>
                        <p className="text-[#2C2C2C]/60 leading-relaxed">
                            Lun - Ven : 9h - 19h<br />
                            Sam : 10h - 16h<br />
                            Dim : Fermé
                        </p>
                    </div>
                </div>
            </div>

            {/* Formulaire et Carte */}
            <div className="contact-form-container max-w-7xl mx-auto px-6 mb-20">
                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Formulaire */}
                    <div className="form-section bg-white rounded-2xl p-8 lg:p-12 shadow-xl">
                        <h2 className="text-3xl font-light text-[#2C2C2C] mb-3">
                            Envoyez-nous un message
                        </h2>
                        <p className="text-[#2C2C2C]/60 mb-8">
                            Remplissez le formulaire ci-dessous et nous vous répondrons dans les plus brefs délais
                        </p>

                        
                    </div>

                    {/* Social */}
                    <div className="map-section bg-white flex flex-col justify-between items-center rounded-2xl overflow-hidden shadow-xl h-full min-h-150">
                        <div className="text-center mb-16">
                            <div className="inline-flex items-center mt-10 gap-2 bg-[#7A9B8E]/10 px-4 py-2 rounded-full mb-4">
                                <Instagram className="w-5 h-5 text-[#7A9B8E]" />
                                <span className="text-sm font-medium text-[#7A9B8E]">Suivez-nous</span>
                            </div>
                            <h2 className="text-3xl md:text-4xl text-[#2C2C2C] font-light mb-4">
                                Rejoignez notre communauté
                            </h2>
                            <p className="text-[#2C2C2C]/60 max-w-2xl mx-auto">
                                Découvrez nos coulisses, nouveautés et inspirations au quotidien
                            </p>
                        </div>
                        {/* Boutons réseaux sociaux */}
                    <div className="grid md:grid-rows-3 gap-6 mb-16 w-7/8">
                        <a 
                            href="https://www.instagram.com/bougies_lumilaya?igsh=MXBsOGdpY2gyaTI2&utm_source=qr" 
                            target="_blank"
                            rel="noopener noreferrer"
                            className="social-card bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all group"
                        >
                            <div className="flex items-center  gap-4 rounded-xl">
                                <div className="w-16 h-16 bg-linear-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <Instagram className="w-8 h-8 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-medium text-[#2C2C2C] mb-1">Instagram</h3>
                                    <p className="text-[#2C2C2C]/60 text-sm">@bougies_lumilaya</p>
                                </div>
                            </div>
                        </a>

                        <a 
                            href="https://www.facebook.com/share/1G81FARnuq/?mibextid=wwXIfr" 
                            target="_blank"
                            rel="noopener noreferrer"
                            className="social-card bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all group"
                        >
                            <div className="flex items-center  gap-4 rounded-xl">
                                <div className="w-16 h-16 bg-linear-to-br from-blue-600 via-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <Facebook className="w-8 h-8 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-medium text-[#2C2C2C] mb-1">Facebook</h3>
                                    <p className="text-[#2C2C2C]/60 text-sm">Lumi'laya</p>
                                </div>
                            </div>
                        </a>

                        <a 
                            href="https://www.tiktok.com/@bougies.lumilaya?_r=1&_t=ZN-92FCWgfpN3r" 
                            target="_blank"
                            rel="noopener noreferrer"
                            className="social-card bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all group"
                        >
                            <div className="flex items-center  gap-4 rounded-xl">
                                <div className="w-16 h-16 bg-linear-to-br from-black via-zinc-900 to-zinc-800 ring-1 ring-white/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="none" viewBox="0 0 48 48" id="tiktok">
                                        <path fill="currentColor" d="M34.1451 0H26.0556V32.6956C26.0556 36.5913 22.9444 39.7913 19.0725 39.7913C15.2007 39.7913 12.0894 36.5913 12.0894 32.6956C12.0894 28.8696 15.1315 25.7391 18.8651 25.6V17.3913C10.6374 17.5304 4 24.2783 4 32.6956C4 41.1827 10.7757 48 19.1417 48C27.5075 48 34.2833 41.1131 34.2833 32.6956V15.9304C37.3255 18.1565 41.059 19.4783 45 19.5479V11.3391C38.9157 11.1304 34.1451 6.12173 34.1451 0Z"></path>
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-xl font-medium text-[#2C2C2C] mb-1">Tik Tok</h3>
                                    <p className="text-[#2C2C2C]/60 text-sm">Bougies.lumilaya</p>
                                </div>
                            </div>
                        </a>
                    </div>
                    </div>
                </div>
            </div>

            {/* Section Réseaux Sociaux */}
            <div className="social-section bg-linear-to-b from-[#F5F1EB] to-[#FDFBF7] py-20">
                <div className="max-w-7xl mx-auto px-6">
                    

                    

                    {/* Feed Instagram/TikTok */}
                    <div className="social-feed">
                        <h3 className="text-2xl font-light text-[#2C2C2C] mb-8 text-center">
                            Nos dernières publications
                        </h3>
                        {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {socialPosts.map((post) => (
                                <a
                                    key={post.id}
                                    href={post.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="social-post relative aspect-square rounded-xl overflow-hidden group bg-linear-to-br from-[#7A9B8E] to-[#5A7B6E]"
                                >
                                    <img src={thumb} alt='' className="absolute inset-0 bg-[#2C2C2C]/10 group-hover:bg-[#2C2C2C]/5 transition-all" />
                                    

                                    {/* Overlay au hover */}
                                    {/* <div className="absolute inset-0 bg-linear-to-t from-[#2C2C2C]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="none" viewBox="0 0 48 48" id="tiktok">
                                            <path fill="currentColor" d="M34.1451 0H26.0556V32.6956C26.0556 36.5913 22.9444 39.7913 19.0725 39.7913C15.2007 39.7913 12.0894 36.5913 12.0894 32.6956C12.0894 28.8696 15.1315 25.7391 18.8651 25.6V17.3913C10.6374 17.5304 4 24.2783 4 32.6956C4 41.1827 10.7757 48 19.1417 48C27.5075 48 34.2833 41.1131 34.2833 32.6956V15.9304C37.3255 18.1565 41.059 19.4783 45 19.5479V11.3391C38.9157 11.1304 34.1451 6.12173 34.1451 0Z"></path>
                                        </svg>
                                    </div>
                                </a>
                            ))}
                        </div> */} 
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;