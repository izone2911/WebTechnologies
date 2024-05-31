import express from "express"
import { createAccount, getAccount, updateAccount,logOut } from "../controllers/Account.js"
const router = express.Router()

router.post("/login",getAccount)
router.post("/register",createAccount)
router.post("/logout",logOut)
router.post("/updateaccount", updateAccount);

export default router