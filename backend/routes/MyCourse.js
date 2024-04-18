import express from "express";
import { getMyCourse, addNewCourse, addStudent, deleteCourse, updateCourse } from "../controllers/MyCourse.js";
const router = express.Router();

router.post("/getmycourse", getMyCourse);
router.post("/addnewcourse", addNewCourse);
router.post("/addstudent", addStudent);
router.post("/deletecourse", deleteCourse);
router.post("/updatecourse", updateCourse);

export default router;