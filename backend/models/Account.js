import {Schema as _Schema, model} from "mongoose"
const Schema = _Schema

const accountSchema = new Schema({
    email: String,
    password: String,
    createAt: {
        type: Date,
        default: Date.now,
    }
})

export const AccountModel = model("accounts",accountSchema)