import { app } from "../../app";
import { UserModel } from "../../models/user";
import sha256 from "crypto-js/sha256"
import { sendError } from "../../utils/sendError";
import { sign as signJWT } from "jsonwebtoken"
import { createJWTObjectFromUser } from "../../utils/auth";
import { MongooseError } from "mongoose";
import { Request, Response } from "express";

// To do: verify email
app.post("/signup", signup)

async function signup(req: Request, resp: Response){
    const user = req.body

    try {
        const existing = await UserModel.findOne({
            $or: [
                {
                    name: user.name,
                },
                {
                    email: user.email
                }
            ]
        })

        if(existing){
            sendError("The username or email is already in use", resp)
            return
        }

        await UserModel.create({
            name: user.name,
            password: sha256(user.password),
            email: user.email
        })
    }
    catch (error: any) {
        sendError(error, resp)
        return
    }

    resp.status(200).send(createJWTObjectFromUser(user))
}