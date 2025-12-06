import { getAuth } from "firebase/auth";
import linkedoutlogo from '../assets/linkedoutlogo2.png';
import '../Sass/ProfileComponent.scss';
import Topbar from '../Components/Common/Topbar/index.jsx';
import motifv2 from '../assets/motif-v2.svg';
import motifChrome from '../assets/motif-chrome.svg';
import React, { useState, useEffect } from "react";
import { useRowStyle } from "antd/es/grid/style/index.js";



export default function ProfileComponent() {
    const [userData, saveUserDataDB] = useState(null);
    const [loading, setLoading] = useState(true);

    const auth = getAuth();
    const firebaseUID = auth.currentUser?.uid;
    useEffect(()=>{
        if (!firebaseUID) return;
        async function fetchUser() {
            try {const res = await fetch(`https://cs35lfinalproject.onrender.com/api/users/${firebaseUID}`);
                if (!res.ok) throw new Error("Failed to fetch user this is pfpcomponent");
                const data = await res.json();
                saveUserDataDB(data);
            } catch (err) {
                console.error("Profile fetch error:", err);
            } finally {
                setLoading(false);
            }
        }

        fetchUser();
    }, [firebaseUID]);

    return (
        <div className="profile-page">
            <Topbar />
            {
                userData && (<div className="profile-header">
                    <img
                    src={userData.photoUrl}
                    alt="Profile"
                    className="profile-picture" 
                    />
                    <div className="profile-info">
                        <h1>{userData.username}</h1>
                        <p className="profile-email">{userData.email}</p>
                        <p className="profile-bio">{userData.bio || "No bio yet."}</p>
                        <button className="edit-btn">
                            Edit Profile
                        </button>
                        </div>
                    </div>)}
            Welcome {userData?.username || "Pooper"}!
            <div className="playlist-section">
                <h2>Your Playlists</h2>
                <p> No playlists added yet. </p>
            </div>
        </div>
    );
}