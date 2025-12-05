import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import Post from "./models/Post.js";
import Jobpost from "./models/Jobpost.js";
import User from "./models/User.js";
import postRoutes from "./Routes/posts.js";
import playlistRoutes from "./Routes/playlist.js";
import verifyToken from "./middleware/auth.js";
import connectDB from "./config/mongodb.js";

connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/posts", postRoutes);
//app.use("/api", likeRoutes);
app.use("/api/playlist", playlistRoutes);
app.use("/api/users", userRoutes);


// Render backend
app.get("/", (req, res) => {
app.get("/", (req, res) => {
  res.send("Backend running");
});


//storing User info into mongo DB
app.post("/api/auth", verifyToken, async (req, res) =>{
  console.log("we hit api/auth");
  const uid = req.user.uid;
  const{ email, username, photoUrl } = req.body;

  console.log("Received:", { uid, email, username, photoUrl });

  try {
    // first find user in mongoDB
    let user = await User.findOne({ firebaseUID: uid});
    if (!user) {
      console.log("user wasn't found in MongoDB -> we will import now!");
      user = await User.create({
        firebaseUID: uid,
        email,
        username,
        photoUrl,
      });
    }
    else {
      console.log("user exiists in mongoDB already, yay!")
    }
    res.json(user);
    }
    catch (err) {
      console.error("authenticating DB account error: ", err);
      res.status(500).json({error: "failed to authenticate DB account"});
    }
});


// Like a post
app.patch("/api/posts", verifyToken, async (req, res) => {
  console.log("does this code get executed?");
  /*
  newLikeUserID = req.body.userID;
  if (!newLikeUserID) return res.status(401).json({ error: "Invalid user ID while trying to like" });
  try {
    const updatedLikes = await Like.findOneAndUpdate(
      { postID: pID },
      { $push: { likedUserIDs: newLikeUserID } },
      { new: true } 
    );
    if (!updatedLikes) {
      return res.status(404).json({ error: 'Posts not found while trying to like' });
    }
    res.json({likes: updatedLikes});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
  */
});

app.listen(process.env.PORT || 5001, () => console.log("Server running"));

