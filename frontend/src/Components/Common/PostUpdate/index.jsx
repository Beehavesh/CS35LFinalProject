import { useState } from 'react';
import './index.scss';
import ModalComponent from '../Modal/index.jsx';
import { getAuth } from "firebase/auth";
import { toast } from 'react-toastify';
import getPosts from '../GetPosts/index.jsx';

const initialJobTags = [
    { id: 0, genre: 'classical', selected: false},
    { id: 1, genre: 'rock', selected: false},
    { id: 2, genre: 'country', selected: false},
]



const createLikes = async (token, postID) => {
    // console.log("I'm in createLikes");
    try {
        const response = await fetch("https://cs35lfinalproject.onrender.com/api/likes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({
                pid: postID,
            })
        });
        if (!response.ok) throw new Error("Failed to create likes for this post");
    } catch (err) {
        console.log(err);
    }  
}

export default function PostStatus() {
    const [modalOpen, setModalOpen] = useState(false);
    const [postStatus, setPostStatus] = useState('');
    const [jobTags, setJobTags] = useState(initialJobTags);
    const [userJobTags, setUserJobTags] = useState(initialJobTags);
    
    const sendStatus = async () => { 
        const auth = getAuth(); 
        const token = await auth.currentUser.getIdToken();
                if (!postStatus.trim()) return;

        try {
            const response = await fetch("https://cs35lfinalproject.onrender.com/api/posts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({
                    text: postStatus,
                    tags: userJobTags, //this should be set upon submit
                })
            });
            if (!response.ok) throw new Error("Failed to post");
            toast.success("Posted!");
            setPostStatus("");
            setModalOpen(false);

            const data = await response.json();
            const newPostId = data._id; 
            console.log(data);

            // Create likes for the post
            createLikes(token, String(newPostId));

        } catch (err) {
            console.log(err);
            toast.error("Failed to create post.");
        }

    };

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
            <ModalComponent
                modalOpen={modalOpen}
                setModalOpen={setModalOpen}
                title="Create a Post"
                onSubmit={sendStatus}
                submitLabel="Post"
                disableSubmit={postStatus.trim().length === 0}
            >
                <input
                    type="text"
                    placeholder="What's on your mind?"
                    className="post-input"
                    onChange={(e) => setPostStatus(e.target.value)}
                    value={postStatus}
                />


                <h1>Music Taste Tags</h1>
                <ul>

                {userJobTags.map(userJobTag => (
                    <li key={userJobTag.id}>
                        {userJobTag.genre}
                    </li>
                ))}

                </ul>

                <ul>
                {jobTags.map(jobTag => (
                    <li key={jobTag.id}>
                        {jobTag.genre}{' '}
                        <button onClick={() => {
                        setUserJobTags(userJobTags.filter(a => //important: set the USER JOB TAG ARRAY, NOT the rendered one.
                            a.id !== jobTag.id
                            )
                        );
                        }}>
                        Remove 
                        </button> 
                    </li>
                ))}
                </ul>
            </ModalComponent>
        </div>);
}
