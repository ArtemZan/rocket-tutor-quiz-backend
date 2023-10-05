import { Response } from "express";
import { Error, MongooseError } from "mongoose";

export function sendError(error: any, resp: Response){
    if(error instanceof MongooseError){
        const status = (error instanceof Error.ValidationError) ? 400 : 500
        resp.status(status).send({
            error: error.message
        })
        return
    }

    resp.status(400).send({
        error
    })
}