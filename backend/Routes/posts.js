import express from "express";
import verifyToken from "../middleware/verifyToken.js";
import { createPost, getAllPosts } from "../Controllers/postController.js";

const router = express.Router();

router.post("/", verifyToken, createPost);
router.get("/", verifyToken, getAllPosts);

export default router;