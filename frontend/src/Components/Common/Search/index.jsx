import { useState, useEffect } from "react";
import './index.scss';
import ModalComponent from '../Modal/index.jsx';
import { getAuth } from "firebase/auth";
import { toast } from 'react-toastify';
import LikeButton from '../LikeButton/index.jsx';

export function SearchResult(result) {

    if (result.result.length != 0) {
        return (
            <div className="posts-container">
                {result.result.map((post) => (
                    <div key={post._id} className="post-item">
                        <p>{post.text}</p>
                        <LikeButton likedUsers={post.likedUsers} postID={post._id} />
                    </div>
                ))}
            </div>
        );
    } else {
        return;
    }
}

const getSearchResult = async (setMatchedResult, setModalOpen, searchInput) => {

    const auth = getAuth();
    const token = await auth.currentUser.getIdToken();

    try {
        const response = await fetch("https://cs35lfinalproject.onrender.com/api/posts", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        });
        if (!response.ok) throw new Error("Failed to search");
        setModalOpen(false);

        const data = await response.json();
        // const names = data.map(item => item.text);
        const searchPattern = searchInput;
        const dynamicRegex = new RegExp(searchPattern, "g");
        setMatchedResult(data.filter(item => item.text.match(dynamicRegex) != null));

    } catch (err) {
        console.log(err);
        toast.error("Failed to search.");
    }
}

export default function Search() {

    const [matchedResult, setMatchedResult] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [searchInput, setSearchInput] = useState('');

    const sendSearch = async () => {   
        getSearchResult(setMatchedResult, setModalOpen, searchInput);
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
        
        <SearchResult result={matchedResult} />

        </>
    );
}