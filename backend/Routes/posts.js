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

router.patch("/post", async (req, res) => {
    try {
        const like = await Post.updateOne(
            {_id: req.body.pid},
            {$addToSet: {usersLiked: req.body.uid}}
        )
        res.status(201).json(like);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to like post" });
    }
});

export default router;