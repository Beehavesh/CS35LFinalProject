import { useState, useEffect } from "react";
import "./index.scss";
import { getAuth } from "firebase/auth";

const getAllPosts = async (setAllPosts) => {
    try {
        const auth = getAuth();

        if (!auth.currentUser) {
            console.log("User not logged in yet");
            return;
        }

        const token = await auth.currentUser.getIdToken();

        const response = await fetch(
            "https://cs35lfinalproject.onrender.com/api/posts",
            {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        if (!response.ok) throw new Error("Failed to fetch posts");

        const data = await response.json();
        setAllPosts(data);
    } catch (err) {
        console.log(err);
    }
};

export default function GetPosts() {
    const [allPosts, setAllPosts] = useState([]);

    useEffect(() => {
        getAllPosts(setAllPosts);
    }, []);

    return (
        <div className="posts-container">
            {allPosts.map((post) => (
                <div key={post._id} className="post-item">
                    <p>{post.text}</p>
                </div>
            ))}
        </div>
    );
}
