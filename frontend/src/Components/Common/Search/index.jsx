import { useState } from 'react';
import './index.scss';
import ModalComponent from '../Modal/index.jsx';
import { getAuth } from "firebase/auth";
import { toast } from 'react-toastify';

export default function Search() {

    // make sure to rename them
    const [modalOpen, setModalOpen] = useState(false);
    const [postStatus, setPostStatus] = useState('');

    
    const sendSearch = async () => { 

        // console.log("You pressed submit; this is your message: \n" + postStatus);

        const auth = getAuth(); 
        const token = await auth.currentUser.getIdToken();
                if (!postStatus.trim()) return;

        try {
            const response = await fetch("https://cs35lfinalproject.onrender.com/api/posts", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            });
            if (!response.ok) throw new Error("Failed to search");
            // toast.success("Posted!");
            setPostStatus("");
            setModalOpen(false);

            const data = await response.json();
            const names = data.map(idk => idk.text);
            // console.log(names);

            const searchPattern = postStatus;
            const dynamicRegex = new RegExp(searchPattern, "g");
            for (let i = 0; i < names.length; i++) {
                // console.log(names[i].match(dynamicRegex));
                if (names[i].match(dynamicRegex) != null) {
                    console.log(names[i]);
                }
            }
            

        } catch {
            console.log(err);
            toast.error("Failed to search.");
        }
    }

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
                onSubmit={sendSearch}
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
            </ModalComponent>
        </div>
    );
}