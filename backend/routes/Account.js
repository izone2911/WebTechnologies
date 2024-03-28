import express from "express"
import { createAccount, getAccount, logOut } from "../controllers/Account.js"
const router = express.Router()

router.post("/login",getAccount)
router.post("/register",createAccount)
router.post("/logout",logOut)

export default router