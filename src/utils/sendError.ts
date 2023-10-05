import { Response } from "express";
import { MongooseError } from "mongoose";

export function sendError(error: any, resp: Response){
    resp.status(400).send({
        error: error instanceof MongooseError ? error.message : error
    })
}