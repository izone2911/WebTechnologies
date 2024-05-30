import {ScoreExamModel} from "../models/ScoreExam.js"
import {ExamModel} from "../models/Exam.js"
import { ExamAccountModel } from "../models/ExamAccount.js"

export const addScore = async (req,res) => {
    try {
        const exam = await ExamModel.find({examID : req.body.examID})
        const answers = exam[0].answers.answers
        
        const userAnswers = req.body.answers
        let numTrue = 0
        let numQues = answers.length

        for(let key of Object.keys(userAnswers)) {
            
            let userAnswer = userAnswers[key]
            let answer     = answers[key]
            let check      = true
            if(userAnswer.length !== answer.length)
                check = false
            else
                for(let i=0; i<answer.length; i++)
                    if(answer[i] !== userAnswer[i])
                        check = false
            if(check) numTrue++
        }

        let tmp = 10*numTrue/numQues
        let score = parseFloat(tmp.toFixed(2))

        const dataExam = await ExamAccountModel.find({examID: req.body.examID,userID: req.body.userID})
        let dataExamAccount = {}
        dataExamAccount.examID      = dataExam[0].examID
        dataExamAccount.userID      = req.body.userID
        dataExamAccount.maHP        = dataExam[0].maHP
        dataExamAccount.kiHoc       = dataExam[0].kiHoc
        dataExamAccount.maLop       = dataExam[0].maLop
        dataExamAccount.title       = dataExam[0].title
        dataExamAccount.questions   = dataExam[0].questions
        dataExamAccount.answers     = dataExam[0].answers
        dataExamAccount.userAnswers = dataExam[0].userAnswers
        dataExamAccount.numTrue     = numTrue
        dataExamAccount.numQues     = numQues
        dataExamAccount.score       = score

        const response = await ExamAccountModel.updateOne({examID: req.body.examID,userID: req.body.userID},dataExamAccount)
        res.json(response)
    } catch(err) {
        res.status(500).json({
            error: err.message
        })
    }
}
