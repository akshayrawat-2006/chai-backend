import mongoose,{Schema} from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const userSchema = new Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true, //removes:Leading spaces,trailing spaces 
        index:true // make searching easy 
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
    },
    fullname:{
         type:String,
        required:true,
        trim:true,
        index:true 
    },
    avatar:{
     type:String, // cloudnary URL 
  required:true,
    },
    coverImage:{
      type:String, // cloudnary URL 
    },
    watchHistory:{
    type: [Schema.Types.ObjectId],
    ref: "Video",
    default: []
    },
    password:{
      type:String,
        required:[true,"Password is required"]
    },
    refreshToken:{
        type:String,
    }
},{timestamps:true})

// userSchema.pre("save",async function (next) { // next -> My work is finished aap flag aage pass kar do
//     // do not use arrow func-> bec  "this." behaves differently" -> in arrow func They inherit this from the surrounding scope.
//     // but in normal func 👉"this." refers to Current document being saved

//     if(!this.isModified("password")){
//        return next()
//     }

//     this.password  =await bcrypt.hash(this.password,10)  //10 is salt rounds  -> Before hashing, bcrypt adds some random data (salt) to the password.
//      next()
    
// })

userSchema.pre("save", async function(){ //👉👉Moderen style :uses Promises.  , Old style:used callbacks. see difference at GPT
// Don't use next() with async middleware.
    if(!this.isModified("password"))
        return;

    this.password = await bcrypt.hash(this.password,10);
});


// 👉methods is used to add custom functions to every document of that model.
userSchema.methods.isPasswordCorrect = async function(password){
   return await bcrypt.compare(password,this.password) // bcrypt also tell wehter password enter is correct or not -> by comparing with encripted_password(this.password)
}

userSchema.methods.generateAccessToken = function(){
  return jwt.sign({  // return statment will give A long encoded JWT string. eg eyJhbGciOiJIUzI1NiIsInR5...
    // this part is payload
        _id:this._id,
        email:this.email,
        username:this.username,
        fullname:this.fullname // this.fullname -> yeh db se aa rhi hai, fullname-> yeh payload ka naam/key hai 
    },
    process.env.ACCESS_TOKEN_SECRET, // Used to sign the token.
    {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    }

)

}
userSchema.methods.generateRefreshToken = function(){
     return jwt.sign({
        _id:this._id,
 
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    }

)
}

export const User = mongoose.model("User",userSchema)