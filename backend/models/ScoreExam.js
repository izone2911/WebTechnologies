import {Schema as _Schema, model} from "mongoose"
const Schema = _Schema

const scoreExamSchema = new Schema({
    userID: String, // = email
    examID: String, // = examID
    numTrue: Number,
    numQues: Number,
    score: Number, 
    createAt: {
        type: Date,
        default: Date.now,
    },
    deleteAt: {
        type: String,
        default: "in use"
    }
})

export const ScoreExamModel = model("score_exams",scoreExamSchema)