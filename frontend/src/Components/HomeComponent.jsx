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
              <div className = "model-viewer-for-home">
                           <model-viewer
                           id="homepageReveal"
                           loading="eager"
                           auto-rotate
   //no poster for the homepage
                           tone-mapping="aces"
                           src="/motif3dreal.gltf"
                           environment-image="neutral"
                           shadow-intensity="1"
                           alt="3d model of motif logo"
                           ></model-viewer>
                   </div>
       
            <h1 className="heading1"> MOTIF. </h1>
            <h2> Jobs curated just for your unique music taste. </h2>
            <GetJobPosts />
            <input type={"file"} onChange={getImage} />
            <button onClick={sendImage}>Upload</button>
        </div>
    );
}