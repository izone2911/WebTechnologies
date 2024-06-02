import {ScoreExerciseModel} from "../models/ScoreExercise.js"
import {ExerciseModel} from "../models/Exam.js"
import { ExerciseAccountModel } from "../models/ExerciseAccount.js"

export const addScore = async (req,res) => {
    try {
        const exam = await ExerciseModel.find({exerciseID : req.body.examID})
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
        
        const dataExercise = await ExerciseAccountModel.find({exerciseID: req.body.examID,userID: req.body.userID})
        let dataExerciseAccount = {}
        dataExerciseAccount.exerciseID  = dataExercise[0].exerciseID
        dataExerciseAccount.userID      = req.body.userID
        dataExerciseAccount.maHP        = dataExercise[0].maHP
        dataExerciseAccount.kiHoc       = dataExercise[0].kiHoc
        dataExerciseAccount.maLop       = dataExercise[0].maLop
        dataExerciseAccount.title       = dataExercise[0].title
        dataExerciseAccount.questions   = dataExercise[0].questions
        dataExerciseAccount.answers     = dataExercise[0].answers
        dataExerciseAccount.userAnswers = dataExercise[0].userAnswers
        dataExerciseAccount.numTrue     = numTrue
        dataExerciseAccount.numQues     = numQues
        dataExerciseAccount.score       = score

        const response = await ExerciseAccountModel.updateOne({exerciseID: req.body.examID,userID: req.body.userID},dataExerciseAccount)
        res.json(response)
    } catch(err) {
        res.status(500).json({
            error: err.message
        })
    }
}
