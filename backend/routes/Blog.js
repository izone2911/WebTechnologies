import express from "express";
import { createBlog, getFeedBlog, getUserBlog, likePosts } from "../controllers/Blog";

const router = express.Router();
router.post("/createblog", createBlog);
router.post("/getfeedblog", getFeedBlog);
router.post("/:user/posts", getUserBlog);
router.post("/:id/like", likePosts);

export default router;