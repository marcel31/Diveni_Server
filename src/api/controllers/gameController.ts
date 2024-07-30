/* eslint-disable no-await-in-loop */
import { type Server, type Socket } from 'socket.io';
import { joinGame, getQuestions, addAnswer, checkAnswers, getGame, nextRound, addPoints, correctAnswer, createGame, stopGame } from '../../services/gameService.js';
import { Questions, type Players } from '@prisma/client';
import { tokenService, getPlayerList, addXp, addCrowns } from '../../services/userService.js';
import { type DecodedIdToken } from 'firebase-admin/auth';
import { type QuestionsArray } from '../../types/questionsArray.js';
import { type Question } from '../../types/question.js';

export function gameController(socket: Socket, io: Server) {
    // Escuchar a que el cliente se autentique y luego permitirle crear o unirse a una sala que toma como parametro token que es el token de autenticacion de firebase
    socket.on('auth', async (token: string) => {
        const user: DecodedIdToken | unknown = await tokenService(token);
        if (await user) {
            socket.data.user = user;
            // Crea una sala y se une a ella devolviendo el codigo de la sala
            socket.on('createRoom', async () => {
                const host: { uuid: string; points: number } = {
                    uuid: socket.data.user.user_id as string,
                    points: 0,
                };
                const game = await createGame(host);
                if (game.joinCode) {
                    await socket.join(game.joinCode);
                    socket.data.playerCode = game.player.id;
                    socket.emit('createRoom', game.joinCode);
                }
            });
            // Se une a una sala y devuelve la lista de jugadores en la sala en caso de no encontrarla devuelve un string 404
            socket.on('joinRoom', async (roomCode: string) => {
                try {
                    const playerData: { uuid: string; points: number } = {
                        uuid: socket.data.user.user_id as string,
                        points: 0,
                    };
                    const players = await joinGame(roomCode.toUpperCase(), playerData);
                    if (typeof players !== 'string') {
                        socket.emit('joinRoom', players.playerList);
                        await socket.join(roomCode);
                        socket.data.playerCode = players.player.id;
                        setTimeout(() => {
                        io.to(roomCode).emit('playerJoined', players.playerList);
                        }, 400);
                    }
                } catch (error) {
                    console.error(error);
                }
            });
            // Inicia el juego y devuelve la primera pregunta a todos sus jugadores
            socket.on('startGame', async (roomCode: string) => {
                io.to(roomCode).emit('startGame');
                const questionList: Question[] = [];
                const seenQuestions = new Set(); // Para controlar duplicados
                let count = 0;

                while (count < 10) {
                    const quizType = Math.floor(Math.random() * 101) % 2 === 0 ? 1 : 3;
                    const questionDb = await getQuestions(quizType);
                    if (questionDb && !seenQuestions.has(questionDb.question.id)) {
                        seenQuestions.add(questionDb.question.id);
                        questionList.push(questionDb);
                        count++;
                    }
                }

                const questionsArray = {
                    questions: questionList,
                    roomCode,
                };

                io.to(roomCode).emit('quizQuestion', questionsArray);
            });

            // Recibe la respuesta del jugador y la compara con la respuesta correcta, si es correcta añade puntos al jugador y si es la ultima pregunta del juego añade experiencia a los jugadores y envia los resultados
            socket.on('quizAnswer', async (questions) => {
                let correct;
                const game = await getGame(socket.data.playerCode as number);
                if (!game) {
                    console.log('Game not found');
                    return;
                }

                switch (questions.type) {
                    case 1:
                        correct = await correctAnswer(questions.question.id as number, questions.type as number);
                        await addAnswer(socket.data.playerCode as number, questions.answer as string, questions.question.id as number);
                        if (questions.answer === correct) {
                            await addPoints(game.id, questions, socket.data.playerCode, correct);
                        }

                        break;
                    case 3:
                        correct = await correctAnswer(questions.q1.questionId as number, questions.type as number);
                        await addAnswer(socket.data.playerCode as number, questions.answer as string, questions.q1.id as number);
                        if (questions.answer === correct) {
                            await addPoints(game.id, questions, socket.data.playerCode, correct);
                        }

                        break;
                    default:
                        break;
                }

                if (questions.answer === correct) {
                    await addPoints(game.id, questions, socket.data.playerCode, correct);
                }
                // Comprueba si todas las respuestas han sido respondidas y las corrige, cambia puntuacion...

                if (await checkAnswers(questions as Question, game.id)) {
                    if (await nextRound(game.id) >= 11) {
                        setTimeout(async () => {
                            const players = await getPlayerList(game.id) as Players[];
                            try {
                                // Añade experiencia a los jugadores y coronas solo a los 3 primeros
                                for (let i = 0; i < players.length; i++) {
                                    await addXp(players[i].uuid, Math.trunc(players[i].points / 98), game.id);
                                    if (i < 3) {
                                        switch (i) {
                                            case 0:
                                                await addCrowns(players[i].uuid, 10, game.id);
                                                break;
                                            case 1:
                                                await addCrowns(players[i].uuid, 5, game.id);
                                                break;
                                            case 2:
                                                await addCrowns(players[i].uuid, 3, game.id);
                                                break;
                                            default:
                                                break;
                                        }
                                    }
                                }
                            } catch (error) {
                                console.log(error);
                            }

                            if (game.joinCode) {
                                io.to(game.joinCode).emit('gameOver');
                                setTimeout(async () => {
                                    if (game.joinCode) {
                                        io.to(game.joinCode).emit('results', await getPlayerList(game.id) as Players[]);
                                    await stopGame(game.joinCode);
                                    }
                                }, 1000)
                            }

                        }, 3000);
                    }

                    // Envia la respuesta correcta e indica que se pasa a la siguiente ronda
                    if (game.joinCode) {
                        io.to(game.joinCode).emit('questionResult', correct);
                        setTimeout(() => {
                            if (game.joinCode && game.rounds < 10) {
                                io.to(game.joinCode).emit('nextRound', game.rounds);
                            }
                        }, 3000)
                    }
                }
            });
        } else {
            console.log('User not authenticated');
            socket.disconnect();
        }
    });
}