// helper file already made in utils asyncHandler.js ->iska fyada yeh ki har cheej ko promises,try-catch me nhi dalna pdega 
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponce.js";

//👉 making of controller method (Lecture 13)
// const registerUser = asyncHandler( async (req,res) => {
//     res.status(200).json({ // return not used bec already sends the response to the client.
//         message:"Ok"
//     })
// });

// 👉Lecture 14(LOGIC BULDING):
const registerUser = asyncHandler( async (req,res) => {
    // get user details from frontend
    // validation ->eg:khi user ne empty/incorrect toh nhi bhej diya
    // check if user already Exist -> by username or email 
    // check for images , check for avatar(compulsory)
    // upload these images etc them to cloudinary
    // create user object - create entry in db 
    // remove password nd refresh token field from response
    // check if user created
    // if created then return response  , if not then retrun error 

   const {username,fullname,email,password}= req.body ; // isse data handle kar skte ho json me ayega->par handling bhi krni hai see below
      
   console.log("email:",email) // can check at postman -> body 

//👉  for file handling ->image,avatar => user.routes.js ->registerUser se just phele middleware use kar lo 


if(fullname === ""){ // for validation (check 1 by 1)
    throw new ApiError(400,"fullname is required")
}

if( // Advance approach for validation 
    [username,fullname,email,password].some((fields) =>
    fields?.trim() === "")
){ 
     throw new ApiError(400,"All fields are required") // apierror helper file already made in utils
}


const existedUser = User.findOne({ // checking user exist?
    $or:[{username},{email}]     // 👉operator use by sign "$"
 })      
 
 if(existedUser){
      throw new ApiError(409,"User with email or username already exist")
 }



// 👉middleware add new fields in req ->multer middleware gives req.files
const avatarLocalPath = req.files?.avatar[0]?.path         // avatar ki prop(size,jpeg ..etc) pheli wali le aao
const coverImageLocalPath = req.files?.coverImage[0]?.path

if(!avatarLocalPath){
       throw new ApiError(400,"Avatar file is required")
}


 const avatar = await uploadOnCloudinary(avatarLocalPath)      // upload on cloudinary take time -> so await
 const coverImage = await uploadOnCloudinary(coverImageLocalPath)

 if(!avatar){
           throw new ApiError(400,"Avatar file is required")
 }


 const user = await User.create({// create user and make entry in db  => db se baat User krta hai 
      fullname,
      avatar: avatar.url,
      coverImage:coverImage?.url || "", // cover image not compulsory 
      email,
      password,
      username:username.toLowerCase()
 })    

 // mongodb har ek document ke sath ._id provide krta hai -> so yeah create hua hai ya nhi ID e pta chl jaeyga 
 const createdUser = await User.findById(user._id).select( //👉👉select method me yeh likho jo chej nhi chaihye
  "-password -refreshToken"
 )

 if(!createdUser){
    throw new ApiError(500,"Something went wrong while registering the user")
 }


//  now return responce in structure way using ApiResponce utils
return res.status(201).json(
    new ApiResponse(200,createdUser,"User Registered Successfully")
)

});


export {registerUser} // register default nhi hai yani ->registerUser naam se hi import krna hoga 
// agr register default hai toh naam change krke bhi import kar skte hai 