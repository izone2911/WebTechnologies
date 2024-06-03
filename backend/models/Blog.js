import {Schema as _Schema, model} from "mongoose";
const Schema = _Schema;

const BlogSchema = new Schema({
    id:String,//title+email+title
    email: String,
    title: String,
    description: String,
    image: String,
    createAt: {
        type: Date,
        default: Date.now
    }
});

export const BlogModel = model("blogs", BlogSchema);