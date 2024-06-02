import express from "express"
import { getExam, createExam, updateExamAccount, updateExam, deleteExam } from "../controllers/Exam.js"
const router = express.Router()

router.post("/run/:examID",getExam)
router.post("/create",createExam)
router.post("/update/:examID",updateExamAccount)
router.post("/updateExam",updateExam)
router.post("/deleteexam", deleteExam);
export default router