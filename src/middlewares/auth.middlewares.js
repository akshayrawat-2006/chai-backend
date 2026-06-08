// verify user ha ya nhi 

import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken"
import { User } from "../models/user.models.js";

// jb login hua toh access aur refresh token diye -> inhe hi compare kiya agr shi token hai toh true login 
// if true login then add new object in req (req.user)
export const verifyJWT = asyncHandler(async(req,res,next) =>{
  try {
    const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ","") // postman se header bheja ho : eg:Authoirization :Bearer accessToken
  
    if(!token){
      throw new ApiError(401,"Unauthorized request")
    }

  
  //  👉 is token present -> then jwt ki mdad se pucho shi hai ya nhi 
  const decodedToken = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET) // secret bhi chahiye har koi verify ka kar paye
  
  const user = await User.findById(decodedToken?._id).select("-password -refreshToken")
  
  if(!user){
      throw new ApiError(401,"Invalid Access Token ")
  }
  
  req.user = user //req.akshay koi bhi naam de skte hai 
  
  next()
  } catch (error) {
    throw new ApiError(401,error?.message || "Invalid Acces TOken")
  }
//   now go to route


})