import {AccountModel} from "../models/Blog.js"

export const getAccount = async (req,res) => {
    try {
        const blog = await AccountModel.find(req.body)
        res.json(blog)
    } catch(err) {
        res.status(500).json({
            error: err.message
        })
    }
}

export const createAccount = async (req,res) => {
    try {
        console.log(req.body)
        const blog = await AccountModel.create(req.body)
        res.json(blog)
    } catch(err) {
        res.status(500).json({
            error: err.message
        })
    }
}

export const logOut = (req, res) => {
    res
      .clearCookie("access_token", {
        sameSite: "none",
        secure: true,
      })
      .status(200)
      .json("User has been logged out.");
};