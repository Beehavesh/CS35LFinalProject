import express from "express";
import verifyToken from "../middleware/auth.js";
import { createPost, getAllPosts, getUserPosts, getPostsMatchingUserTags, patchLikes } from "../Controllers/postController.js";

const router = express.Router();

router.post("/", verifyToken, createPost);
router.get("/", verifyToken, getAllPosts);
router.get("/:userId", verifyToken, getUserPosts);
router.get("/matching/:userId", getPostsMatchingUserTags);
router.patch("/", verifyToken, patchLikes); 

export default router;