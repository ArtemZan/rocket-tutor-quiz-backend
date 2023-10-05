import { Request, Response } from "express";
import { app } from "../../app";
import { QuizModel } from "../../models/quiz";
import { MongooseError } from "mongoose";
import { handleMongooseError } from "../../utils/handleMongooseError";


app.post("/quiz", (req, resp) => {
    createQuiz(req, resp)
})

async function createQuiz(req: Request, resp: Response) {
    const quiz = req.body

    try {
        await QuizModel.create({
            question: quiz.question,
            options: quiz.options
        })
    }
    catch (error: any) {
        handleMongooseError(error, resp)
        return
    }

    resp.sendStatus(200)
}