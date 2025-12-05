import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import Post from "./models/Post.js";
import Jobpost from "./models/Jobpost.js";
import User from "./models/User.js";
// import Like from "./models/Like.js";
// import likeRoutes from "./Routes/likes.js";
import playlistRoutes from "./Routes/playlist.js";
import verifyToken from "./middleware/auth.js";
import connectDB from "./config/mongodb.js";

connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/posts", postRoutes);
app.use("/api", likeRoutes);
app.use("/api", playlistRoutes);

// Render backend
app.get("/", (res) => {
  res.send("Backend running");
});

// Create a new post
app.post("/api/posts", verifyToken, async (req, res) => {
  const post = await Post.create({
    userId: req.user.uid,
    text: req.body.text,
    tags: req.body.tags, // check if it should be req.body or something else
    timestamp: Date.now()
  }); 
  res.json(post);
});

// Get all posts
app.get("/api/posts", verifyToken, async (req, res) => {
  const posts = await Post.find().sort({ timestamp: -1 });
  res.json(posts);
});

app.post("/api/like", async (req, res) => {
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

//storing User info into mongo DB
app.post("/api/auth", verifyToken, async (req, res) =>{
  console.log("testing if we correctly hit the api auth route");

  const uid = req.user.uid;
  const{ email, username, photoUrl } = req.body;

  console.log("Received:", { uid, email, username, photoUrl });

  try{
    //first find user in mongoDB
    let user = await User.findOne({ firebaseUID: uid});
    if(!user){
      console.log("user wasn't found in MongoDB -> we will import now!");
      user = await User.create({
        firebaseUID: uid,
        email,
        username,
        photoUrl,
      });
    }
    else{
      console.log("user exiists in mongoDB already, yay!")
    }
    res.json(user);
    }
    catch(err){
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

