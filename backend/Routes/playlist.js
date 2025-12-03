import express from "express";
import Playlist from "../models/Playlist.js";

const router = express.Router();

// Create a playlist
router.post("/", async (req, res) => {
  try {
    const { userId, playlistTitle, songs } = req.body;

    if (!songs || songs.length === 0) {
      return res.status(400).json({ error: "Playlist must contain at least one song." });
    }

    const playlist = await Playlist.create({
      userId,
      playlistTitle,
      songs
    });

    res.status(201).json(playlist);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get playlists for a user
router.get("/:userId", async (req, res) => {
  try {
    const playlists = await Playlist.find({ userId: req.params.userId });
    res.json(playlists);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
