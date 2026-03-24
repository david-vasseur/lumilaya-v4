import { IReviewBDD } from '@/app/avis/[slug]/page'
import { IReview } from '@/schema/review'
import React from 'react'

function ProductReviewCard(review: IReviewBDD) {
    return (
        <div className="p-4 border rounded-lg shadow-sm bg-white">
            <div className="flex items-center justify-between mb-2">
                <span className="font-medium">{review.name}</span>
                <span className="text-yellow-500">{review.note.toFixed(1)} ⭐</span>
            </div>
            <p className="text-gray-700">{review.comment}</p>
            <span className="text-gray-400 text-sm">
                {new Date(review.createdAt).toLocaleDateString()}
            </span>
        </div>
    )
}

export default ProductReviewCard