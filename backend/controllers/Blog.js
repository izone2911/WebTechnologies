import {BlogModel} from "../models/Blog.js";
import { AccountModel } from "../models/Account.js";

export const createBlog = async (req, res) => {
    try {
        const {userId, description, picturePath} = req.body;
        const user = await AccountModel.findById(userId);
        const newPost = new BlogModel({
            email,
            name: user.firstName,
            lastName: user.lastName,
            description,
            userAvatar: user.avatar,
            picturePath,
            likes: {},
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
        const {email} = req.body;
        const post = await BlogModel.findById(id);
        const isLiked = post.likes.get(userId);

        if(isLiked){
            post.likes.delete(email);
        }
        else{
            post.likes.set(email, true);
        }

        const updatedPost = await BlogModel.findByIdAndUpdate(
            id,
            {likes: post.likes},
            {new: true}
        );

        res.status(200).json(updatedPost);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}