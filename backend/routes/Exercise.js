import express from "express"
import { getExercise, createExercise, updateExerciseAccount } from "../controllers/Exercise.js"
const router = express.Router()

router.post("/run/:examID",getExercise)
router.post("/create",createExercise)
router.post("/update/:examID",updateExerciseAccount)
export default router