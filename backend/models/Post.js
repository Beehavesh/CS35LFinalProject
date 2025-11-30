import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
    text: { type: String, required: true },
    userId: { type: String, required: true }, // from firebase auth
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Post", PostSchema);