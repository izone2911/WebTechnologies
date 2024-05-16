import {Schema as _Schema, model} from "mongoose"
const Schema = _Schema

const examAccountSchema = new Schema({
    examID: String,//maLop+kiHoc
    userID: String,
    maHP: String,
    kiHoc: String,
    maLop: String,
    title: String,
    userAnswers: Object,
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

export const ExamAccountModel = model("exam_accounts",examAccountSchema)