import express from "express";
import verifyToken from "../middleware/auth.js";
import{
    createUserAuth,
    createUserLegacy,
    getUserByUID
} from "../Controllers/userController.js";

const router = express.Router();
router.get("/test", (req,res)=>{
    console.log("yo it his the users/test yo");
    res.send("da user routes work yuhhhhh");
});
router.post("/auth", verifyToken, createUserAuth);
router.post("/", createUserLegacy);
router.get("/:uid", getUserByUID);


export default router;

