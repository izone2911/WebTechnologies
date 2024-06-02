import {ExerciseModel} from "../models/Exam.js"
import { ExamAccountModel } from "../models/ExamAccount.js"
import { ExerciseAccountModel } from "../models/ExerciseAccount.js"

export const createExercise = async (req,res) => {
    try {
        const blog = await ExerciseModel.create(req.body)
        res.json(blog)
    } catch(err) {
        res.status(500).json({
            error: err.message
        })
    }
}

export const getExercise = async (req,res) => {
    try {
        const exam = await ExerciseAccountModel.find({exerciseID : req.params.examID,userID : req.body.userID})
        if(exam.length===0) {
            const dataExam = await ExerciseModel.find({exerciseID : req.params.examID})
            let dataExamAccount = {}
            dataExamAccount.exerciseID      = dataExam[0].exerciseID
            dataExamAccount.userID      = req.body.userID
            dataExamAccount.title       = dataExam[0].title
            dataExamAccount.maHP        = dataExam[0].maHP
            dataExamAccount.kiHoc       = dataExam[0].kiHoc
            dataExamAccount.maLop       = dataExam[0].maLop
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

export const updateExerciseAccount = async (req,res) => {
    try { 
        const exam = await ExerciseAccountModel.find({exerciseID : req.params.examID,userID : req.body.userID})
        
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
        await ExerciseAccountModel.updateOne({exerciseID : req.params.examID,userID : req.body.userID},updateData)
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
	return exams;
}

export const deleteExcercise = async (req,res) => {
    try {
        const excercise = req.body.excercise;
        await ExerciseModel.deleteOne({ exerciseID: excercise.exerciseID });
        await ExamAccountModel.deleteMany({exerciseID: excercise.exerciseID})

        res.json({
            message: "Delete exam successful"
        });
    } catch(err) {
        res.status(500).json({
            error: err.message
        })
    }
}