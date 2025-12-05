import express from "express";
import verifyToken from "../middleware/auth.js";
import { createPost, getAllPosts, getUserPosts, getPostsMatchingUserTags, patchLikes, getLikes } from "../Controllers/postController.js";

const router = express.Router();

router.post("/", verifyToken, createPost);
router.get("/", verifyToken, getAllPosts);
router.get("/matching/:userId", getPostsMatchingUserTags);
router.get("/:userId", verifyToken, getUserPosts);
router.patch("/:id", verifyToken, patchLikes); 
router.get("/:pid/likes", verifyToken, getLikes);

export default router;