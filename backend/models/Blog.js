import {Schema as _Schema, model} from "mongoose";
const Schema = _Schema;

const BlogSchema = new Schema({
    email:{
        type: String,
        required: true,
    },
    name:{
        type: String,
        required: true,
    },
    description: String,
    picturePath: String,
    userAvatar: String,
    likes:{
        type: Map,
        of: Boolean
    },
    comments:{
        type: Array,
        default: []
    }
}, {timestamps: true});

export const BlogModel = model("blogs", BlogSchema);