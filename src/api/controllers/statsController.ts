import { type Request, type Response } from "express"
import { PrismaClient } from "@prisma/client";
import { gameHistoryService } from "../../services/statsService.js";
import { GameInfo } from "../../types/gameInfo.js";
const prisma = new PrismaClient();

const getUserPlayHistory = async (req: Request, res: Response) => {
    try {
        const uuid = req.params.uuid;
        return res.status(200).json(await gameHistoryService(uuid));
    } catch (error: unknown) {
        return error;
    }
}

const getUserStats = async (req: Request, res: Response) => {
    const gameHistory: GameInfo[] = await gameHistoryService(req.params.uuid) as GameInfo[];
    //recorrer todo el game history y por cada game que tenga winner = true sumar 1 a wins
    let wins: number = 0;
    try {
        wins = gameHistory.reduce((acc, game) => {
            if (game.winner) {
                return acc + 1;
            }
            return acc;
        }, 0);
    } catch (error: unknown) {
        wins = 0;
    }
    //recorrer todo el game history y por cada game que tenga winner = false sumar 1 a loses
    const playedGames = gameHistory.length;
    const loses = playedGames - wins;
    const userStats = {
        wins,
        loses,
        playedGames
    }
    return res.status(200).json(userStats);
}


export { getUserPlayHistory, getUserStats };