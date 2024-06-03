import {AccountModel} from "../models/Account.js"

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

export const getAllAccount = async (req,res) => {
    try {
        const acc = await AccountModel.find({})
        res.json(acc)
    } catch(err) {
        res.status(500).json({
            error: err.message
        })
    }
}


export const deleteAccount = async (req,res) => {
    try {
        const acc = await AccountModel.deleteMany({email: {$in : req.body}})
        res.json(acc)
    } catch(err) {
        res.status(500).json({
            error: err.message
        })
    }
}

export const createAccount = async (req,res) => {
    try {
        const blog = await AccountModel.create(req.body)
        res.json(blog)
    } catch(err) {
        res.status(500).json({
            error: err.message
        })
    }
}

export const updateAccount = async (req,res) => {
    try {
        const blog = req.body.acc;
        const {email, password, name, gender, birthDay, avatar, phone} = blog;
        const updateacc = await AccountModel.updateOne({email}, {$set: {password, name, gender, birthDay, avatar, phone}});
        res.json({
            message: "Update account successfull",
            // res: updateacc
        })
    } catch(err) {
        res.status(500).json({
            error: err.message
        })
    }
}

export const updatePassword = async (req,res) => {
    try {
        const updateacc = await AccountModel.updateOne({email:req.body.email}, {$set: {password:req.body.password}});
        res.json({
            message: "Update password successfull",
            // res: updateacc
        })
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