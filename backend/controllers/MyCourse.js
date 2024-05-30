import { CourseModel } from "../models/Course.js";
import { CourseAccountModel } from "../models/Course.js";
import { ExamModel, ExerciseModel } from "../models/Exam.js";
import { ExamAccountModel } from "../models/ExamAccount.js";
import { ExerciseAccountModel } from "../models/ExerciseAccount.js";

export const getMyCourse = async (req,res)=>{
    const {email} = req.body;

    try {
        const blog = await CourseAccountModel.find({email})
        res.json(blog)
    } catch(err) {
        res.status(500).json({
            error: err.message
        })
    }
}

export const getCourse = async (req, res) => {
    const maLop = req.body.maLop.id
    try {
        const course = await CourseModel.find({maLop});
        const exams = await ExamModel.find({maLop});
        const exercises = await ExerciseModel.find({maLop});
        res.json({
            course: course,
            exams: exams,
            exercises: exercises
        });
    } catch(err) {
        res.status(500).json({
            error: err.message
        })
    }
}

export const getAllCourse = async (req, res) => {
    try {
        const courses = await CourseModel.find();
        res.json({
            courses: courses,
        });
    } catch(err) {
        res.status(500).json({
            error: err.message
        })
    }
}

export const addNewCourse = async (req,res) => {
    try {
        const blog = await CourseModel.create(req.body);
        const tmp = {
            email: blog.emailAuthor,
            role: "Teacher",
            maHP: blog.maHP,
            kiHoc: blog.kiHoc,
            maLop: blog.maLop,
            author: blog.author,
            emailAuthor: blog.email,
            nameCourse: blog.nameCourse,
            description: blog.description,
            img: blog.img,
            createAt: blog.createAt,
            deleteAt: blog.deleteAt
        };
        const newItem = CourseAccountModel.create(tmp);
        res.json(blog);
    } catch(err) {
        res.status(500).json({
            error: err.message
        })
    }
}

export const addStudent = async (req,res) => {
    try {
        const blog = req.body.course;
        const email_student = req.body.student;
        const tmp = {
            email: email_student,
            role: "Student",
            maHP: blog.maHP,
            kiHoc: blog.kiHoc,
            maLop: blog.maLop,
            author: blog.author,
            emailAuthor: blog.email,
            nameCourse: blog.nameCourse,
            description: blog.description,
            img: blog.img,
            createAt: blog.createAt,
            deleteAt: blog.deleteAt
        };
        const newItem = CourseAccountModel.create(tmp);
        res.json(blog);
    } catch(err) {
        res.status(500).json({
            error: err.message
        })
    }
}

export const deleteCourse = async (req,res) => {
    try {
        const blog = req.body.course;
        await CourseModel.deleteMany({ maLop: blog.maLop });

        await CourseAccountModel.deleteMany({ maLop: blog.maLop });

        res.json({
            message: "Delete course successful"
        });
    } catch(err) {
        res.status(500).json({
            error: err.message
        })
    }
}

export const updateCourse = async (req,res) => {
    try {
        const blog = req.body.course;
        await CourseModel.updateOne({ maLop: blog.maLop }, {$set: {nameCourse: blog.nameCourse}});
        await CourseAccountModel.updateMany({ maLop: blog.maLop }, {$set: {nameCourse: blog.nameCourse}});

        res.json({
            message: "Update successfully"
        });
    } catch(err) {
        res.status(500).json({
            error: err.message
        })
    }
}
