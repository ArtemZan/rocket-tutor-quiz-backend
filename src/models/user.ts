import { Schema, model } from "mongoose";

export type UserType = {
    name: string
    email: string
    password: string
}

export const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
})

export const UserModel = model("User", userSchema)