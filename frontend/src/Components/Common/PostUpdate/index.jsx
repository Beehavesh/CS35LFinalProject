import { useState } from 'react';
import './index.scss';
import ModalComponent from '../Modal/index.jsx';
import { getAuth } from "firebase/auth";
import { toast } from 'react-toastify';

export default function PostStatus() {
    const [modalOpen, setModalOpen] = useState(false);
    const [postStatus, setPostStatus] = useState('');
    
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
    </div>);
}
