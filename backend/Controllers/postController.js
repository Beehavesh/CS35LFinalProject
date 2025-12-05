import Post from "../models/Post.js";
import Playlist from "../models/Playlist.js";

// Create a new post
export const createPost = async (req, res) => {
  try {
    const post = await Post.create({
      userId: req.user.uid,       // comes from verifyToken middleware
      text: req.body.text,
      tags: req.body.tags,
      timestamp: Date.now()
    });

    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all posts
export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ timestamp: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get user posts
export const getUserPosts = async (req, res) => {
  try {
    const posts = await Post.find({ userId: req.params.userId }).sort({ timestamp: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get job posts matching user's playlist tags
export const getPostsMatchingUserTags = async (req, res) => {
  try {
    const userId = req.params.userId;

    // 1. Fetch all playlists
    const playlists = await Playlist.find({ userId });

    // 2. Flatten user genre tags into an array
    const userTags = [
      ...new Set(
        playlists.flatMap(p => p.genreTags.map(t => t.toLowerCase()))
      ),
    ];

    console.log("User tags:", userTags);

    // 3. Match job posts where tags.genre overlaps
    const jobs = await Post.find({
      "tags.genre": { $in: userTags }
    });

    res.json(jobs);

  } catch (err) {
    console.error("MATCHING JOBS ERR:", err);
    res.status(500).json({ error: err.message });
  }
};

// Like a post
export const patchLikes = async (req, res) => {
  try {
    const postId = req.params.id;  // from URL
    const userId = req.body.uid;   // user who liked it

    // Add userId to likedUsers (no duplicates)
    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      { $addToSet: { likedUsers: userId } },
      { new: true }  // return updated document
    );

    if (!updatedPost) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.status(200).json(updatedPost);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to like post" });
  }
};