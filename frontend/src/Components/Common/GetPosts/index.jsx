import './index.scss';
import { getAuth } from "firebase/auth";

export default async function getPosts(setAllPosts) {
    try {
        const auth = getAuth(); 
        const token = await auth.currentUser.getIdToken();
        const response = await fetch("https://cs35lfinalproject.onrender.com/api/posts", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        if (!response.ok) throw new Error("Failed to fetch posts");
        const data = await response.json();
        setAllPosts(data);
    } catch (err) {
        console.log(err);
    }   
};