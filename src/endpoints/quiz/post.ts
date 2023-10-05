import { Request, Response } from "express";
import { app } from "../../app";
import { QuizModel } from "../../models/quiz";
import { MongooseError } from "mongoose";
import { sendError } from "../../utils/sendError";


app.post("/quiz", createQuiz)

async function createQuiz(req: Request, resp: Response) {
    const quiz = req.body

    try {
        await QuizModel.create({
            question: quiz.question,
            options: quiz.options
        })
    }
    catch (error: any) {
        sendError(error, resp)
        return
    }

    resp.sendStatus(200)
}