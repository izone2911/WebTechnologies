import express from "express"
import { getExam, createExam } from "../controllers/Exam.js"
const router = express.Router()

router.get("/run/:examID",getExam)
router.post("/create",createExam)

export default router