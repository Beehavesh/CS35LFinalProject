import React, { useState } from 'react';
import GetJobPosts from './Common/GetJobPosts/index.jsx';
import GetAllPosts from './Common/GetAllPosts/index.jsx';
import '../Sass/HomeComponent.scss';
import { getAuth } from 'firebase/auth';
import { toast } from 'react-toastify';

export default function HomeComponent() {
    //image upload code is put here temporariliy - move later
    const [currentImage, setCurrentImage] = useState({})
    const getImage = (event) => {
            setCurrentImage(event.target.files[0])
        }
    const sendImage = async () => { 
        const auth = getAuth(); 
        const token = await auth.currentUser.getIdToken();
        const form = new FormData();
        form.append("image", currentImage);

        try {
            const response = await fetch("http://localhost:5001/api/posts", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`
                },
                body: form 
            });

            if (!response.ok) throw new Error("Failed to post");
                toast.success("Posted!");
        } catch (err) {
            console.log(err);
            toast.error("Failed to create post.");
        }
    };
    return (
        <div>
            homepage
            <input type={"file"} onChange={getImage} />
            <button onClick={sendImage}>Upload</button>
        </div>
    );
}