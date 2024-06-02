import {ExamModel} from "../models/Exam.js"
import { ExamAccountModel } from "../models/ExamAccount.js"

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

export const updateExam = async (req,res) => {
    try {
        const blog = await ExamModel.updateOne({examID: req.body.examID},req.body)
        await ExamAccountModel.deleteMany({examID: req.body.examID})
        res.json(blog)
    } catch(err) {
        res.status(500).json({
            error: err.message
        })
    }
}

export const getExam = async (req,res) => {
    try {
        const exam = await ExamAccountModel.find({examID : req.params.examID,userID : req.body.userID})
        if(exam.length===0) {
            const dataExam = await ExamModel.find({examID : req.params.examID})
            let dataExamAccount = {}
            dataExamAccount.examID      = dataExam[0].examID
            dataExamAccount.userID      = req.body.userID
            dataExamAccount.maHP        = dataExam[0].maHP
            dataExamAccount.kiHoc       = dataExam[0].kiHoc
            dataExamAccount.maLop       = dataExam[0].maLop
            dataExamAccount.title       = dataExam[0].title
            dataExamAccount.questions   = dataExam[0].questions
            dataExamAccount.answers     = dataExam[0].answers
            dataExamAccount.userAnswers = {userAnswers : []}
            dataExamAccount.questions.timeLimit = dataExamAccount.questions.timeLimit*1000 + Date.now()
            try {
                await ExamAccountModel.create(dataExamAccount)
            } catch(err) {
                console.error(err)
            }
            res.json(joinGetExam(dataExamAccount))
        } else {
            res.json(joinGetExam(exam[0]))
        }
    } catch(err) {
        res.status(500).json({
            error: err.message
        })
    }
}

export const updateExamAccount = async (req,res) => {
    try { 
        const exam = await ExamAccountModel.find({examID : req.params.examID,userID : req.body.userID})
        
        let arrayUserAnswers = exam[0].userAnswers.userAnswers
        let newArr = arrayUserAnswers.filter(item => {
            return(
                item.idQuestion !== req.body.answers.idQuestion ||
                item.idOption   !== req.body.answers.idOption ||
                item.type       !== req.body.answers.type
            )
        })
        newArr = [...newArr,req.body.answers]
        let updateData = JSON.parse(JSON.stringify(exam[0]))
        updateData.userAnswers.userAnswers = newArr
        await ExamAccountModel.updateOne({examID : req.params.examID,userID : req.body.userID},updateData)
        res.json({success : "success"})
    } catch(err) {
        res.status(500).json({
            error: err.message
        })
    }
}

const joinGetExam = (data) => {
	const exams = {...data.questions,...data.userAnswers}
	delete data.questions
    
	exams.title = data.title
	delete data.title
	console.log(exams);
	return exams;
}