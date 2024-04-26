import {Schema as _Schema, model} from "mongoose"
const Schema = _Schema

const accountSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: String,
    fullname: String,
    role: String,
    createAt: {
        type: Date,
        default: Date.now,
    }
})

export const AccountModel = model("accounts",accountSchema)