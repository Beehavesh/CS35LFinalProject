import express from "express";
import User from "../models/User.js";

const router = express.Router();


router.post("/", async (req, res) => {
    try{
        const{firebaseUID, email, username, photoUrl} = req.body;
        if(!firebaseUID || !email){
            return res.status(400).json({error: "Missing required fields, aka valid email"});
        }
        let user = await User.findOne({firebaseUID});
        if(!user){
            user = await User.create({
                firebaseUID,
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


router.get("/:uid", async (req,res)=>{
    try{
        const user = await User.findOne({firebaseUID: req.params.uid});
        if(!user){
            return res.status(404).json({error: "User not found"});
        }
        res.json(user);

    }
    catch(err){
        console.error(err);
        res.status(500).json({error: "Server error"});
    }
});

export default router;

