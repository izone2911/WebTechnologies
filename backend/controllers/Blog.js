import {BlogModel} from "../models/Blog.js";
import { AccountModel } from "../models/Account.js";

export const createBlog = async (req, res) => {
    try {
        console.log(req.body.data);
        const {email, title, description, picturePath} = req.body.data;
        console.log("Email : ", email);

        const user = await AccountModel.findOne({email});
        console.log(user.name);

        const newPost = new BlogModel({
            email,
            userName: user.name,
            userAvatar: user.avatar,
            title,
            description,
            picturePath,
            likes: [],
            comments: []
        });
        await newPost.save();

        const post = await BlogModel.find();
        res.status(201).json(post);
    } catch (error) {
        res.status(409).json({message: error.message});
    }
};

// READ
export const getFeedBlog = async (req, res) => {
    try {
        const post = await BlogModel.find();
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

export const getUserBlog = async (req, res) => {
    try {
        const {email} = req.params;
        const post = await BlogModel.find({email});
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

// UPDATE
export const likePosts = async (req, res) => {
    try {
        const {id} = req.params;
        const {emailCurrentUser} = req.body;
        console.log("id : " + id);
        console.log("email : " + emailCurrentUser);

        const blog = await BlogModel.findById(id);
        
        // const myMap = new Map(blog.likes);
        if(blog != null){
            var isLiked = false;
            const index = blog.likes.indexOf(emailCurrentUser);
            if(index != -1) isLiked = true;
            console.log(blog.likes);
            console.log(isLiked);
            console.log("ok" + blog);

            if (isLiked) {
                console.log("User already liked the post, removing like.");
                blog.likes.splice(index, 1);
            } 
            else {
                console.log("User has not liked the post, adding like.");
                blog.likes.push(emailCurrentUser);
            }
            await blog.save();
            console.log("Done");
            res.status(200).json({isLiked, numberLike: blog.likes.length});
        }       

    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

export const getNumberLiked = async (req, res) => {
    try {
        const {id} = req.params;
        const {emailCurrentUser} = req.body;
        console.log("id : " + id);
        console.log("email : " + emailCurrentUser);

         if(id == undefined){
            console.log(id);
            res.status(201).json({isLiked: false, numberLike: 0});
            return;
         }

        const blog = await BlogModel.findById(id);
        
        // const myMap = new Map(blog.likes);
        if(blog != null){
            var isLiked = false;
            const index = blog.likes.indexOf(emailCurrentUser);
            if(index != -1) isLiked = true;
            console.log(blog.likes);
            console.log(isLiked);
            console.log("Done");
            res.status(200).json({isLiked, numberLike: blog.likes.length});
        }       

    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

export const getCommentPosts = async (req, res) => {
    try {
        const {id} = req.params;
        const {emailCurrentUser} = req.body;
        console.log("id : " + id);
        console.log("email : " + emailCurrentUser);

        if(id == undefined){
            console.log(id);
            res.status(201).json([]);
            return;
        }

        const blog = await BlogModel.findById(id);
        console.log(blog.comments);
        const cmt = blog.comments;
        // console.log(cmt);
        res.status(200).json(cmt);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

export const commentPosts = async (req, res) => {
    try {
        const {id} = req.params;
        const {emailCurrentUser, comment} = req.body;
        console.log("id : " + id);
        console.log("email : " + emailCurrentUser);
        console.log("comment : " + comment);

        const blog = await BlogModel.findById(id);
        blog.comments.push(comment);
        await blog.save();

        res.status(200).json({message: "add comment successfull"});
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}