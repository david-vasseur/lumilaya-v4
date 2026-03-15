"use client"

import { Quote, Star } from 'lucide-react';
import { useEffect, useState } from 'react';
import { IReview } from '../layout/landing/Reviews';

const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
};

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

function ReviewCard({ review }: {review: IReview}) {

    const getVisibleCount = () => {
        if (typeof window === 'undefined') return 3;
        return window.innerWidth >= 1024 ? 3 : 1;
    };

    const [visibleCount, setVisibleCount] = useState(getVisibleCount());

    useEffect(() => {
        const handleResize = () => {
            setVisibleCount(getVisibleCount());
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
         <div
            key={review.id}
            className="shrink-0 px-4"
            style={{ width: `${100 / visibleCount}%` }}
        >
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 relative h-full">
                {/* Icône quote décorative */}
                <div className="absolute top-6 right-6 opacity-5">
                    <Quote className="w-16 h-16 text-[#7A9B8E]" />
                </div>

                {/* Header du review */}
                <div className="flex items-start justify-between mb-4 relative z-10">
                    <div className="flex items-center gap-3">
                        {/* Avatar (utiliser l'image si disponible, sinon initiales) */}
                        {review.authorImage ? (
                            <div className="relative w-12 h-12 rounded-full overflow-hidden">
                                <img
                                    src={review.authorImage}
                                    alt={review.author}
                                    className="absolute inset-0 object-cover"
                                />
                            </div>
                        ) : (
                            <div className="w-12 h-12 bg-[#7A9B8E]/10 rounded-full flex items-center justify-center shrink-0">
                                <span className="text-[#7A9B8E] font-medium text-lg">
                                    {review.author.split(' ').map(n => n[0]).join('')}
                                </span>
                            </div>
                        )}
                        
                        <div>
                            <h3 className="font-medium text-[#2C2C2C]">
                                {review.author}
                            </h3>
                            <p className="text-xs text-[#2C2C2C]/50">
                                {formatDate(review.date)}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Rating */}
                <div className="mb-4">
                    <StarRating rating={review.rating} />
                </div>

                {/* Texte du review */}
                <p className="text-[#2C2C2C]/70 leading-relaxed">
                    {review.text}
                </p>

                {/* Badge source (optionnel) */}
                {review.source === 'google' && (
                    <div className="mt-4 pt-4 border-t border-[#2C2C2C]/5">
                        <span className="text-xs text-[#2C2C2C]/40">
                            Avis Google
                        </span>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ReviewCard;