import {Schema as _Schema, model} from "mongoose"
const Schema = _Schema

const examSchema = new Schema({
    examID: String,
    maHP: String,
    kiHoc: String,
    maLop: String,
    numQuestion: Number,
    title: String,
    type: String,
    question: Object,
    answer: Object,
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
    numQuestion: Number,
    title: String,
    type: String,
    question: Object,
    answer: Object,
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