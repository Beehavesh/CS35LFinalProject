import express from "express";
import Post from "../models/Post.js"; 

const router = express.Router();

router.post("/post", async (req, res) => {
    try {
        const { text, userId, tags } = req.body;

        const post = await Post.create({
            text,
            userId,
            tags,
            createdAt: new Date(),
            likedUsers,
        });

        res.status(201).json(post);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to create post" });
    }
});

export default router;