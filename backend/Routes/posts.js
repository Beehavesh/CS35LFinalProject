import express from "express";
import verifyToken from "../middleware/auth.js";
import { createPost, getAllPosts } from "../Controllers/postController.js";

const router = express.Router();

router.post("/", verifyToken, createPost);
router.get("/", verifyToken, getAllPosts);

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