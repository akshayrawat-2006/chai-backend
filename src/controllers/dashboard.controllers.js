//Not created model for dashboard👉👉 Because a model is created for data that must be stored permanently in MongoDB. like username,avatar,videofile,thumbnail,desc etc

import mongoose from "mongoose";
import { Video } from "../models/video.model.js";
import { Subscription } from "../models/subscription.model.js";
import { Like } from "../models/like.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const getChannelStats = asyncHandler(async (req, res) => {


const channelId = req.user._id;

// total videos uploaded by channel
const totalVideos = await Video.countDocuments({
    owner: channelId // Count videos whose owner is current user.
});

// total subscribers of channel
const totalSubscribers = await Subscription.countDocuments({
    channel: channelId // how many chanels has this channelId
});

// fetch channel videos first
const channelVideos = await Video.find({
    owner: channelId
}).select("_id views");

// collect video ids
const videoIds = channelVideos.map(video => video._id);

// total views of all videos
const totalViews = channelVideos.reduce(    //👉👉👉To add use -> reduce()
    (acc, video) => acc + video.views,
    0
);

// total likes on all channel videos
const totalLikes = await Like.countDocuments({
    video: { $in: videoIds }
});

return res.status(200).json(
    new ApiResponse(
        200,
        {
            totalVideos,
            totalSubscribers,
            totalViews,
            totalLikes
        },
        "Channel stats fetched successfully"
    )
);


});

const getChannelVideos = asyncHandler(async (req, res) => {


const videos = await Video.find({
    owner: req.user._id
})
.sort({ createdAt: -1 }) // newest videos first
.select("-__v");

return res.status(200).json(
    new ApiResponse(
        200,
        videos,
        "Channel videos fetched successfully"
    )
);


});

export {
getChannelStats,
getChannelVideos
};
