// 👉index.js contains Database Connection ,Server Start

// db dusri jagah hai yaani ->time lgta hai ,db se baat krne me ->problem bhi aa skti hai 
// SO use async , use error handling(try,catch,promise..)

// require('dotenv').config({path:'./env'}) -> ise chl jata hai but code ki consistency ko kharab kar rha hai ->imporved presion in next line
import dotenv from "dotenv"  //but require config also  ->in line 11
// import syntax  so use krne ke liye experimental feature se use kar skte hai -> go package.json ->script

import mongoose from "mongoose";
import { DB_NAME } from "./constants.js";
import connectDB from "./db/index.js";
import { app } from "./app.js";

dotenv.config({
    path:'./.env'
})

// 2nd Approach:- include dotenv
connectDB()

// async method (2nd app) ek promise bhi return krta hai
.then(()=>{
app.listen(process.env.PORT || 8000,()=>{ //is used to start the Express server and listen for incoming requests on port 8000 , after db connected
   console.log(`Server is running on port ${process.env.PORT}`); 
})
}) 
.catch((error)=>{
  console.log("MONGODB connection failed !!!",error)
})

/* 1st approach :-
import express from "express"
const app = express()

// function connectDB(){
// }
// connectDB() this method for connect DB is less professtional 

// Proffestionally use -> Immediately Invoked Async Function Expression (Async 👉IIFE). ->Define + Call immediately:
// The semicolon is a 👉safety measure -> suppose iffe func se phele wali line mai semicolon nhi lga toh problem ho skti ha 
;(async () => {
    try{
  await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`) // db ka naam bhi dena hoga -> jo constants ke andar likga hai

  app.on("error",(error)=>{ // agr application nhi khul pa rhi hai kisi bhi problem ki vajah se
    console.log("ERROR:",error)
    throw error
  })

  app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${port}`); 
})
    }
    catch(error){
    console.error("Error:",error)
    throw error
    }
})() 

*/

