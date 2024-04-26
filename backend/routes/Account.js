import express from "express"
import { changeAccountDetail, createAccount, getAccount, logOut } from "../controllers/Account.js"
const router = express.Router()

router.post("/login",getAccount)
router.post("/register",createAccount)
router.post("/logout",logOut)
router.post("/update", changeAccountDetail)

export default router