// app.js= Application Configuration -> Application Entry Point

import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser" //Cookie-parser is Express middleware that reads cookies( Small data stored in the user's browser) from incoming requests and makes them available in req.cookies.

const app = express()

// configure(set up) cors and cookie parser
app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))

// data alag -alag jigge se ayega jaise json ,url etc
// configure:-
app.use(express.json({limit:"16kb"})) // json data ko accept karo 
 
app.use(express.urlencoded({extended: true,limit:"16kb"}))  //extended -> obj ke andar obj bhi de skte hai

app.use(express.static("public")) //public folder -> use to store assets like favicon,img,pdf etc

app.use(cookieParser()) //Express,for every request,run the cookie-parser middleware.


// routed import 
import userRouter from "./routes/user.routes.js"


// routed declaration 
// app.get -> not working here bec router alag se aa rha hai ek hi jagah nhi hai->
// so router ko lane ke liye middleware lana hoga 
// app.use("/users",userRouter)

// "https://localHost:3000/users" se userRouter(user.router.js) pe jayega ->vha pe routee mention hai ->phir "https://localHost:3000/users/register" pe jayega ->user.controllers me register method pe chle jayega

//👉👉 for good practise define konsi api,version
app.use("/api/v1/users",userRouter) //"https://localHost:3000/api/v1/register""


import commentRouter from "./routes/comment.routes.js";
import dashboardRouter from "./routes/dashboard.routes.js";
import healthcheckRouter from "./routes/healthcheck.routes.js";
import likeRouter from "./routes/like.routes.js";
import playlistRouter from "./routes/playlist.routes.js";
import subscriptionRouter from "./routes/subscription.routes.js";
import tweetRouter from "./routes/tweet.routes.js";
import videoRouter from "./routes/video.routes.js";

app.use("/api/v1/comments", commentRouter);
app.use("/api/v1/dashboard", dashboardRouter);
app.use("/api/v1/healthcheck", healthcheckRouter);
app.use("/api/v1/likes", likeRouter);
app.use("/api/v1/playlists", playlistRouter);
app.use("/api/v1/subscriptions", subscriptionRouter);
app.use("/api/v1/tweets", tweetRouter);
app.use("/api/v1/videos", videoRouter);

export { app }