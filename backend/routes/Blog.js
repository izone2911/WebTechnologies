import express from "express";
import {createBlog, getFeedBlog, getUserBlog, likePosts, getNumberLiked, commentPosts, getCommentPosts} from "../controllers/Blog.js";

const router = express.Router();
router.post("/createblog", createBlog);
router.post("/getfeedblog", getFeedBlog);
router.post("/:user/posts", getUserBlog);
router.post("/:id/like", likePosts);
router.post("/:id/numberlike", getNumberLiked);
router.post("/comment/:id/addcomment", commentPosts);
router.post("/comment/:id/getcomment", getCommentPosts);

export default router;