// helper file already made in utils asyncHandler.js ->iska fyada yeh ki har cheej ko promises,try-catch me nhi dalna pdega 
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponce.js";
import Jwt  from "jsonwebtoken";
import mongoose from "mongoose";

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


const existedUser =await User.findOne({ // checking user exist?
    $or:[{username},{email}]     // 👉operator use by sign "$"
 })      
 
 if(existedUser){
      throw new ApiError(409,"User with email or username already exist")
 }



// 👉middleware add new fields in req ->multer middleware gives req.files
const avatarLocalPath = req.files?.avatar[0]?.path         // avatar ki prop(size,jpeg ..etc) pheli wali le aao
// const coverImageLocalPath = req.files?.coverImage[0]?.path 

let coverImageLocalPath;
if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length >0) {
    coverImageLocalPath = req.files.coverImage[0].path ; 
}

if(!avatarLocalPath){
       throw new ApiError(400,"Avatar file is required")
}


 const avatar = await uploadOnCloudinary(avatarLocalPath)      // upload on cloudinary take time -> so await
 const coverImage = await uploadOnCloudinary(coverImageLocalPath) // if path nhi mil rha then cloudinary will retrun empty string 

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

 // mongodb har ek document ke sath ._id provide krta hai 👉BSON data mai -> so yeah create hua hai ya nhi ID e pta chl jaeyga 
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

const generateAccessAndRefreshTokens = async(userId) =>{
try {
   const user =  await User.findById(userId)
  const accessToken = user.generateAccessToken() //  generateAccessToken, generateRefreshToken already defined in user.models.js
  const refreshToken  = user.generateRefreshToken()

  user.refreshToken = refreshToken;
  await user.save({validateBeforeSave:false}) // aise me aur bhi cheeje jaise password require tha woh error dete hai kyoki hmne sirf rereshToken ko add krke save kraya hai

// idhar refreshToken,accesToken dono hai aur refreshToken db me save ho chuka hai so return
return {accessToken,refreshToken}

} catch (error) {
    throw new ApiError(500,"Somethinf went wrong while generating refresh and access token")
}
}

//👉 Lecture 16(loginUser):-
const loginUser = asyncHandler(async(req,res) =>{
    // req body se data le aao
    // username or email 
    // find the user 
    //user already exist ->pass word check , is not exist -> then sign up 
    // is password correct -> generate acces and refresh token 
    // inn tokens ko bhej do (send to cookie)


    const {email,username,password} = req.body;
 
    //hmara login page me -> username aur email me se kisi se bhi login kra skte ho 

    if(!(username || email)){ // username aur email dono nhi hai 
      throw new ApiError(400,"username or email is requuired")
    }

    // ya toh email dhund do ya toh username dhund do  -> or operator
    // db dusre continent mai -> so use await
  const user = await User.findOne({// findOne -> jaise hi pheli enttry mil jaygi woh de dega
     $or:[{username},{email}]
   }) 

   if(!user){
      throw new ApiError(404,"user does not exist")
   }

   const isPasswordValid = await user.isPasswordCorrect(password) // isPasswordCorrect-> made in user.models.js

 if(!isPasswordValid){
      throw new ApiError(401,"Password Incorrect ,Invalid user credentials")
   }

// access and refresh token bar bar generate hote hai -> so ek different method bna lete hai -> to go top ->generateAccessAndRefreshTokens
const {accessToken,refreshToken}= await generateAccessAndRefreshTokens(user._id)


// yha pe refernce line140 wale user ka hai aur token ki call 155 me mari hai -> woh abhi empty hai
// 1 way -> can update it , 2nd way -> ek aur db quiery mar do (if calling an db is not exprensive for you)
const loggedInUser = await User.findById(user._id).select("-password -refreshToken") // pass,refresh ko mat bhejo

const options ={// send cookies
 httpOnly:true, // 👉aab cookies sirf server se modify hogi na ki frontent se
 secure:false
}    
return res.status(200).cookie("accessToken",accessToken,options).cookie("refreshToken",refreshToken,options).json(
    new ApiResponse(200,{user:loggedInUser,accessToken,refreshToken},"User LoggeIn successfully") //yeh ek achi practise hai ki dubara access aur refresh token bheje hai agr kisi vajah se logginUser me nhi aye hai toh 
)
 
})

const logOutUser = asyncHandler(async(req,res) => {
    // yha pe user._id kha se laye -> so create middleware ->auth.middlewares.js

   await User.findByIdAndUpdate(
        req.user._id,
        {
            $set:{ //👉 ki kya kya update karna hai 
                refreshToken:undefined,


            }
        },
        {
            new:true
        }
    )

    const options ={
    httpOnly:true,
    secure:false
}  
return res.status(200).clearCookie("accessToken",options).clearCookie("refreshToken",options).json(new ApiResponse(200,{},"User logged Out"))
})


