import { type DecodedIdToken } from "firebase-admin/auth";
import { getUserByUid, tokenService } from "../../services/userService.js";
import { type NextFunction, type Request, type Response } from 'express';

export const adminMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.header('Authorization')?.split(' ')[1];
        if (token) {
            const user: DecodedIdToken | string = await tokenService(token);
            if (typeof user === 'object') {
                const userDb = await getUserByUid(user.uid);
                if (typeof userDb !== 'string' && userDb?.role !== 'admin') {
                    return res.status(401).json({ msg: 'You are not an admin' });
                }

                next();
            } else {
                return res.status(401).json({ msg: 'Invalid token' });
            }
        } else {
            return res.status(401).json({ msg: 'No token provided' });
        }
    } catch (error: unknown) {
        return res.status(500).json({ msg: error });
    }
}