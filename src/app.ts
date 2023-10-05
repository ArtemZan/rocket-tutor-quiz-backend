
import express from "express"
import { authMiddleware } from "./middleware/auth"
import cors from "cors"

export const app = express()

app.listen(process.env.PORT, () => {
    console.log("The app is listening on port: ", process.env.PORT)
})

app.use(cors({origin: "http://localhost:3000"}))

app.use(express.json())

app.use(authMiddleware)

