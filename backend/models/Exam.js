import {Schema as _Schema, model} from "mongoose"
const Schema = _Schema

const examSchema = new Schema({
    examID: String,//maLop+maHP+kiHoc++title
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
});

const exerciseSchema = new Schema({
    exerciseID: String,
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
});

export const ExamModel = model("exams",examSchema);
export const ExerciseModel = model("exercises",exerciseSchema);