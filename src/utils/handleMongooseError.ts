import { Response } from "express";
import { MongooseError } from "mongoose";

export function handleMongooseError(error: MongooseError, resp: Response){
    resp.status(400).send({
        error: error.message
    })
}