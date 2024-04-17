import {ExamModel} from "../models/Exam.js"

export const getExam = async (req,res) => {
    try {
        const blog = await ExamModel.find(req.params.examID)
        res.json(blog)
    } catch(err) {
        res.status(500).json({
            error: err.message
        })
    }
}