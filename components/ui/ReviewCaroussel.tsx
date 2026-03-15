"use client"

import { ChevronLeft, ChevronRight } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'
import ReviewCard from './ReviewCard'
import { IReview } from '../layout/landing/Reviews';

function ReviewCaroussel({ reviews }: { reviews: IReview[] }) {

    const carouselRef = useRef<HTMLDivElement>(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    const getVisibleCount = () => {
        if (typeof window === 'undefined') return 3;
        return window.innerWidth >= 1024 ? 3 : 1;
    };

    const [visibleCount, setVisibleCount] = useState(getVisibleCount());

    useEffect(() => {
        if (isPaused) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => {
                const maxIndex = reviews.length - visibleCount;
                return prev >= maxIndex ? 0 : prev + 1;
            });
        }, 5000); 

        return () => clearInterval(interval);
    }, [isPaused, visibleCount]);

    const goToNext = () => {
        setCurrentIndex((prev) => {
            const maxIndex = reviews.length - visibleCount;
            return prev >= maxIndex ? 0 : prev + 1;
        });
    };

    const goToPrevious = () => {
        setCurrentIndex((prev) => {
            const maxIndex = reviews.length - visibleCount;
            return prev <= 0 ? maxIndex : prev - 1;
        });
    };

    return (
        <div 
            className="carousel-container relative"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            {/* Navigation Buttons */}
            <button
                onClick={goToPrevious}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-12 z-10 w-12 h-12 bg-white rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center hover:bg-[#F5F1EB] group"
                aria-label="Avis précédent"
            >
                <ChevronLeft className="w-6 h-6 text-[#7A9B8E] group-hover:text-[#6A8B7E]" />
            </button>

            <button
                onClick={goToNext}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-12 z-10 w-12 h-12 bg-white rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center hover:bg-[#F5F1EB] group"
                aria-label="Avis suivant"
            >
                <ChevronRight className="w-6 h-6 text-[#7A9B8E] group-hover:text-[#6A8B7E]" />
            </button>

            {/* Carousel */}
            <div className="overflow-hidden py-5">
                <div
                    ref={carouselRef}
                    className="flex transition-transform duration-500 ease-out"
                    style={{
                        transform: `translateX(-${currentIndex * (100 / visibleCount)}%)`
                    }}
                >
                    {reviews.map((review) => (
                        <ReviewCard key={review.id} review={review}/>
                    ))}
                </div>
            </div>

            {/* Indicateurs de pagination */}
            <div className="flex justify-center gap-2 mt-8">
                {Array.from({ length: reviews.length - visibleCount + 1 }).map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`h-2 rounded-full transition-all ${
                            currentIndex === index 
                                ? 'w-8 bg-[#7A9B8E]' 
                                : 'w-2 bg-[#2C2C2C]/20 hover:bg-[#2C2C2C]/40'
                        }`}
                        aria-label={`Aller à l'avis ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    )
}

export default ReviewCaroussel;