import {Schema as _Schema, model} from "mongoose";
const Schema = _Schema;

const BlogSchema = new Schema({
    
});

export const BlogModel = model("blogs", BlogSchema);