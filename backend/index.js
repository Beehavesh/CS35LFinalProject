import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import admin from "firebase-admin";
import Post from "./models/Post.js";
import Like from "./models/Like.js";
import playlistRoutes from "./Routes/playlist.js";
import likeRoutes from "./Routes/likes.js";

const serviceAccount = JSON.parse(process.env.SERVICE_ACCOUNT_KEY);

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", playlistRoutes);
app.use("/api", likeRoutes);

// Initialize Firebase admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// Connect to MongoDB
const MONGO_URI = process.env.MONGO_URI 
mongoose.connect(MONGO_URI, {
  dbName: "linkedout",
});

// Middleware to verify Firebase token
async function verifyToken(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) return res.status(401).json({ error: "No token provided" });

  try {
    const decoded = await admin.auth().verifyIdToken(token);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
  }
}

// Render backend
app.get("/", (req, res) => {
  res.send("Backend running");
});

// Create a new post
app.post("/api/posts", verifyToken, async (req, res) => {
  const post = await Post.create({
    userId: req.user.uid,
    text: req.body.text,
    timestamp: Date.now()
  });
  res.json(post);
});

// Get all posts
app.get("/api/posts", verifyToken, async (req, res) => {
  const posts = await Post.find().sort({ timestamp: -1 });
  res.json(posts);
});

// Create likes for a post
app.post("/api/likes", verifyToken, async (req, res) => {
  const like = await Like.create({
    postID: req.body.pid,
    likedUserIDs: null,
  });
  res.json(like);
});

// Get likes for a post
app.get("/api/likes", verifyToken, async (req, res) => {
  const like = await Like.find({ postID: req.body.pid});
  res.json(like);
});

// Like a post
app.put("/api/likes/:postID/add_like", verifyToken, async (req, res) => {
  console.log("Liking a post");
  

  if (!newLikeUserID) return res.status(401).json({ error: "Invalid user ID while trying to like" });

  try {
    const updatedLikes = await Like.findOneAndUpdate(
      { postID: postID }, // Filter
      { $push: { likedUserIDs: newLikeUserID } }, // Update
      { new: true } // Option: Return the updated document instead of the old one
    );

    if (!updatedLikes) {
      return res.status(404).json({ error: 'Posts not found while trying to like' });
    }

    res.json({
      message: 'Like added successfully',
      likes: updatedLikes
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }

});

app.listen(process.env.PORT || 5001, () => console.log("Server running"));