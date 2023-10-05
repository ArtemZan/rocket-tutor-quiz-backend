import { app } from "../../app";
import { UserType } from "../../models/user";
import { createJWTObjectFromUser, validateJWT } from "../../utils/auth";

app.post("/refresh-token", (req, resp) => {
    const refreshToken = req.body.refreshToken

    const validated = validateJWT(refreshToken)

    if(!validated.valid){
        resp.status(400).send({
            error: validated.expired ? "Expired token" : "Malicious token"
        })
        return
    }

    resp.status(200).send(createJWTObjectFromUser(validated.parsed as UserType))
})