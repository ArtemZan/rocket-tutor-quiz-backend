import { NextFunction, Request, Response } from "express";
import { match as matchUrl } from "node-match-path"
import { parseAuthHeader, validateJWT } from "../utils/auth"

const openAccessRoutes = [
    "/login",
    "/signup",
    "/refresh-token",
    "/quiz/all"
]

export function authMiddleware(req: Request, resp: Response, next: NextFunction) {
    const isOpenAccess = openAccessRoutes.some(route => matchUrl(route, req.path)?.matches)

    if (isOpenAccess) {
        next()
        return
    }

    const token = parseAuthHeader(req, resp)

    if (!token) {
        return
    }

    const validatedToken = validateJWT(token)

    if (!validatedToken.valid) {
        resp.sendStatus(401)
        return
    }

    resp.locals.parsedJWT = validatedToken.parsed
    next()
}