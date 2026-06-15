import { Router } from "express";

import {
    createPlaylist,
    getUserPlaylists,
    getPlaylistById,
    addVideoToPlaylist,
    removeVideoFromPlaylist,
    deletePlaylist,
    updatePlaylist
} from "../controllers/playlist.controller.js";

import { verifyJWT } from "../middlewares/auth.middlewares.js";

const router = Router();

router.route("/")
.post(verifyJWT, createPlaylist);

router.route("/user/:userId")
.get(getUserPlaylists);

router.route("/:playlistId")
.get(getPlaylistById)
.patch(verifyJWT, updatePlaylist)
.delete(verifyJWT, deletePlaylist);

router.route("/:playlistId/video/:videoId")
.patch(verifyJWT, addVideoToPlaylist)
.delete(verifyJWT, removeVideoFromPlaylist);

export default router;