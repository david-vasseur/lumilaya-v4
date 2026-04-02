"use server"

import { prisma } from "../prisma/prisma";

export const getEvents = async () => {

    const today = new Date();

    return await prisma.event.findMany({
            where: {
                dateStart: {
                    gte: today, 
                },
            },
            select: {
                id: true,
                name: true,
                dateStart: true,
                dateEnd: true,
                city: true,
                postalCode: true,
                image: true,
                url: true,
            },
            orderBy: {
                dateStart: 'asc', 
            },
            take: 3,
        });
}