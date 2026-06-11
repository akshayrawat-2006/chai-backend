import { Router } from "express";
import { loginUser, logOutUser, registerUser,refreshAccessToken, changeCurrentPassword, getCurrentUser, updateAccountDetails, updateAvatar, updateCoverImage, getUserChannelProfile, getWatchHistory } from "../controllers/user.controllers.js";
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

// Lecture 21;
router.route("/change-password").post(verifyJWT,changeCurrentPassword) // verifyjwt -> yaani logged in wale hi kar paye
router.route("/current-user").post(verifyJWT,getCurrentUser)
router.route("/update-account").patch(verifyJWT,updateAccountDetails)     //👉patch vrna sari details hi update ho jaygi post mai

router.route("/avatar").patch(verifyJWT,upload.single("avatar"),updateAvatar) // avatr ek file bhi aaygi -> so upload
router.route("/cover-image").patch(verifyJWT,upload.single("coverImage"),updateCoverImage)

// 👉profile ke time params me se le rhe hai
router.route("/c/:username").get(verifyJWT,getUserChannelProfile)

router.route("/history").get(verifyJWT,getWatchHistory)





export default router