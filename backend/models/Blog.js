import {Schema as _Schema, model} from "mongoose";
const Schema = _Schema;

const BlogSchema = new Schema({
    email:{
        type: String,
        required: true,
    },
    userName:{
        type: String,
        required: true,
    },
    userAvatar: String,
    title: String,
    description: String,
    picturePath: {
        type: String,
        default: null
    },
    likes:{
        type: Array,
        default: []
    },
    comments:{
        type: Array,
        default: []
    }
}, {timestamps: true});

export const BlogModel = model("blogs", BlogSchema);