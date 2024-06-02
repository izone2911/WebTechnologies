import express from "express"
import { getExam, createExam, updateExamAccount, updateExam } from "../controllers/Exam.js"
const router = express.Router()

router.post("/run/:examID",getExam)
router.post("/create",createExam)
router.post("/update/:examID",updateExamAccount)
router.post("/updateExam",updateExam)
export default router