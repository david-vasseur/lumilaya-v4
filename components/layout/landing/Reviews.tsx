import ReviewCaroussel from '@/components/ui/ReviewCaroussel';
import { Star } from 'lucide-react';
import React from 'react'


export interface IReview {
    id: number;
    author: string;
    authorImage?: string; 
    rating: number; 
    date: string; 
    text: string;
    source?: 'google' | 'manual';
}

const reviews: IReview[] = [
    {
        id: 1,
        author: "Sophie Martin",
        rating: 5,
        date: "2024-11-15T10:30:00Z",
        text: "Des bougies exceptionnelles ! L'odeur de lavande est subtile et naturelle, rien à voir avec les parfums synthétiques. La combustion est propre et dure vraiment longtemps. Je recommande à 100%.",
        source: "google"
    },
    {
        id: 2,
        author: "Thomas Dubois",
        rating: 5,
        date: "2024-11-10T14:20:00Z",
        text: "J'ai offert un coffret à ma mère pour son anniversaire, elle était ravie ! La qualité est au rendez-vous et l'emballage est magnifique. Service client très réactif.",
        source: "google"
    },
    {
        id: 3,
        author: "Marie Lefebvre",
        rating: 5,
        date: "2024-11-05T16:45:00Z",
        text: "Enfin des bougies vraiment naturelles ! Je suis sensible aux parfums chimiques et là, aucun problème. L'atmosphère créée est apaisante et chaleureuse. Mon salon sent divinement bon.",
        source: "google"
    },
    {
        id: 4,
        author: "Laurent Petit",
        rating: 4,
        date: "2024-10-28T09:15:00Z",
        text: "Très bonne qualité, j'apprécie particulièrement la transparence sur la composition. Le prix est un peu élevé mais justifié par la qualité artisanale. Je rachèterai certainement.",
        source: "google"
    },
    {
        id: 5,
        author: "Céline Rousseau",
        rating: 5,
        date: "2024-10-20T11:00:00Z",
        text: "Un vrai coup de cœur ! Les senteurs sont délicates et naturelles. J'adore le concept LUMILAYA, c'est exactement ce que je recherchais. Livraison rapide et soignée.",
        source: "google"
    },
];

const StarRating = ({ rating }: { rating: number }) => {
    return (
        <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
                <Star
                    key={star}
                    className={`w-5 h-5 ${
                        star <= rating 
                            ? 'fill-[#7A9B8E] text-[#7A9B8E]' 
                            : 'fill-none text-[#2C2C2C]/20'
                    }`}
                />
            ))}
        </div>
    );
};

const averageRating = (reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length).toFixed(1);


function Reviews() {

    return (
        <section className="w-full bg-linear-to-b from-[#F5F1EB] to-[#FDFBF7] py-16 lg:py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="reviews-header text-center mb-16">
                    <div className="inline-flex items-center gap-2 bg-[#7A9B8E]/10 px-4 py-2 rounded-full mb-4">
                        <Star className="w-5 h-5 text-[#7A9B8E] fill-[#7A9B8E]" />
                        <span className="text-sm font-medium text-[#7A9B8E]">Avis clients</span>
                    </div>
                    
                    <h2 className="text-3xl md:text-4xl text-[#2C2C2C] font-light mb-4">
                        Ce que nos clients pensent de nous
                    </h2>
                    
                    <div className="flex items-center justify-center gap-4 mt-6">
                        <div className="flex items-center gap-2">
                            <span className="text-5xl font-light text-[#2C2C2C]">{averageRating}</span>
                            <div>
                                <StarRating rating={Math.round(parseFloat(averageRating))} />
                                <p className="text-sm text-[#2C2C2C]/60 mt-1">
                                    Basé sur {reviews.length} avis
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <ReviewCaroussel reviews={reviews} />

                <div className="text-center mt-12">
                    <p className="text-[#2C2C2C]/60 mb-4">
                        Partagez votre expérience avec LUMILAYA
                    </p>
                    <a 
                        href="https://g.page/r/CQgc2Co6LkOzEAE/review/" // À remplacer par vrai Google My Business
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-[#7A9B8E] text-white px-6 py-3 rounded-full hover:bg-[#6A8B7E] transition-all shadow-lg hover:shadow-xl"
                    >
                        <Star className="w-5 h-5" />
                        Laisser un avis
                    </a>
                </div>
            </div>
        </section>
    )
}

export default Reviews