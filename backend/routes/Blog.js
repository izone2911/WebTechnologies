import express from "express";
import {createBlog, getFeedBlog, getUserBlog, likePosts, commentPosts, getCommentPosts} from "../controllers/Blog.js";

const router = express.Router();
router.post("/createblog", createBlog);
router.post("/getfeedblog", getFeedBlog);
router.post("/:user/posts", getUserBlog);
router.post("/:id/like", likePosts);
router.post("/comment/:id/addcomment", commentPosts);
router.post("/comment/:id/getcomment", getCommentPosts);

export default router;