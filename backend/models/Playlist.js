import mongoose from "mongoose";

const songSchema = new mongoose.Schema({
  title: { type: String, required: true },
  artist: { type: String, required: true },
  album: { type: String },
  releaseDate: { type: String },
  link: { type: String },
});

const playlistSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  playlistTitle: { type: String, required: true },
  songs: { type: [songSchema], validate: v => v.length > 0 },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Playlist", playlistSchema);
