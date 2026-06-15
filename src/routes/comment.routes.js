import { Router } from "express";
import {
getVideoComments,
addComment,
updateComment,
deleteComment
} from "../controllers/comment.controller.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";

const router = Router();

// Get all comments of a video
router.route("/:videoId").get(getVideoComments);

// Add comment to a video
router.route("/:videoId").post(verifyJWT, addComment);

// Update comment
router.route("/c/:commentId").patch(verifyJWT, updateComment); // add "c" just to avoid route conflicts.

// Delete comment
router.route("/c/:commentId").delete(verifyJWT, deleteComment);

export default router;
