import {Schema as _Schema, model} from "mongoose"
const Schema = _Schema

const scoreExerciseSchema = new Schema({
    userID: String, // = email
    exerciseID: String, // = exerciseID
    numTrue: Number,
    numQues: Number,
    score: Number, 
    createAt: {
        type: Date,
        default: Date.now,
    },
    deleteAt: {
        type: String,
        default: "in use"
    }
})

export const ScoreExerciseModel = model("score_exercises",scoreExerciseSchema)