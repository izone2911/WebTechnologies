import {ExerciseModel} from "../models/Exam.js"
import { ExerciseAccountModel } from "../models/ExerciseAccount.js"

export const createExam = async (req,res) => {
    try {
        console.log(req.body)
        const blog = await ExerciseModel.create(req.body)
        res.json(blog)
    } catch(err) {
        res.status(500).json({
            error: err.message
        })
    }
}

export const getExam = async (req,res) => {
    try {
        const exam = await ExerciseAccountModel.find({examID : req.params.examID,userID : req.body.userID})
        if(exam.length===0) {
            const dataExam = await ExerciseModel.find({examID : req.params.examID})
            let dataExamAccount = {}
            dataExamAccount.examID      = dataExam[0].examID
            dataExamAccount.userID      = req.body.userID
            dataExamAccount.title       = dataExam[0].title
            dataExamAccount.questions   = dataExam[0].questions
            dataExamAccount.answers     = dataExam[0].answers
            dataExamAccount.userAnswers = {userAnswers : []}
            dataExamAccount.questions.timeLimit = dataExamAccount.questions.timeLimit
            try {
                await ExerciseAccountModel.create(dataExamAccount)
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
        const exam = await ExerciseAccountModel.find({examID : req.params.examID,userID : req.body.userID})
        
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
        await ExerciseAccountModel.updateOne({examID : req.params.examID,userID : req.body.userID},updateData)
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