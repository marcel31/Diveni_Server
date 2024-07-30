/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { type Request, type Response } from "express"
import { loginUser } from "../../services/userService.js"

export const login = async (req: Request, res: Response) => {
    try {
        const email = String(req.body.email)
        const password = String(req.body.password)
        const user = await loginUser(email, password)
        if (await user.user.stsTokenManager) {
            res.status(200).json(user.user.stsTokenManager)
        } else {
            res.status(401).json({ message: "Invalid password or email" })
        }
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error })
    }
}