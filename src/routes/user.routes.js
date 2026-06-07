import { Router } from "express";
import { registerUser } from "../controllers/user.controllers.js";
import {upload} from "../middlewares/multer.middlewares.js"

const router = Router()

router.route("/register").post(
    upload.fields([// upload came from multer
        {
            name:"avatar",
            maxCount:1
        },
        {
            name:"coverImage",
            maxCount:1
        }
    ]) ,    
    registerUser
)

// router.route("/login").post(login) // abb jaise login method bnana hai toh bus yha change krna hai->👉app.js mai kuch change nhi krna

export default router