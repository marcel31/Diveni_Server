import { type Question } from "./question";

export interface QuestionsArray {
    questions: Question[],
    roomCode?: string,
}