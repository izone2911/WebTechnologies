import express from "express"
import { createAccount, getAccount,getAllAccount, updateAccount,logOut,deleteAccount, updatePassword } from "../controllers/Account.js"
const router = express.Router()

router.post("/login",getAccount)
router.post("/register",createAccount)
router.post("/logout",logOut)
router.post("/updateaccount", updateAccount);
router.get("/getAll",getAllAccount)
router.post("/delete",deleteAccount)
router.post("/updatePassword",updatePassword)
export default router