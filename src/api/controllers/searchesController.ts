import { Searches } from "@prisma/client"
import { createSearch, findManySearches, findOneSearch, removeSearch, updateSearch } from "../../services/searchesService.js"
import { type Request, type Response } from "express"

// Coge todas las busquedas de la base de datos y las devuelve según la paginación y la cantidad de elementos por página
export const getSearches = async (req: Request, res: Response) => {
    try {
        const page = parseInt(req.query.page as string, 10)
        const limit = parseInt(req.query.limit as string, 10)
        const questions = await findManySearches(page, limit)
        res.status(200).json(questions)
    } catch (error: unknown) {
        res.status(500).json({ message: "Internal server error", error })
    }
}

// Coge una búsqueda de la base de datos y la devuelve según su id
export const getSearch = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id)
        const question = await findOneSearch(id)
        res.status(200).json(question)
    } catch (error: unknown) {
        res.status(500).json({ message: "Internal server error", error })
    }
}

// Crea una búsqueda en la base de datos y la devuelve
export const postSearch = async (req: Request, res: Response) => {
    try {
        let image: undefined | string = undefined
        if (req.file) {
            console.log(req.file)
            image = req.file.filename
        }

        const search = {
            searches: Number(req.body.searches),
            term: String(req.body.term),
            image,
        }

        const newSearch = await createSearch(search)
        res.status(201).json(newSearch)

    } catch(error: unknown) {
        res.status(500).json({ message: "Internal server error", error})
    }
}

// Actualiza una búsqueda en la base de datos y la devuelve
export const putSearch = async (req: Request, res: Response) => {
    try {
        const oldSearch = await findOneSearch(Number(req.params.id))
        let search = {
            id: Number(req.params.id),
            searches: Number(req.body.searches),
            term: String(req.body.term),
            image: String(oldSearch?.image) || null,
        }

        let image: null | string = null
        if (req.file) {
            console.log(req.file)
            image = req.file.filename
            search.image = image
        }

        const updatedSearch = await updateSearch(search)
        res.status(200).json(updatedSearch)
    } catch (error: unknown) {
        res.status(500).json({ message: "Internal server error", error })
    }
}

// Elimina una búsqueda de la base de datos y la devuelve
export const deleteSearch = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id)
        const search = await removeSearch(id)
        res.status(204).json(search)
    } catch (error: unknown) {
        res.status(500).json({ message: "Internal server error", error })
    }
}