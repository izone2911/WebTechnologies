import express from "express"
import { getExam } from "../controllers/Exam.js"
const router = express.Router()

router.get("/run/:examID ",getExam)

export default router