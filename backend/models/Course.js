import {Schema as _Schema, model} from "mongoose";
const Schema = _Schema;

const courseSchema = new Schema({
    maHP: String,
    kiHoc: String,
    maLop: String,
    author: String,
    emailAuthor: String,
    nameCourse: String,
    description: String,
    img: String, // Note : Thêm 1 trường img
    createAt: {
        type: Date,
        default: Date.now,
    },
    deleteAt: {
        type: Date,
        default: function() {
            return new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // Thêm 30 ngày
        }
    }
});

const courseAccountSchema = new Schema({
    email: String,
    role: String,
    maHP: String,
    kiHoc: String,
    maLop: String,
    author: String,
    emailAuthor: String,
    nameCourse: String,
    description: String,
    img: String, // Note : Thêm 1 trường img
    createAt: {
        type: Date,
        default: Date.now,
    },
    deleteAt: {
        type: Date,
        default: function() {
            return new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // Thêm 30 ngày
        }
    }
});

export const CourseModel = model("courses",courseSchema);
export const CourseAccountModel = model("courses-accounts",courseAccountSchema);