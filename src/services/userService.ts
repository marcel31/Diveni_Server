import { admin, db, auth } from "../config/Firebaseconnection.js";
import { PrismaClient } from '@prisma/client';
import { type DecodedIdToken } from 'firebase-admin/auth';
import { signInWithEmailAndPassword } from "firebase/auth";

const prisma = new PrismaClient();

// Esto comprueba el token de autenticacion de firebase y devuelve su usuario
const tokenService = async (token: string) => {
    try {
        const user: DecodedIdToken  = await admin.auth().verifyIdToken(token);
        return user;
    } catch {
        return 'Invalid token'
    }
}
// Esto devuelve la lista de jugadores en una sala

const getPlayerList = async (gameId: number) => {
    try {
        const playerList = await prisma.players.findMany({
            where: {
                gameId,
            },
            orderBy: {
                points: 'desc',
            }
        });
        return playerList;
    } catch (error: unknown) {
        return error;
    }
}
// Metodo para añadir experiencia a un jugador

const addXp = async (userId: string, xp: number, gameId: number) => {
    try {
        const user = db.collection('users').doc(userId);
        const newUser = await user.update({
            experience: admin.firestore.FieldValue.increment(xp)
        });
        const dbPlayer = await prisma.players.findFirst({
            where: {
                uuid: userId,
                gameId,
            }
        })
        if (dbPlayer) {
            await prisma.players.update({
                where: {
                    id: dbPlayer.id,
                },
                data: {
                    xp,
                }
            })
        }

        return newUser;
    } catch (error: unknown) {
        return error;
    }
}

const addCrowns = async (userId: string, crowns: number, gameId: number) => {
    try {
        const user = db.collection('users').doc(userId);
        const newUser = await user.update({
            crowns: admin.firestore.FieldValue.increment(crowns)
        });

        const dbPlayer = await prisma.players.findFirst({
            where: {
                uuid: userId,
                gameId,
            }
        })
        if (dbPlayer) {
            await prisma.players.update({
                where: {
                    id: dbPlayer.id,
                },
                data: {
                    crowns,
                }
            })
        }

        return newUser;
    } catch (error: unknown) {
        return error;
    }
}

const getUserByUid = async (uid: string) => {
    try {
        const user = await db.collection('users').doc(uid).get();
        if (!user) {
            return 'User not found';
        }

        return user.data();
    } catch (error) {
        return `Internal server error ${error}`
    }
}

const loginUser = async (email: string, password: string) => {
    try {
        const user = await signInWithEmailAndPassword(auth, email, password);
        return user;
    } catch (error) {
        return error;
    }
}


export { tokenService, getPlayerList, addXp, getUserByUid, loginUser, addCrowns };