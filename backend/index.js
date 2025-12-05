import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

import connectDB from "./config/mongodb.js";

// Route imports
import postRoutes from "./Routes/posts.js";
import playlistRoutes from "./Routes/playlist.js";
import userRoutes from "./Routes/users.js";
import likesRoutes from "./Routes/likes.js";

const app = express();

// CORS — allows frontend → backend without blocking
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

// Connect to MongoDB
connectDB();

// ==== ROUTE REGISTRATION ====
app.use("/api/posts", postRoutes);
app.use("/api/playlist", playlistRoutes);
app.use("/api/users", userRoutes);
app.use("/api/likes", likesRoutes);

// Backend test route
app.get("/", (req, res) => {
  res.send("Backend running");
});
// Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

