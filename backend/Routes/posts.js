import express from "express";
import Post from "./models/Post.js"; // create this model

const router = express.Router();

// Create post
router.post("/post", async (req, res) => {
    try {
        const { text, userId } = req.body;

        const post = await Post.create({
            text,
            userId,
            createdAt: new Date(),
        });

        res.status(201).json(post);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to create post" });
    }
});

export default router;