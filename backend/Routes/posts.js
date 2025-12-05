import express from "express";
import verifyToken from "../middleware/auth.js";
import { createPost, getAllPosts, getPostsMatchingUserTags, patchLikes } from "../Controllers/postController.js";

const router = express.Router();

router.post("/", verifyToken, createPost);
router.get("/", verifyToken, getAllPosts);
router.get("/matching/:userId", getPostsMatchingUserTags);
router.patch("/", verifyToken, patchLikes); 

export default router;