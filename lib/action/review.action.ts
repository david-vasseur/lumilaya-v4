import { IReview } from "@/schema/review";
import { prisma } from "../prisma/prisma";



export const createReview = async (review: IReview) => {

    await prisma.review.create({
        data: {
            note: review.note,
            comment: review.comment,
            name: review.name,
            productId: review.productId
        },
    });
}

export const getReviewById = async (id: number) => {

    const reviews = await prisma.review.findMany({
        where: {
            productId: id
        }
    })

    return reviews;

}