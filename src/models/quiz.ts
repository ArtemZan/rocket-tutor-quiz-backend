import { ObjectId } from "mongodb";
import { Document, Schema, model } from "mongoose";

export type Option = {
    value: string
    isAnswer: boolean
    id: string
}

export type QuizType = {
    question: string
    options: Option[]
}


export const quizSchema = new Schema(
    {
        question: {
            type: String,
            required: true
        },
        options: {
            type: [
                {
                    type: {
                        value: String,
                        isAnswer: Boolean,
                        id: ObjectId
                    }
                }
            ],
            required: true,
            validate: {
                validator: (array: string[]) => {
                    return !!array && array?.length >= 2
                },
                message: () => `There must be at least two options.`
            }
        }
    }
)

function createOptionResponseDTO(option: Option & {_id: string}){
    const { _id, isAnswer, ...withoutExtra } = option
    return {
        ...withoutExtra,
        id: _id
    }
}

export function createQuizResponseDTO(quiz: Document<unknown, {}, QuizType>) {
    const { _id, __v, ...withoutExtra } = quiz
    return {
        ...withoutExtra,
        options: (withoutExtra as any).options?.map(createOptionResponseDTO),
        id: _id
    }
}

export const QuizModel = model("Quiz", quizSchema)