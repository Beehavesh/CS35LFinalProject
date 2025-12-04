import mongoose from "mongoose"
//general outline for user profile data for storing
//onto mongoDB

const UserSchema = new mongoose.Schema({
    //automatically stored from frontend when signing up
    firebaseUID: {type: String, required: true, unique: true},
    email: {type: String, required: true},
    username: {type: String, required: true},
    //optional fields, so this may be implemented manually by user later
    bio: {type: String, default:""},
    photoUrl: {type: String, default:
    "https://cdn.vectorstock.com/i/500p/41/53/cute-white-cat-with-headphones-vector-46544153.jpg"},},
{timestamps: true});


export default mongoose.models.User || mongoose.model("User", UserSchema);