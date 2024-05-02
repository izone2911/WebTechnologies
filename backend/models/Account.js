import {Schema as _Schema, model} from "mongoose"
const Schema = _Schema

const accountSchema = new Schema({
    email: String,
    password: String,
    role: String,
    name: String,
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