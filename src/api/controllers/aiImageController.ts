import { createAiImage, findManyAiImages, findOneAiImage, removeAiImage, updateAiImage } from "../../services/aiimageService.js"
import { type Request, type Response } from "express"
import { type AiImageNoId } from "../../types/aiImageNoId.js"
import { string } from "joi"

export const getAiImages = async (req: Request, res: Response) => {
    try {
        const page = parseInt(req.query.page as string, 10)
        const limit = parseInt(req.query.limit as string, 10)
        const questions = await findManyAiImages(page, limit)
        if (typeof questions === "string") {
            res.status(500).json(questions)
        }

        res.status(200).json(questions)
    } catch (error: unknown) {
        res.status(500).json({ message: "Internal server error", error })
    }
}

export const getAiImage = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id)
        const question = await findOneAiImage(id)
        res.status(200).json(question)
    } catch (error) {
        res.status(500).json(error)
    }
}

export const postAiImage = async (req: Request, res: Response) => {
    try {
        if (req.files) {
            const images = req.files as Express.Multer.File[]
            let urlP
            let urlI
            if (images[0].originalname.split('.')[0].endsWith('P')) {
                urlP = images[0].path.split(`src\\public\\imageQuiz\\`)[1]
            } else {
                res.status(400).json({ message: "The first image must be a P image" })
            }

            if (images[1].originalname.split('.')[0].endsWith('I')) {
                urlI = images[1].path.split(`src\\public\\imageQuiz\\`)[1]
            } else {
                res.status(400).json({ message: "The second image must be a I image" })
            }

            const aiImage: AiImageNoId = {
                urlP: urlP as string,
                urlI: urlI as string
            }

            res.status(201).json(await createAiImage(aiImage))
        } else {
            res.status(400).json({ message: "No images uploaded" })
        }

    } catch (error) {
        res.status(500).json(error)
    }
}

export const putAiImage = async (req: Request, res: Response) => {
    try {

        if (!await findOneAiImage(Number(req.params.id))) {
            res.status(404).json({ message: "AiImage not found" })
            return
        }

        if (req.files) {
            const images = req.files as Express.Multer.File[]
            if (images.length === 1) {
                if (images[0].originalname.split('.')[0].endsWith('P')) {
                    const aiImage: AiImageNoId = {
                        urlP: images[0].path.split(`src\\public\\imageQuiz\\`)[1],
                    }
                    res.status(200).json(await updateAiImage(Number(req.params.id), aiImage))
                } else if (images[0].originalname.split('.')[0].endsWith('I')) {
                    const aiImage: AiImageNoId = {
                        urlI: images[0].path.split(`src\\public\\imageQuiz\\`)[1],
                    }
                    res.status(200).json(await updateAiImage(Number(req.params.id), aiImage))
                } else {
                    res.status(400).json({ message: "The image name must end in a P or I image" })
                }
            } else {
                const images = req.files as Express.Multer.File[]
                let urlP
                let urlI
                if (images[0].originalname.split('.')[0].endsWith('P')) {
                    urlP = images[0].path.split(`src\\public\\imageQuiz\\`)[1]
                } else {
                    res.status(400).json({ message: "The first image must be a P image" })
                }

                if (images[1].originalname.split('.')[0].endsWith('I')) {
                    urlI = images[1].path.split(`src\\public\\imageQuiz\\`)[1]
                } else {
                    res.status(400).json({ message: "The second image must be a I image" })
                }

                const aiImage: AiImageNoId = {
                    urlP: urlP as string,
                    urlI: urlI as string
                }
                res.status(201).json(await updateAiImage(Number(req.params.id), aiImage))
            }
        } else {
            res.status(400).json({ message: "No images uploaded" })
        }
    } catch (error) {
        res.status(500).json(error)
    }
}

export const deleteAiImage = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id)
        const question = await findOneAiImage(id)
        if (!question) {
            res.status(404).json({ message: "AiImage not found" })
            return
        }

        res.status(204).json(await removeAiImage(id))
    } catch (error) {
        res.status(500).json(error)
    }
}