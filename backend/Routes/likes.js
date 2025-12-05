import express from "express";
import Like from "../models/Like.js"; 

const router = express.Router();

router.post("/likes", async (req, res) => {
    try {
        const { postID, likedUserIDs } = req.body;

        const like = await Like.create({
            postID,
            likedUserIDs,
        });

        res.status(201).json(like);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to create likes" });
    }
});

router.put("/likes", async (req, res) => {
    try {
        // const { postID, uid } = req.body;

        const updatedLikes = await Like.findOneAndReplace(
            { postID: req.body.postID },
            { $push: { likedUserIDs: req.body.userID } },
            { new: true }
        );

        res.json({likes: updatedLikes});

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to like" });
    }
});

export default router;