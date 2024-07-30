import { type AiImageNoId } from "../types/aiImageNoId.js";
import { AIImages, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const findManyAiImages = async (page: number, limit: number) => {
    try {
        const aiImages = await prisma.aIImages.findMany({
            skip: (page - 1) * limit,
            take: limit,
        });
        return aiImages;
    } catch (error) {
        return `Internal server error ${error}`;
    }
}

export const findOneAiImage = async (id: number) => {
    try {
        const aiImage = await prisma.aIImages.findUnique({
            where: {
                id,
            },
        });
        return aiImage;
    } catch (error) {
        return `Internal server error ${error}`;
    }
}

export const createAiImage = async (newAiImage : AiImageNoId) => {
    try {
        const question = await prisma.questions.create({
            data: {}
        });
        const aiImage = await prisma.aIImages.create({
            data: {
                urlP: newAiImage.urlP ?? '',
                urlI: newAiImage.urlI ?? '',
                questionId: question.id,
            },
        });
        return aiImage;
    } catch (error) {
        return `Internal server error ${error}`;
    }
}

export const updateAiImage = async (id: number, updatedAiImage: AiImageNoId) => {
    try {
        const aiImage = await prisma.aIImages.update({
            where: {
                id,
            },
            data: updatedAiImage,
        });
        return aiImage;
    } catch (error) {
        return `Internal server error ${error}`;
    }
}

export const removeAiImage = async (id: number) => {
    try {
        const aiImage = await prisma.aIImages.delete({
            where: {
                id,
            },
        });
        return aiImage;
    } catch (error) {
        return `Internal server error ${error}`;
    }
}