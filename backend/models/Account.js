import {Schema as _Schema, model} from "mongoose"
const Schema = _Schema

const accountSchema = new Schema({
    email: String,
    password: String,
    name: String,
    avatar: {
        type: String,
        default: "https://w7.pngwing.com/pngs/205/731/png-transparent-default-avatar-thumbnail.png"
    },
    gender: {
        type: String
    },
    birthDay: Date,
    phone: String,
    createAt: {
        type: Date,
        default: Date.now,
    },
    deleteAt: {
        type: String,
        default: "in use"
    }
})

export const AccountModel = model("accounts",accountSchema)