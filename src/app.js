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
 
app.use(express.urlencoded({extended: true,limits:"16kb"}))  //extended -> obj ke andar obj bhi de skte hai

app.use(express.static("public")) //public folder -> use to store assets like favicon,img,pdf etc

app.use(cookieParser) //Express,for every request,run the cookie-parser middleware.


export { app }