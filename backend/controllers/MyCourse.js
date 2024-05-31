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
        const examAccounts = await ExamAccountModel.find({maLop,userID: req.body.userID})
        const exerciseAccounts = await ExerciseAccountModel.find({maLop,userID: req.body.userID})
        console.log(exams)
        const newExams = exams.map((examItem) => {
            let newItems = {}
            newItems.examID      = examItem.examID
            newItems.maHP        = examItem.maHP
            newItems.kiHoc       = examItem.kiHoc
            newItems.maLop       = examItem.maLop
            newItems.title       = examItem.title
            newItems.numQuestion = examItem.questions.questions.length
            for(let i=0;i<examAccounts.length;i++){
                let examAccountItem = examAccounts[i]
                if(examItem.examID === examAccountItem.examID){
                    if(examAccountItem?.numQues){
                        newItems.numTrue = examAccountItem.numTrue
                        newItems.numQues = examAccountItem.numQues
                        newItems.score   = examAccountItem.score
                    } else {
                        newItems.numTrue = -100
                        newItems.numQues = -100
                        newItems.score   = -100
                    }
                }
            }

            return newItems
        })

        console.log("newExams",newExams)
        res.json({
            course: course,
            exams: newExams,
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