// 👉Lecture 17
const refreshAccessToken= asyncHandler(async(req,res) =>{
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken //👉Many mobile apps don't automatically use browser cookies. -> so using by req.body

    if(!incomingRefreshToken){
        throw new ApiError(401,"Unauthorized request")
    }

 try {
      const decodedToken =  Jwt.verify(incomingRefreshToken,process.env.REFRESH_TOKEN_SECRET)
   
      const user = await User.findById(decodedToken?._id);
       if(!user){
           throw new ApiError(401,"Invalid Refresh Token ")
       }
   
       // abb match krenge incommin token ko aur jo decodedtoken ko use krke user find kiya hai use pass jo token hai 
       if(incomingRefreshToken !== user?.refreshToken){
            throw new ApiError(401,"Refresh Token is expired or used")
       }
   
       // means both are same so generate new access token =>cookies me bhejna hai toh options bhi rkhne honge 
       const options ={
           httpOnly:true,
           secure:false
       }
   
    const {accessToken,newRefreshToken} =  await generateAccessAndRefreshTokens(user._id);
   
      return res.status(200).cookie("accessToken",accessToken,options).cookie("refreshToken",newRefreshToken,options).json(new ApiResponse(200,{accessToken,refreshToken:newRefreshToken},"Access Token Refreshed "))
 } catch (error) {
    throw new ApiError(401,error?.message || "Invalid Refresh Token")
 }

})


// 👉Lecture 18:
const changeCurrentPassword = asyncHandler(async(req,res)=>{
    const {oldPassword,newPassword} = req.body

    // user chahiye hoga tabhi toh pass chnage kar paunga
    // agr pass change krna hai -> to login toh hai hi ->aur login kaise ho payega kyoki middleware lga hai ->aur auth middleware chla hai toh ->req.user se user nikal skte hai 
   const user = await User.findById( req.user?._id)

 const isPasswordCorrect=  await user.isPasswordCorrect(oldPassword)
 
 if(!isPasswordCorrect){
    throw new ApiError(400,"Invalid old password")
 }

//  yani yha tak old password thik hai aab nya password set krna hai 
       user.password = newPassword;
await user.save({validateBeforeSave:false});

return res.status(200).json(new ApiResponse(200,{},"Password change successfully"))

})

//👉 agr user login hai toh usse curr user asani se de skte hai ->bec of middleware
const getCurrentUser =asyncHandler(async(req,res)=>{
    return res.status(200).json(new ApiResponse(200,req.user,"current user fetched successfully"))
}) 

const updateAccountDetails = asyncHandler(async(req,res)=>{
    const {fullname , email} =req.body;

    if(!fullname || !email){
        throw new ApiError(400,"All fields are required")
    }

  const user = await User.findByIdAndUpdate( req.user?._id,{
    $set:{
      fullname:fullname,
      email:email
  }
},{new:true}).select("-password") // new :true se update hone ke baad jo info hai woh return hoti hai 

return res.status.json(new ApiResponse(200,"Account detais updated successfully"))

})

// abb files update krni hai ->toh multer middleware ka use hoga taaki files accept kar pao , aur vhi update kar payenge jo login ho ->auth middleware
const updateAvatar = asyncHandler(async(req,res)=>{
    // multer -> req.files
  const avatarLocalPath =req.file?.path

  if(!avatarLocalPath){
         throw new ApiError(400,"Avatar file is missing ")
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath)

  if(!avatar.url){
      throw new ApiError(400,"Error while uploading on avatar ")
  }

  await User.findOneAndUpdate(
    req.user?._id,
    {
     $set:{
        avatar:avatar.url
     }
    },
    {new : true}
  ).select("-password")

//HW;-   👉Delete OLD avatar Url ALSO 

  return res.status(200).json(new ApiResponse(200,user,"Avatar is updated"))

})

const updateCoverImage = asyncHandler(async(req,res)=>{
    // multer -> req.files
  const coverImageLocalPath =req.file?.path

  if(!coverImageLocalPath){
         throw new ApiError(400,"cover image file is missing ")
  }

  const coverImage = await uploadOnCloudinary(coverImageLocalPath)

  if(!coverImage.url){
      throw new ApiError(400,"Error while uploading on cover Image ")
  }

 const user = await User.findOneAndUpdate(
    req.user?._id,
    {
     $set:{
        coverImage:coverImage.url
     }
    },
    {new : true}
  ).select("-password")

  return res.status(200).json(new ApiResponse(200,user,"COver iMage is updated"))
})


