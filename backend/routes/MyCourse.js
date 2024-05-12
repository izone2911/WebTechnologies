import express from "express";
import { getMyCourse, addNewCourse, addStudent, deleteCourse, updateCourse, getCourse, getAllCourse } from "../controllers/MyCourse.js";
const router = express.Router();

router.post("/getmycourse", getMyCourse);
router.post("/addnewcourse", addNewCourse);
router.post("/addstudent", addStudent);
router.post("/deletecourse", deleteCourse);
router.post("/updatecourse", updateCourse);
router.post("/getcourse", getCourse);
router.post("/getallcourse", getAllCourse);

export default router;