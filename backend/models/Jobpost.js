import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
  text: { type: String },
  userId: { type: String },
  tags: { type: Array, default: [] },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Jobpost || mongoose.model("Jobpost", PostSchema);