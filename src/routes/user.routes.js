import { Router } from "express";
import { registerUser } from "../controllers/user.controllers.js";

const router = Router()

router.route("/register").post(registerUser)

// router.route("/login").post(login) // abb jaise login method bnana hai toh bus yha change krna hai->👉app.js mai kuch change nhi krna

export default router