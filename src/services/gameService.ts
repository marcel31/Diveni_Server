/* eslint-disable no-await-in-loop */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable capitalized-comments */
/* eslint-disable no-case-declarations */

import { PrismaClient, type Questions } from '@prisma/client';
import { getSongList } from './spotifyService.js';
import { getImg } from './pexelsService.js';
import { type Question } from '../types/question.js';
import { type Searches, type AIImages, type Guess_Songs, type Games } from "@prisma/client";
import { Track } from '../types/track.js';

const prisma = new PrismaClient();

const getQuestions = async (type: number) => {
    let count: number;
    let q1: Searches | AIImages | Guess_Songs;
    let q2: Searches | AIImages | Guess_Songs;

    switch (type) {
        case 1:
            do {
            count = await prisma.searches.count();
            q1 = await prisma.searches.findUnique({ where: { id: Math.floor(Math.random() * (count - 1) + 1) } }) ?? { id: 1, searches: 1, term: "Default Term for q1", image: "https://via.placeholder.com/150" };
            q2 = await prisma.searches.findUnique({ where: { id: Math.floor(Math.random() * (count - 1) + 1) } }) ?? { id: 2, searches: 2, term: "Default Term for q2", image: "https://via.placeholder.com/150" };
            } while (q1.id === q2.id && !q1.id && !q2.id);
            if (!q1.image) {
                q1 = await prisma.searches.update({
                    where: {
                        id: q1.id,
                    },
                    data: {
                        image: await getImg(q1.term) as string,
                    },
                });
            }

            if (!q2.image) {
                q2 = await prisma.searches.update({
                    where: {
                        id: q2.id,
                    },
                    data: {
                        image: await getImg(q2.term) as string,
                    },
                });
            }

            const dbQuestion = await prisma.searches_Questions.findFirst({ where: { idQuestion1: q1.id, idQuestion2: q2.id } }) ?? await prisma.searches_Questions.findFirst({ where: { idQuestion1: q2.id, idQuestion2: q1.id } })
            if (!dbQuestion) {
                const questionsIds = await prisma.questions.create({
                    data: {
                    }
                });
                const searchesQuestion = await prisma.searches_Questions.create({
                    data: {
                        id: questionsIds.id,
                        idQuestion1: q1.id,
                        idQuestion2: q2.id,
                    },
                });

                q1 = {
                    id: q1.id,
                    term: q1.term,
                    searches: q1.searches,
                    image: await getImg(q1.term) as string,

                }
                q2 = {
                    id: q2.id,
                    term: q2.term,
                    searches: q2.searches,
                    image: await getImg(q2.term) as string,
                }
                const question: Question = {
                    q1,
                    q2,
                    question: searchesQuestion,
                    type: 1,
                };
                return question;
            }

            break;
        // case 2:
        //     const songs = await getSongList();
        //     if (!songs) {
        //         return;
        //     }

        //     const randomIndex = Math.floor(Math.random() * songs.items.length);
        //     const randomItem = songs.items[randomIndex];
        //     const fullUrl = randomItem.track.href;
        //     let song = await prisma.guess_Songs.findFirst({ where: { url: fullUrl } });
        //     let question;
        //     if (song) {
        //         question = await prisma.questions.findFirst({ where: { id: song.id } });
        //     } else {
        //         question = await prisma.questions.create({
        //         });
        //         song = await prisma.guess_Songs.create({
        //             data: {
        //                 id: question.id as number,
        //                 url: fullUrl,
        //             },
        //         });
        //     }

        //     questions = {
        //         q1: song,
        //         question: question as Questions,
        //         type: 2,
        //     };
        //     return questions;
        case 3:
            count = await prisma.aIImages.count();
            const random = Math.floor(Math.random() * count) + 1;
            const img1 = await prisma.aIImages.findUnique({ where: { id: random } }) ?? { id: 1, urlP: 'https://fakeimg.pl/600x600/cccccc/cccccc', urlI: 'https://fakeimg.pl/600x600/cccccc/cccccc', questionId: 1 };

            const questionJoiner = await prisma.questions.findFirst({ where: { id: img1.questionId } });
            let question: Question;
            if (questionJoiner) {
                question = {
                    q1: img1,
                    question: {
                        id: questionJoiner.id,
                        idQuestion1: img1.id,
                        idQuestion2: null,
                    },
                    type: 3,
                };
            } else {
                const newQuestion = await prisma.questions.create({
                });
                question = {
                    q1: img1,
                    question: {
                        id: newQuestion.id,
                        idQuestion1: img1.id,
                        idQuestion2: null,
                    },
                    type: 3,
                };
            }

            return question;
        default:
            break;
    }
};

// Metodo que crea una sala de juego y añade al jugador que la ha creado
const createGame = async (host: { uuid: string; points: number }) => {
    // random 6 leters code
    const joinCode = Math.random().toString(36).substring(2, 8).toUpperCase();

    const newGame = await prisma.games.create({
        data: {
            joinCode,
        }
    });

    const player = await prisma.players.create({
        data: {
            uuid: host.uuid,
            points: host.points,
            gameId: newGame.id,
        }
    });
    const game = {
        id: newGame.id,
        joinCode: newGame.joinCode,
        player,
    }
    return game;
}
// Metodo que añade un jugador a una sala de juego y devuelve la lista de jugadores en la sala en caso de no encontrarla devuelve un string 404

