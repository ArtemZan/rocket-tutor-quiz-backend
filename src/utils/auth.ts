import { Request, Response } from "express"
import { verify as verifyJWT } from "jsonwebtoken"
import { UserType } from "../models/user"
import jwt from "jsonwebtoken"

export function parseAuthHeader(req: Request, resp: Response) {
    const authHeader = req.headers.authorization

    const authHeaderFormatValid = authHeader?.slice(0, 7) === "Bearer "

    if (!authHeader || !authHeaderFormatValid) {
        resp.sendStatus(401)
        return
    }

    return authHeader.slice("Bearer ".length)
}

export function validateJWT(token: string) {
    try {
        const parsed = verifyJWT(token, process.env.JWT_SECRET_KEY as string)

        if (!parsed) {
            return {
                valid: false,
                badSecret: true
            }
        }

        const exp = (parsed as jwt.JwtPayload)?.exp || 0
        const expired = exp * 1000 < Date.now()

        if (expired) {
            return {
                valid: false,
                expired: true
            }
        }

        return {
            valid: true,
            parsed
        }
    }
    catch (e) {
        return {
            valid: false
        }
    }
}

export function createJWTObjectFromUser(user: UserType) {
    const jwtUser = {
        name: user.name,
        email: user.email
    }

    const accessToken = jwt.sign(
        jwtUser,
        process.env.JWT_SECRET_KEY as string,
        { expiresIn: "1m" }
    )

    const refreshToken = jwt.sign(
        jwtUser,
        process.env.JWT_SECRET_KEY as string,
        { expiresIn: "1d" }
    )

    return {
        accessToken,
        refreshToken
    }
}