// 👉Lecture 20
const getUserChannelProfile = asyncHandler(async(req,res)=>{

    //jb channel ki profile chahiye toh uss channel ke url pe jate ho 
   const {username}= req.params

   if(!username?.trim()){
   throw new ApiError(400,"Username is missing")
   }

 const channel= await User.aggregate([
    {
       $match:{ //Filter data.
        username:username?.toLowerCase()
       }
     },
    {  
        $lookup:{//Used to join two collections.
            from:"subsciptions", // Subsciption -> model me sari cheeje plural aur lower case me ho jati 
            localField:"_id",   // Current collection field -> hmare yha pe kis nam se hai 
            foreignField:"channel", // uske channel ko select krne se subsriber milenge(lecture 19)
            as:"subscribers" //Store matched videos in a new field called subscribers
        } 
        
    },
    // yha tak mil gye ki kitne subscribers hai 
    // aab nikalna hai ki maine kitne subscirbe kiye hai 
    {
    $lookup:{
      from:"subsciptions", // 
      localField:"_id",
      foreignField:"subscriber",
      as:"subscribedTo" // maine kisko subcribe kar rkha hai 
   }
    },
    {
        $addFields:{
            subscribersCount:{
                $size:"$subscribers" ,// $subscribers -> use dollar bec it is field
            },
            channelsSubscribedToCount:{
                $size:"$subscribedTo"
            },
            isSubscribed:{ // agr true hai toh frontend ko message denge subscirbed wala button show ho else subscribe wala button show ho 
                $cond:{
                    // dekho ki jo document aaya hai subscribers ka usme mai hu ya nhi 

                    // $in:[ value , (array or obj) ] ->Is this value present inside this array?
                    if:{$in:[req.user?._id,"$subscribers.subscriber"]}, // in -> mtlb present hai ya nhi   , 
                    then:true,
                    else:true
                }

            }
        }
    },
    {
        $project:{   //Used to select fields.
            fullname:1,
            username:1,
            subscribersCount:1,
            channelsSubscribedToCount:1,
            isSubscribed:1,
            avatar:1,
            coverImage:1,
            email:1,


        }
    }

])

if(!channel?.length()){
  throw new ApiError(400,"channel does not exists")
}

return res.status(200).json(new ApiResponse(200,channel[0],"User channel fetched successfully"))
})

// 👉Lecture 21
const getWatchHistory = asyncHandler(async(req,res)=>{
    //   req.user._id; //_id yha pe mongoDb ki id nhi blki ek string milti hai ->phir age khi use use krni ho toh mongoose usse mongoDb ki id me convert kar deta hai uss string ko 

      const user = await User.aggregate([
        {
            $match:{
                // _id:req.user._id -> WRONG bec yha pe mongoose kam nhi karta AGGREGAtion pipelline ka code directly jata hai
                // So make mongoose object id 
                _id:new mongoose.Types.ObjectId(req.user._id)
            }
        },
        // yha tak user mil gya hai aab isski watch history ke andar jana hoga 
        {
            $lookup:{
                from:"videos",     //Video ->plural = videos
                localField:"watchHistory",
                foreignField:"_id",
                as:"watchHistory",
                
                // yha tak bohot sare document aa gye hai par unke andar owner nhi hai bec owner ek user hai -> so add subpipline:
                pipeline:[
                   {
                    $lookup:{
                        from:"users", // kha pe jana hai ->kha se cheeje lani hai
                        localField:"owner",     // localfield ->videos ke andar se bec abhi videos mai hai 
                       foreignField:"_id",
                       as:"owner",

                    //    yha tak owner ke andar bohot sari cheehe aa kyi hai -> jaise uska username,email,fullname,avatar,coverImage.. so yeh sari cheeje thodi na deni hai owner ke andar
                    // so further pipeline to remove unnessary detail
                    pipeline:[
                        {
                            $project:{
                                 fullname:1,
                                 username:1,
                                 avatar:1
                            }
                        }
                    ]
                    }
                   },
                // 👉   sari fields aa jayngi but array ayega -> aur array mai se nikalna hoga first value => done this way in channel pipline ->usse owner milega jiske andar array hoga aur array ki 1st value me fullname,username,avatr mile jayega
                //👉Another easy solution -> add further pipline
                {
                    $addFields:{
                        owner:{ // field add bhi kar skte hai par hum owner ko overwrite hi kar dete hai
                            $first:"$owner"   // array ki first value nikalni hai ->field me se nikalna hai so "$" then owner

                        }
                    }
                }


                ]
                
            } 
        }
      ])

      return res.status(200).json(200,ApiResponse(user[0].watchHistory,"Watch History fetched Successfully "))
})








export {registerUser,
    loginUser,logOutUser,refreshAccessToken,changeCurrentPassword,getCurrentUser,updateAccountDetails,updateAvatar,updateCoverImage,getUserChannelProfile,getWatchHistory
} // register default nhi hai yani ->registerUser naam se hi import krna hoga 
// agr register default hai toh naam change krke bhi import kar skte hai 