const joinGame = async (joinCode: string, playerData: { uuid: string; points: number }) => {
    const game = await prisma.games.findUnique({
        where: {
            joinCode
        }
    });
    if (game) {
        try {
            let playerExists = await prisma.players.findFirst({
                where: {
                    uuid: playerData.uuid,
                    gameId: game.id,
                },
            });
            if (!playerExists) {
                playerExists = await prisma.players.create({
                    data: {
                        uuid: playerData.uuid,
                        points: 0,
                        gameId: game.id,
                    },
                });
            }

            const playerList = await prisma.players.findMany({
                where: {
                    gameId: game.id,
                },
                orderBy: {
                    createdAt: 'desc',
                }
            });
            const players = {
                playerList,
                player: playerExists,
            }
            return players;
        } catch (error) {
            return error as string;
        }
    } else {
        return '404';
    }
}

// Añade la respuesta del jugador a la base de datos
export const addAnswer = async (playerId: number, answer: string, questionId: number) => {
    await prisma.players_Questions.create({
        data: {
            playerId,
            questionId,
            answer: String(answer),
        },
    });
}

const checkAnswers = async (questions: Question, gameId: number) => {
    const playerList = await prisma.players.findMany({
        where: {
            gameId,
        },
    });
    let questionId: number;

    switch (questions.type) {
        case 1:
            questionId = questions.question.id;
            break;
        case 3:
            questionId = questions.q1.id;
            break;
        default:
            return true;
    }

    const answers = await prisma.players_Questions.findMany({
        where: {
            questionId,
            playerId: {
                in: playerList.map((player) => player.id),
            },
        },
    });

    if (answers.length === playerList.length) {
        return true;
    }

    return false;
}

const getGame = async (playerId: number) => {
    const player = await prisma.players.findUnique({
        where: {
            id: playerId,
        },
    });
    if (player) {
        const game = await prisma.games.findUnique({
            where: {
                id: player.gameId,
            },
        });
        return game;
    }

    return { id: -1, joinCode: 'ERROR', createdAt: new Date(), updatedAt: new Date(), rounds: -1 };
}

const nextRound = async (gameId: number) => {
    const game = await prisma.games.findUnique({
        where: {
            id: gameId,
        },
    });

    if (game) {
        let gameRounds: number = game.rounds;
        gameRounds++;
        const newGame = await prisma.games.update({
            where: {
                id: gameId,
            },
            data: {
                rounds: gameRounds,
            },
        });
        return newGame.rounds;
    }

    return 10;
}

const addPoints = async (gameId: number, question, playerId, correct) => {
    const maxPoints = 1000;
    const totalPlayers = await prisma.players.count({
        where: {
            gameId,
        },
    });
    const playerList = await prisma.players.findMany({
        where: {
            gameId,
        },
    });
    const playerAnswers = await prisma.players_Questions.findMany({
        where: {
            questionId: question.question.id as number,
            playerId: {
                in: playerList.map((player) => player.id),
            },
            answer: String(correct),
        },
    });
    const playerAnswersSorted = playerAnswers.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
    let position;
    for (let index = 0; index < playerAnswersSorted.length; index++) {
        if (playerAnswersSorted[index].playerId === playerId) {
            position = index + 1;
            const minuesPerPlayer = 1 / totalPlayers;
            const percentageByOrder = 1 - (position - 1) * minuesPerPlayer;
            const points: number = Math.round(maxPoints * percentageByOrder);
            const oldPlayer = await prisma.players.findUnique({
                where: {
                    id: playerId as number,
                },
            });
            if (oldPlayer) {
                const newPoints = oldPlayer.points + points;
                const newPlayer = await prisma.players.update({
                    where: {
                        id: playerId as number,
                    },
                    data: {
                        points: Math.trunc(newPoints),
                    },
                });
                return Math.trunc(newPoints);
            }
        }
    }
}

const getQuestion = async (questionId: number) => {
    try {
        const question = await prisma.questions.findUnique({
            where: {
                id: questionId,
            },
            include: {
                AIImages: true,
                Guess_Songs: true,
                Players_Questions: true,
                Searches_Questions: {
                    include: {
                        question1: true,
                        question2: true,
                    }
                }
            }
        });

        if (question) {
            return question;
        }

        return 404;
    } catch (error) {
        return error as string;
    }
}

const correctAnswer = async (questionId: number, type: number) => {
    const question = await getQuestion(questionId);
    if (typeof question === 'object' && question.Searches_Questions) {
        switch (type) {
            case 1:
                if(question.Searches_Questions[0].question1?.id && question.Searches_Questions[0].question2?.id) {
                if (question.Searches_Questions[0].question1.searches > question.Searches_Questions[0].question2.searches) {
                    return question.Searches_Questions[0].question1.id;
                }
                return question.Searches_Questions[0].question2.id;
            } else {
                return -1;
            }
            case 3:
                return question.AIImages[0].urlP;
            default:
                return -1;
        }
    }
}

const stopGame = async (joinCode: string) => {
    const game = await prisma.games.update({
        where: {
            joinCode,
        },
        data: {
            joinCode: null,
        },
    });

}

export { getQuestions, createGame, joinGame, correctAnswer, getGame, nextRound, addPoints, checkAnswers, stopGame };