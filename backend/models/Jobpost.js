import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
  text: { type: String, default: "" },
  userId: { type: String, default: ""},
  tags: { type: Array, default: [] },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Jobpost || mongoose.model("Jobpost", PostSchema);