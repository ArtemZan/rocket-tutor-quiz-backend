import { Request, Response } from "express";
import { app } from "../../app";
import { Option, QuizModel } from "../../models/quiz";
import { MongooseError } from "mongoose";
import { sendError } from "../../utils/sendError";
import { UserModel } from "../../models/user";


app.post("/quiz", createQuiz)

function validateOptionsUnique(options: { value: string }[]) {
    // Not using Array.some or Array.find for the sake of better performance
    for (let i1 = 0; i1 < options.length - 1; i1++) {
        for (let i2 = i1 + 1; i2 < options.length; i2++) {
            if (options[i1].value?.trim() === options[i2].value?.trim()) {
                return false
            }
        }
    }

    return true
}

function getOptionsError(options: Option[]) {
    if (options?.some(op => !op.value?.trim())) {
        return "Empty options are not allowed"
    }

    if (!options || options?.length < 2) {
        return "There must be at least 2 options"
    }

    if (!options.some(op => op.isAnswer)) {
        return "At least one option must be an answer"
    }

    if (!validateOptionsUnique(options)) {
        return "Options must be unique"
    }
}

function getValidationError(body: any) {
    if (!body?.question) {
        return "No question"
    }
    const optionsError = getOptionsError(body?.options)

    if (optionsError) {
        return optionsError
    }
}

async function createQuiz(req: Request, resp: Response) {
    const quiz = req.body

    const JWT = resp.locals?.parsedJWT

    try {
        const validationError = getValidationError(quiz)
        if (validationError) {
            sendError(validationError, resp)
            return
        }

        const author = await UserModel.findOne({
            name: JWT?.name,
            email: JWT?.email
        }).exec()

        if (!author) {
            sendError("User not found", resp)
            return
        }

        await QuizModel.create({
            question: quiz?.question,
            options: quiz?.options,
            author: author?._id
        })
    }
    catch (error: any) {
        sendError(error, resp)
        return
    }

    resp.sendStatus(200)
}