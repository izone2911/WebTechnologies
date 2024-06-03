import express from "express";
import {createBlog, deleteBlog, getBlog, updateBlog} from "../controllers/Blog.js";

const router = express.Router();

router.post("/get",getBlog)
router.post("/update",updateBlog)
router.post("/create",createBlog)
router.post("/delete",deleteBlog)
export default router;