import {ExamModel} from "../models/Exam.js"

export const createExam = async (req,res) => {
    try {
        console.log(req.body)
        const blog = await ExamModel.create(req.body)
        res.json(blog)
    } catch(err) {
        res.status(500).json({
            error: err.message
        })
    }
}

export const getExam = async (req,res) => {
    try {
        const exam = await ExamModel.find({examID : req.params.examID})
        console.log(joinGetExam(exam[0]))
        res.json(joinGetExam(exam[0]))
    } catch(err) {
        res.status(500).json({
            error: err.message
        })
    }
}

const joinGetExam = (data) => {
	const exams = {...data.questions}
	delete data.questions

	exams.id = data.id
	delete data.id

	exams.title = data.title
	delete data.title
	console.log(exams);
	return exams;
}