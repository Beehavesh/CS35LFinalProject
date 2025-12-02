import mongoose from "mongoose";

const ImageSchema = new mongoose.Schema({
  image: Buffer,
  userId: String,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Image || mongoose.model("Image", ImageSchema);