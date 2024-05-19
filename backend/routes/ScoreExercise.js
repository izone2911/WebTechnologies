import express from "express"
import { addScore } from "../controllers/ScoreExercise.js"
const router = express.Router()

router.post("/",addScore)

export default router