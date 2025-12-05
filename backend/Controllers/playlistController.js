import Playlist from "../models/Playlist.js";

// Create a playlist
export const createPlaylist = async (req, res) => {
  try {
    console.log("Incoming playlist payload:", req.body);
    const { userId, playlistTitle, songs, genreTags } = req.body;

    if (!playlistTitle) {
      return res.status(400).json({ error: "Playlist title is required." });
    }

    if (!songs || songs.length === 0) {
      return res.status(400).json({ error: "Playlist must contain at least one song." });
    }

    const playlist = await Playlist.create({
      userId,
      playlistTitle,
      songs,
      genreTags: genreTags || []
    });

    res.status(201).json(playlist);

  } catch (err) {
    console.error("PLAYLIST ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};

// Get playlists for a user
export const getAllPlaylists = async (req, res) => {
  try {
    const playlists = await Playlist.find({ userId: req.params.userId });
    res.json(playlists);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all unique tags for a user
export const getUserTags = async (req, res) => {
  try {
    const playlists = await Playlist.find({ userId: req.params.userId });

    // Collect tags from each playlist
    const allTags = playlists.flatMap(p => p.genreTags || []);

    // Remove duplicates
    const uniqueTags = [...new Set(allTags)];

    res.json(uniqueTags);
  } catch (err) {
    console.error("TAG ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};