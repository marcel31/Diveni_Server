import { PrismaClient, type Searches } from '@prisma/client';
import { type SearchesNoId } from '../types/searchesNoId';

const prisma = new PrismaClient();

export const findManySearches = async (page: number, limit: number) => {
    try {
        const searches = await prisma.searches.findMany({
            skip: (page - 1) * limit,
            take: limit,
        });
    return searches;
} catch (error: unknown) {
    return error;
}
}

export const findOneSearch = async (id: number) => {
    try {
        const search = await prisma.searches.findUnique({
            where: {
                id,
            },
        });
        return search;
    } catch (error: unknown) {
        console.log(error);
    }
}

export const createSearch = async (newSearch : SearchesNoId) => {
    try {
        const search = await prisma.searches.create({
            data: newSearch,
        });
        return search;
    } catch (error: unknown) {
        return error;
    }
}

export const updateSearch = async (updatedSearch: Searches) => {
    try {
        const search = await prisma.searches.update({
            where: {
                id: updatedSearch.id,
            },
            data: updatedSearch,
        });
        return search;
    } catch (error: unknown) {
        return error;
    }
}

export const removeSearch = async (id: number) => {
    try {
        await prisma.searches_Questions.updateMany({
            where: {
                idQuestion2: id,
            },
            data: {
                idQuestion2: undefined,
            },
        })
        await prisma.searches_Questions.updateMany({
            where: {
                idQuestion1: id,
            },
            data: {
                idQuestion1: undefined,
            },
        })
        const search = await prisma.searches.delete({
            where: {
                id,
            },
        })
        return search;
    } catch (error: unknown) {
        return error;
    }
}
