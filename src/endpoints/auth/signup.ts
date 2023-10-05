import { app } from "../../app";
import { UserModel } from "../../models/user";
import sha256 from "crypto-js/sha256"
import { handleMongooseError } from "../../utils/handleMongooseError";
import { sign as signJWT } from "jsonwebtoken"
import { createJWTObjectFromUser } from "../../utils/auth";
import { MongooseError } from "mongoose";

// To do: verify email
app.post("/signup", async (req, resp) => {
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
            throw new MongooseError("The username or email is already in use.")
        }

        await UserModel.create({
            name: user.name,
            password: sha256(user.password),
            email: user.email
        })
    }
    catch (error: any) {
        handleMongooseError(error, resp)
        return
    }

    resp.status(200).send(createJWTObjectFromUser(user))
})