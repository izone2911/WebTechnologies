import express from "express"
import { addScore } from "../controllers/ScoreExam.js"
const router = express.Router()

router.post("/",addScore)

export default router