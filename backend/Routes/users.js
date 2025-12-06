import express from "express";
import verifyToken from "../middleware/auth.js";
import{
    createUserAuth,
    createUserLegacy,
    getUserByUID,
    updateUser
} from "../Controllers/userController.js";

const router = express.Router();
router.get("/test", (req,res)=>{
    console.log("yo it his the users/test yo");
    res.send("this the new version");
});
router.post("/auth", verifyToken, createUserAuth);
router.post("/", createUserLegacy);
router.put("/:uid", verifyToken, updateUser);
router.get("/:uid", getUserByUID);
router.get("/debug/test123", (req, res) => {
  res.send("IF YOU SEE THIS, BACKEND IS UPDATED");
});



export default router;

