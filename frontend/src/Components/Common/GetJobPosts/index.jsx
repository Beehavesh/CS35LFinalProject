import { useState, useEffect } from "react";
import "./index.scss";
import { getAuth } from "firebase/auth";
import LikeButton from '../LikeButton/index.jsx';

const getJobPosts = async (setJobPosts) => {
    try {
        const auth = getAuth();
        const userId = auth.currentUser.uid;

        if (!auth.currentUser) {
            console.log("User not logged in yet");
            return;
        }

        const token = await auth.currentUser.getIdToken();

        const response = await fetch(
            `https://cs35lfinalproject.onrender.com/api/posts/matching/${userId}`,
            {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        if (!response.ok) throw new Error("Failed to fetch job posts");

        const data = await response.json();
        setJobPosts(data);
        console.log(response);
    } catch (err) {
        console.log(err);
    }
};

export default function GetJobPosts() {
    const [jobPosts, setJobPosts] = useState([]);

    useEffect(() => {
        getJobPosts(setJobPosts);
    }, []);


    return (
        <div className="job-posts-container">
            {jobPosts.map((post) => (
                <div key={post._id} className="job-post-item">
                    <p>{post.text}</p>
                    <LikeButton
                    likedUsers={post.likedUsers}
                    setLikedUsers={(newLikes) => {
                        setJobPosts((prevPosts) =>
                            prevPosts.map((p) =>
                                p._id === post._id ? { ...p, likedUsers: newLikes } : p
                            )
                        );
                    }}
                    postID={post._id}
                    />
                </div>
            ))}
        </div>
    );
}
