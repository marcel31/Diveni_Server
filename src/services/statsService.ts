import { PrismaClient } from "@prisma/client";
import { GameInfo } from "../types/gameInfo";

const prisma = new PrismaClient();

const gameHistoryService = async (uuid: string) => {
    try {
        const jugadores = await prisma.players.findMany({
            where: {
                uuid,
            }
        });

        let historialPartidas: GameInfo[] = [];

        for (const jugador of jugadores) {
            const gameId = jugador.gameId;

            const juego = await prisma.games.findUnique({
                where: {
                    id: gameId
                },
                include: {
                    players: true
                }
            });
            if (!juego) {
                return {
                    gameId: 0,
                    crowns: 0,
                    xp: 0,
                    points: 0,
                    winner: false
                }
            }

            const puntajes = juego.players.map(player => player.points);
            const maxPuntaje = Math.max(...puntajes);

            const jugadorGanador = jugador.points === maxPuntaje;

            const detallesPartida: GameInfo = {
                gameId: juego.id,
                crowns: jugador.crowns,
                xp: jugador.xp,
                points: jugador.points,
                winner: jugadorGanador
            };

            historialPartidas.push(detallesPartida);
        }

        return historialPartidas;
    } catch (error: unknown) {
        return error;
    }
}

export { gameHistoryService };