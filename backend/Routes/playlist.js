import express from "express";
import verifyToken from "../middleware/auth.js";
import { createPlaylist, getAllPlaylists, getUserTags } from "../Controllers/playlistController.js";

const router = express.Router();

router.post("/playlist",verifyToken, createPlaylist);
router.get("/playlist/:userId", getAllPlaylists);
router.get("/playlist/:userId/tags", getUserTags);

export default router;