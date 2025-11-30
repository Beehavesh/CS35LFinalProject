import React, { useState } from 'react';
import './index.scss';
import ModalComponent from '../Modal/index.jsx';
import { getAuth } from "firebase/auth";
import { toast } from 'react-toastify';

export default function PostStatus() {
    const [modalOpen, setModalOpen] = useState(false);
    const [status, setStatus] = useState('');
    const sendStatus = async () => { 
                if (!status.trim()) return;

        try {
            const auth = getAuth();
            const token = await auth.currentUser.getIdToken();
            const response = await fetch("http://localhost:5001/api/posts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({
                    text: status,
                })
            });

            if (!response.ok) throw new Error("Failed to post");
                toast.success("Posted!");
            setStatus("");
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
            <ModalComponent status={status} setStatus={setStatus} modalOpen={modalOpen} setModalOpen={setModalOpen} sendStatus={sendStatus}/>
        </div>
    );
}

