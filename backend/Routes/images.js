import express from "express";
import multer from "multer";
import Image from "../models/Image.js";

const router = express.Router();
const upload = multer(); 

router.post("/image", upload.single("image"), async (req, res) => {
    try {
    const newImage = new Image({
      image: req.file.buffer,     // <== actual binary data
      userId: req.body.userId || "123"  // optional, depends on your app
    });

    await newImage.save();
    res.json({ message: "Image uploaded successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to upload image" });
  }
});

export default router;