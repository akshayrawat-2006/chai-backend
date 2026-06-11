import mongoose,{Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2"; // yeh isi liye bec sare videos toh de ek page pe aa nhi skte so agle page pe load kara lo -> same with commennts

const videoSchema = new Schema({
    videoFile:{
        type:String,    // cloudnary URL
        required:true,
    },
    thumbnail:{
         type:String,    // cloudnary URL
        required:true,
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    duration:{
        type:Number,  // 👉cloudnary URL
        required:true
    },
    views:{
        type:Number,
        required:0
    },
    isPublished:{
        type:Boolean,
        default:true
    },
    owner:{ // videoOwner
    type:Schema.Types.ObjectId,
    ref:"User"
    }


},{timestamps:true})

// Plugin = Feature Add-on
videoSchema.plugin(mongooseAggregatePaginate) //Pagination support for aggregation queries
export const Video = mongoose.model("Video",videoSchema)