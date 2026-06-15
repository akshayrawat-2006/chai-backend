import mongoose, { isValidObjectId } from "mongoose";
import { User } from "../models/user.model.js";
import { Subscription } from "../models/subscription.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const toggleSubscription = asyncHandler(async (req, res) => {
const { channelId } = req.params;


if (!isValidObjectId(channelId)) {
    throw new ApiError(400, "Invalid channel id");
}

const existingSubscription = await Subscription.findOne({
    subscriber: req.user._id,
    channel: channelId
});

// unsubscribe
if (existingSubscription) {
    await Subscription.findByIdAndDelete(
        existingSubscription._id
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            {},
            "Channel unsubscribed successfully"
        )
    );
}

// subscribe
await Subscription.create({
    subscriber: req.user._id,
    channel: channelId
});

return res.status(200).json(
    new ApiResponse(
        200,
        {},
        "Channel subscribed successfully"
    )
);


});

const getUserChannelSubscribers = asyncHandler(async (req, res) => {
const { channelId } = req.params;


if (!isValidObjectId(channelId)) {
    throw new ApiError(400, "Invalid channel id");
}

const subscribers = await Subscription.aggregate([
    {
        $match: {
            channel: new mongoose.Types.ObjectId(channelId)
        }
    },
    {
        $lookup: {
            from: "users",
            localField: "subscriber",
            foreignField: "_id",
            as: "subscriber",
            pipeline: [
                {
                    $project: {
                        username: 1,
                        fullname: 1,
                        avatar: 1
                    }
                }
            ]
        }
    },
    {
        $addFields: {
            subscriber: {
                $first: "$subscriber"
            }
        }
    }
]);

return res.status(200).json(
    new ApiResponse(
        200,
        subscribers,
        "Subscribers fetched successfully"
    )
);


});

const getSubscribedChannels = asyncHandler(async (req, res) => {
const { subscriberId } = req.params;


if (!isValidObjectId(subscriberId)) {
    throw new ApiError(400, "Invalid subscriber id");
}

const channels = await Subscription.aggregate([
    {
        $match: {
            subscriber: new mongoose.Types.ObjectId(subscriberId)
        }
    },
    {
        $lookup: {
            from: "users",
            localField: "channel",
            foreignField: "_id",
            as: "channel",
            pipeline: [ 
                {
                    $project: {
                        username: 1,
                        fullname: 1,
                        avatar: 1
                    }
                }
            ]
        }
    },
    {
        // channel = ARRAY ->But one subscription can have only one channel.
        // $addFields + $first → Convert lookup array into a single object
        $addFields: {
            channel: {
                $first: "$channel"
            }
        }
    }
]);

return res.status(200).json(
    new ApiResponse(
        200,
        channels,
        "Subscribed channels fetched successfully"
    )
);


});

export {
toggleSubscription,
getUserChannelSubscribers,
getSubscribedChannels
};
