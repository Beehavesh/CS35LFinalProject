import { useState } from 'react';
import './index.scss';
import ModalComponent from '../Modal/index.jsx';
import { getAuth } from "firebase/auth";
import { toast } from 'react-toastify';
import getPosts from '../GetAllPosts/index.jsx';

const initialJobTags = [
    { id: 0, genre: 'Rock', selected: false},
    { id: 1, genre: 'Pop', selected: false},
    { id: 2, genre: 'Hip-Hop', selected: false},
    { id: 3, genre: 'R&B', selected: false},
    { id: 4, genre: 'Jazz', selected: false},
    { id: 5, genre: 'Country', selected: false},
    { id: 6, genre: 'EDM', selected: false},
    { id: 7, genre: 'Classical', selected: false},

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
    const [jobRole, setJobRole] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [jobDescription, setJobDescription] = useState('');
    const [jobTags, setJobTags] = useState(initialJobTags);
    const [userJobTags, setUserJobTags] = useState(initialJobTags);

const toggleSelection = (id) => {

  setJobTags(prev => {
    const updated = prev.map(tag =>
      tag.id === id ? { ...tag, selected: !tag.selected } : tag
    );
    setUserJobTags(updated.filter(tag => tag.selected));
    return updated;
  });
};
     
    
    const sendStatus = async () => { 
        const auth = getAuth(); 
        const token = await auth.currentUser.getIdToken();
                if (!jobRole.trim()) return;

        try {
            const response = await fetch("https://cs35lfinalproject.onrender.com/api/posts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({
                    text: jobRole,
                    company: companyName,
                    description: jobDescription,
                    tags: userJobTags, //this should be set upon submit

                })
            });
        
            if (!response.ok) throw new Error("Failed to post");
            toast.success("Posted!");
            setJobRole("");
            setCompanyName("");
            setJobDescription("");
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
                    Post a Job Advertisement
                </button>
            </div>
            <ModalComponent
                modalOpen={modalOpen}
                setModalOpen={setModalOpen}
                title="Create a Job Post"
                onSubmit={sendStatus}
                submitLabel="Post Now"
                disableSubmit={jobRole.trim().length === 0}
            >
                <input
                    type="text"
                    placeholder="Job Role"
                    className="post-input"
                    onChange={(e) => setJobRole(e.target.value)}
                    value={jobRole}
                />

                <input 
                    type="text"
                    placeholder="Company Name"
                    className="post-input"
                    onChange={(e) => setCompanyName(e.target.value)}
                    value={companyName}
                />

                <input 
                    type="text"
                    placeholder="Short Role Description"
                    className="post-input"
                    onChange={(e) => setJobDescription(e.target.value)}
                    value={jobDescription}
                />


                <h4>Music Taste Tags</h4>

               <div style={{ display: 'flex', gap: '8px' }}>
                {jobTags.map(jobTag => (
                    <div key={jobTag.id}>
                        <button 
                        className={`button ${jobTag.selected ? 'clicked' : ''}`}
                        onClick={() => {
                        /*setUserJobTags(userJobTags.filter(a => //important: set the USER JOB TAG ARRAY, NOT the rendered one.
                            a.id !== jobTag.id
                            )
                        );*/
                        {toggleSelection(jobTag.id)}
                        
                        } }>
                        {jobTag.genre} 
                        </button> 
                    </div>
                    
                ))}
                </div>

               <ul>
                <p> This Job Seeks the Following Music Tastes: </p>
                  {userJobTags.map(jobTag => (
                    <li key={jobTag.id}>
                        {jobTag.genre}
                    </li>
                ))}

                </ul>
            </ModalComponent>
        </div>);
}
