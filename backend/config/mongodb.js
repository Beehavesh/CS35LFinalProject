import mongoose from "mongoose";
import admin from "firebase-admin";

// Initialize Firebase admin

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// Connect to MongoDB
const MONGO_URI = process.env.MONGO_URI 
mongoose.connect(MONGO_URI, {
  dbName: "linkedout",
});

const serviceAccount = JSON.parse(process.env.SERVICE_ACCOUNT_KEY);