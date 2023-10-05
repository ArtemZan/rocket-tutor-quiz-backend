import { MongooseError } from "mongoose";
import { app } from "../../app";
import { UserModel } from "../../models/user"
import sha256 from "crypto-js/sha256";
import jwt from "jsonwebtoken";
import { createJWTObjectFromUser } from "../../utils/auth";
import { handleMongooseError } from "../../utils/handleMongooseError";

app.post("/login", async (req, resp) => {
    const encryptedPassword = sha256(req.body.password)

    try {
        const user = await UserModel.findOne({
            password: encryptedPassword,
            $or: [
                {
                    name: req.body.username
                },
                {
                    email: req.body.email
                }
            ]
        }).exec()

        if (!user) {
            throw new MongooseError("Wrong credentials")
        }

        resp.status(200).send(createJWTObjectFromUser(user))
    }
    catch (error: any) {
        handleMongooseError(error, resp)
    }
})