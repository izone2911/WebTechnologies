import {Schema as _Schema, model} from "mongoose"
const Schema = _Schema

const blogSchema = new Schema({
    title: String,
    body: String,
    description: String,
    createAt: {
        type: Date,
        default: Date.now,
    }
})

const accountSchema = new Schema({
    email: String,
    password: String,
    createAt: {
        type: Date,
        default: Date.now,
    }
})

export const BlogModel = model("newcollections",blogSchema)
export const AccountModel = model("accounts",accountSchema)