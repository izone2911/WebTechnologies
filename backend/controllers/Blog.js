import {BlogModel} from "../models/Blog.js";

export const getBlog = async (req,res) => {
    try {
        const blog = await BlogModel.find(req.body)
        res.json(blog)
    } catch(err) {
        res.status(500).json({
            error: err.message
        })
    }
}

export const updateBlog = async (req,res) => {
    try {
        const updateacc = await BlogModel.updateOne({id:req.body.id}, {$set: {title:req.body.title,description:req.body.description,image:req.body.image}});
        res.json({
            message: "Update blog successfull",
            // res: updateacc
        })
    } catch(err) {
        res.status(500).json({
            error: err.message
        })
    }
}

export const createBlog = async (req,res) => {
    try {
        const updateacc = await BlogModel.create(req.body)
        res.json({
            message: "Create blog successfull",
        })
    } catch(err) {
        res.status(500).json({
            error: err.message
        })
    }
}

export const deleteBlog = async (req,res) => {
    try {
        const updateacc = await BlogModel.deleteOne(req.body)
        res.json({
            message: "Create blog successfull",
        })
    } catch(err) {
        res.status(500).json({
            error: err.message
        })
    }
}