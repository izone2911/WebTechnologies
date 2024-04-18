import { CourseModel } from "../models/Course.js";
import { CourseAccountModel } from "../models/Course.js";

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

export const addNewCourse = async (req,res) => {
    try {
        const blog = await CourseModel.create(req.body);
        const tmp = {
            email: blog.emailAuthor,
            role: "lecturer",
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
            role: "student",
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
        // const blog = req.body.course;
        // await CourseModel.update({ maLop: blog.maLop }, {$set: {nameCourse: blog.nameCourse}});

        // await CourseAccountModel.updateMany({ maLop: blog.maLop }, {$set: {nameCourse: blog.nameCourse}});

        res.json({
            message: "Update course successful"
        });
    } catch(err) {
        res.status(500).json({
            error: err.message
        })
    }
}
