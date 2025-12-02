import express from "express";
import Like from "../models/Like.js"; 

const router = express.Router();

router.post("/like", async (req, res) => {
    try {
        const { postID, likedUserIDs } = req.body;

        const like = await Like.create({
            postID,
            //likedUserIDs,
        });

        res.status(201).json(like);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to create likes" });
    }
});

export default router;