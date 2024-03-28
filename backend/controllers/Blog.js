import {BlogModel} from "../models/Blog.js"

export const getAllBlogs = async (req,res) => {
    try {
        const blog = await BlogModel.find(req.body)
        res.json(blog)
    } catch(err) {
        res.status(500).json({
            error: err.message
        })
    }
}

export const getBlogById = async (req,res) => {
    try {
        const blog = await BlogModel.findById(req.params.id)
        res.json(blog)
    } catch(err) {
        res.status(500).json({
            error: err.message
        })
    }
}

export const createBlog = async (req,res) => {
    try {
        const blog = await BlogModel.create(req.body)
        res.json(blog)
    } catch(err) {
        res.status(500).json({
            error: err.message
        })
    }
}

export const updateBlog = async (req,res) => {
    try {
        const blog = await BlogModel.findByIdAndUpdate(req.params.id,req.body)
        res.json(blog)
    } catch(err) {
        res.status(500).json({
            error: err.message
        })
    }
}

export const deleteBlog = async (req,res) => {
    try {
        const blog = await BlogModel.findByIdAndDelete(req.params.id)
        res.json(blog)
    } catch(err) {
        res.status(500).json({
            error: err.message
        })
    }
}