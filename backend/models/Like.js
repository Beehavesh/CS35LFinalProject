import mongoose from "mongoose";

const LikeSchema = new mongoose.Schema({
  postID: String,
  likedUserIDs: [String]
});

export default mongoose.models.Like || mongoose.model("Like", LikeSchema);