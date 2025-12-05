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