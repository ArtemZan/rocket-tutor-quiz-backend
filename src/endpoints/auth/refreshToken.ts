import { app } from "../../app";
import { UserType } from "../../models/user";
import { createJWTObjectFromUser, validateJWT } from "../../utils/auth";
import { sendError as sendError } from "../../utils/sendError";

app.post("/refresh-token", (req, resp) => {
    const refreshToken = req.body.refreshToken

    const validated = validateJWT(refreshToken)

    if(!validated.valid){
        sendError(validated.expired ? "Expired token" : "Malicious token", resp)
        return
    }

    resp.status(200).send(createJWTObjectFromUser(validated.parsed as UserType))
})