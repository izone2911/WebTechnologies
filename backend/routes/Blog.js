import express from "express"
import {getAllBlogs, getBlogById, deleteBlog, updateBlog, createBlog} from "../controllers/Blog.js"

const router = express.Router()

router.post("/get",getAllBlogs)
router.get("/:id",getBlogById)
router.post("/",createBlog)
router.put("/:id",updateBlog)
router.delete("/:id",deleteBlog)

export default router