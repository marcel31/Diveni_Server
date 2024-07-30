import { type Searches, type AIImages, type Guess_Songs } from "@prisma/client";

export interface Question {
    q1: Searches | AIImages | Guess_Songs,
    q2?: Searches | AIImages | Guess_Songs,
    question: {
        id: number,
        idQuestion1: number | null,
        idQuestion2: number | null,
    },
    type: number,
    }