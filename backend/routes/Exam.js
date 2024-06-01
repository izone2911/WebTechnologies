import express from "express"
import { getExam, createExam, updateExamAccount, deleteExam } from "../controllers/Exam.js"
const router = express.Router()

router.post("/run/:examID",getExam)
router.post("/create",createExam)
router.post("/update/:examID",updateExamAccount)
router.post("/deleteexam", deleteExam);
export default router