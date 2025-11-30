import React, { use, useMemo, useState } from 'react';
import './index.scss';
import ModalComponent from '../Modal/index.jsx';
import { getAuth } from "firebase/auth";
import { toast } from 'react-toastify';

const getPosts = async (setAllPosts) => {
    try {
        const auth = getAuth(); 
        const token = await auth.currentUser.getIdToken();
        const response = await fetch("http://localhost:5001/api/posts", {
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


export default function PostStatus() {
    const [modalOpen, setModalOpen] = useState(false);
    const [postStatus, setPostStatus] = useState('');
    const [allPosts, setAllPosts] = useState([]);
    
    const sendStatus = async () => { 
        const auth = getAuth(); 
        const token = await auth.currentUser.getIdToken();
                if (!postStatus.trim()) return;

        try {
            const response = await fetch("https://cs35lfinalproject.onrender.com", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({
                    text: postStatus,
                })
            });

            if (!response.ok) throw new Error("Failed to post");
                toast.success("Posted!");
            setPostStatus("");
            setModalOpen(false);
        } catch (err) {
            console.log(err);
            toast.error("Failed to create post.");
        }
    };

    useMemo(() => {
        getPosts(setAllPosts);
    }, []);

    return (
        <div className="post-status-container">
            <div className="post-status">
                <button
                    className="open-post-modal"
                    onClick={() => setModalOpen(true)}
                >
                    Start a Post
                </button>
            </div>
            <ModalComponent status={postStatus} setStatus={setPostStatus} modalOpen={modalOpen} setModalOpen={setModalOpen} sendStatus={sendStatus}/>
        {allPosts.map((post) => {
            return (
                <div key={post._id} className="post-item">
                    <p>{post.text}</p>
                </div>
            );
        }
    )
    }
    </div>);
}
