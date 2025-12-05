import { useState, useEffect } from "react";
import "./index.scss";
import { getAuth } from "firebase/auth";
import LikeButton from '../LikeButton/index.jsx';

const getUserPosts = async (setUserPosts) => {
    try {
        const auth = getAuth();
        const userId = auth.currentUser.uid;

        if (!auth.currentUser) {
            console.log("User not logged in yet");
            return;
        }

        const token = await auth.currentUser.getIdToken();

        const response = await fetch(
            `https://cs35lfinalproject.onrender.com/api/posts/${userId}`,
            {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        if (!response.ok) throw new Error("Failed to fetch posts");

        const data = await response.json();
        setUserPosts(data);
    } catch (err) {
        console.log(err);
    }
};

export default function GetUserPosts() {
    const [userPosts, setUserPosts] = useState([]);

    useEffect(() => {
        getUserPosts(setUserPosts);
    }, []);


    return (
        <div className="user-posts-container">
                    {userPosts.map((post) => (
                        <div key={post._id} className="user-post-item">
                            <p>{post.text}</p>
                            <LikeButton likedUsers={post.likedUsers} postID={post._id}/>
                        </div>
                    ))}
                </div>
    );
}