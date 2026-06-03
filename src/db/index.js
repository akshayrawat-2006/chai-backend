import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () =>{
    try {
        // can also store -> bec mongoose give return object
     const connectionInstance =  await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)

     console.log(`\n MONGODB connected !! DB HOST: ${connectionInstance.connection.host}`) // usually isi liye ki khi mai production ki jagah kisi aur sever me connect ho jau toh pta chl jaye ki konse host pe connect ho rha hu

    } catch (error) {
        console.log("MONGODB connection error :",error)
        // yeh hmari application ek nye process pe chl rhi hogi -> so "process" uska refernce hai 
        process.exit(1) // methods of exit(0),exit(1) .. -> see on gpt 
    }
}

export default connectDB