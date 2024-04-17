import express from "express";
import { getMyCourse, addNewCourse, addStudent, deleteCourse } from "../controllers/MyCourse.js";
const router = express.Router();

router.post("/getmycourse", getMyCourse);
router.post("/addnewcourse", addNewCourse);
router.post("/addstudent", addStudent);
router.post("/deletecourse", deleteCourse);

export default router;