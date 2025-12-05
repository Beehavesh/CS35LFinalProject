import Post from "../models/Post.js";

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