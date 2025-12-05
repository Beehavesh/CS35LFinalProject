import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
  text: String,
  userId: String,
  tags: { type: Array, default: [] },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Post || mongoose.model("Post", PostSchema);