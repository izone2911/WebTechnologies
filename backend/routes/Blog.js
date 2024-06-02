import express from "express";
import {createBlog, getFeedBlog, getUserBlog, likePosts, commentPosts} from "../controllers/Blog.js";

const router = express.Router();
router.post("/createblog", createBlog);
router.post("/getfeedblog", getFeedBlog);
router.post("/:user/posts", getUserBlog);
router.post("/:id/like", likePosts);
router.post("/comment/:id/cmt", commentPosts);

export default router;