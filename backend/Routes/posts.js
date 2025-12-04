import express from "express";
import Post from "../models/Jobpost.js"; 

const router = express.Router();

router.post("/post", async (req, res) => {
    try {
        const { text, userId } = req.body;

        const post = await Jobpost.create({
            text,
            userId,
            tags,
            createdAt: new Date(),
        });

        res.status(201).json(post);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to create post" });
    }
});

export default router;