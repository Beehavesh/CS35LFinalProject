import { useState } from 'react';
import './index.scss';
import ModalComponent from '../Modal/index.jsx';
import { getAuth } from "firebase/auth";
import { toast } from 'react-toastify';
import LikeButton from '../LikeButton/index.jsx';

export function displaySearchResult(searchResult) {
    return (
        <>
        <div className="posts-container">
            {searchResult.map((result) => (
                <div key={result._id} className="post-item">
                    <p>{result.text}</p>
                    <LikeButton postID={result._id}/>
                </div>
            ))}
        </div>
        </>
    );
}

export default function Search() {

    const [modalOpen, setModalOpen] = useState(false);
    const [searchInput, setSearchInput] = useState('');
    let searchResult = [];

    const sendSearch = async () => { 

        // console.log("You pressed submit; this is your message: \n" + searchInput);

        const auth = getAuth(); 
        const token = await auth.currentUser.getIdToken();
                if (!searchInput.trim()) return;

        try {
            const response = await fetch("https://cs35lfinalproject.onrender.com/api/posts", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            });
            if (!response.ok) throw new Error("Failed to search");
            setSearchInput("");
            setModalOpen(false);

            const data = await response.json();
            const names = data.map(idk => idk.text);
            // console.log(names);

            const searchPattern = searchInput;
            const dynamicRegex = new RegExp(searchPattern, "g");
            
            for (let i = 0; i < names.length; i++) {
                if (names[i].match(dynamicRegex) != null) {
                    // console.log(names[i]);
                    searchResult.push(data[i]);
                }
            }
            console.log(searchResult);
        } catch (err) {
            console.log(err);
            toast.error("Failed to search.");
        }
    }

    return (
        <>
        <div className="post-status-container">
            <div className="post-status">
                <button
                    className="open-post-modal"
                    onClick={() => setModalOpen(true)}
                >
                    Start a Search
                </button>
            </div>
            <ModalComponent
                modalOpen={modalOpen}
                setModalOpen={setModalOpen}
                title="Create a Search"
                onSubmit={sendSearch}
                submitLabel="Search"
                disableSubmit={searchInput.trim().length === 0}
            >
                <input
                    type="text"
                    placeholder="What are you searching for?"
                    className="post-input"
                    onChange={(e) => setSearchInput(e.target.value)}
                    value={searchInput}
                />
            </ModalComponent>
        </div>

        <div className="posts-container">
            {searchResult.map((result) => (
                <div key={result._id} className="post-item">
                    <p>{result.text}</p>
                    <LikeButton postID={result._id}/>
                </div>
            ))}
        </div>

        </>
    );
}