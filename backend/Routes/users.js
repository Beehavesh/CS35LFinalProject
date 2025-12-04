import express from "express";
import User from "../models/User.js";

const router = express.Router();


app.post("/", async (req, res) => {
    try{
        const{userId, email, username, photoUrl} = req.body;
        if(!userId || !email){
            return res.status(400).json({error: "Missing required fields, aka valid email"});
        }
        let user = await User.findOne({firebaseUID: userId});
        if(!user){
            user = await User.create({
                firebaseUID: userId,
                email,
                username,
                photoUrl
            });
        }
        res.json(user);
    }
    catch(err){
        console.error(err);
        res.status(500).json({error: "Error creating user"});
    }
});
/*
app.post("/api/auth", verifyToken, async (req,res) =>{
    const{name, email, photoUrl } = req.body;
    const existing = await User.findOne({ firebaseUID: req.user.uid});

    //prevents from recreating 
    if(existing) return res.json(existing);
    const user= await User.create({
        firebaseUID: req.user.uid,
        name,
        email,
        photoURL
    });
    res.json(user);
})
    */
