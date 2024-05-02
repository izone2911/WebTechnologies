import {Schema as _Schema, model} from "mongoose"
const Schema = _Schema

const examSchema = new Schema({
    examID: String,//maLop+kiHoc
    maHP: String,
    kiHoc: String,
    maLop: String,
    title: String,
    questions: Object,
    answers: Object,
    createAt: {
        type: Date,
        default: Date.now,
    },
    deleteAt: {
        type: String,
        default: "in use"
    }
})

export const ExamModel = model("exams",examSchema)