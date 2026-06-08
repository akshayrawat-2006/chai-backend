import { Router } from "express";
import { loginUser, logOutUser, registerUser,refreshAccessToken } from "../controllers/user.controllers.js";
import {upload} from "../middlewares/multer.middlewares.js"
import { verifyJWT } from "../middlewares/auth.middlewares.js";

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


// for logout(lecture 16)
router.route("/login").post(loginUser)

// secured routes 
router.route("/logout").post(verifyJWT,logOutUser) // phele verifyJWT run karo phir next() func cal hoga ->means phir lofOUtUser run karo 
//  phir jab logOutuser pe jayega tab req.user ka acces ho jayega bec verifyJWT se

router.route("/refresh-token").post(refreshAccessToken)



export default router