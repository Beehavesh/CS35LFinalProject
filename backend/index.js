import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import admin from "firebase-admin";
import { readFileSync } from "fs";
import postRoutes from "./Routes/posts.js";

const serviceAccount = JSON.parse(process.env.SERVICE_ACCOUNT_KEY);

const app = express();
app.use("/api", postRoutes);
app.use(cors());
app.use(express.json());

// Initialize Firebase admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// Connect to MongoDB
const MONGO_URI = process.env.MONGO_URI || 
  "mongodb+srv://bhaveshapathak_db_user:TROWXzkIjDrtw28P@cluster0.s2bpv8v.mongodb.net/?appName=Cluster0";
mongoose.connect(MONGO_URI, {
  dbName: "linkedout",
});

// Post model
const PostSchema = new mongoose.Schema({
  userId: String,
  text: String,
  timestamp: Number
});

const Post = mongoose.model("Post", PostSchema);

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

app.listen(5001, () => console.log("Server running on http://localhost:5001"));