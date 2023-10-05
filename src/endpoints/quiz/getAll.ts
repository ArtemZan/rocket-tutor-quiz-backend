import { Request, Response } from "express";
import { app } from "../../app";
import { QuizModel, createQuizResponseDTO } from "../../models/quiz";
import { getPaginationOptions } from "../../utils/pagination"
import { handleMongooseError } from "../../utils/handleMongooseError";

app.get("/quiz/all", async (req, resp) => {
    const pagination = getPaginationOptions(req.query as any)
    if (!pagination) {
        resp.status(400).send({
            error: "Invalid pagination"
        })
        return
    }

    try {
        const quizzes = await QuizModel.find({}, null, { ...pagination }).exec()
        const total = await QuizModel.count()

        const DTO = JSON.parse(JSON.stringify(quizzes)).map(createQuizResponseDTO)

        resp.status(200).send({
            total,
            array: DTO
        })
    }
    catch (error: any) {
        handleMongooseError(error, resp)
    }
})