import {ScoreExamModel} from "../models/ScoreExam.js"
import {ExamModel} from "../models/Exam.js"

export const addScore = async (req,res) => {
    try {
        console.log(req.body)
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
        
        console.log(numTrue,numQues,score)

        const response = await ScoreExamModel.create({
            userID : req.body.userID,
            examID : req.body.examID,
            numTrue: numTrue,
            numQues: numQues,
            score  : score
        })
        res.json(response)
    } catch(err) {
        res.status(500).json({
            error: err.message
        })
    }
}
