import { getAuth } from "firebase/auth";
import '../Sass/ProfileComponent.scss';
import Topbar from '../Components/Common/Topbar/index.jsx';
import React, { useState, useEffect } from "react";

export default function ProfileComponent() {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);

    // editing states
    const [editchangeBio, changeBio] = useState(false);
    const [editchangeProfilePhoto, changeProfilePhoto] = useState(false);

    // new input values
    const [newBio, setNewBio] = useState("");
    const [newPhoto, setNewPhoto] = useState("");

    const auth = getAuth();
    const [firebaseUID, setFirebaseUID] = useState(null);

    useEffect(() => {
        const unsub = auth.onAuthStateChanged((user) => {
            setFirebaseUID(user?.uid || null);
        });

        return () => unsub();
    }, []);

    

    // Update Bio
    const updateBio = async () => {
        const user = auth.currentUser;
        if (!user) return console.error("NO USER LOGGED IN WTF");
        const token = await user.getIdToken();
        const res = await fetch(`https://cs35lfinalproject.onrender.com/api/users/${user.uid}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ bio: newBio }),
        });

        const updated = await res.json();
        setUserData(updated);
        changeBio(false);
    };

    // Update Profile Picture
    const updatePhoto = async () => {
        const user = auth.currentUser;
        if (!user) return console.error("NO USER LOGGED IN WTF");
        const token = await user.getIdToken();
        const res = await fetch(`https://cs35lfinalproject.onrender.com/api/users/${user.uid}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ photoUrl: newPhoto }),
        });

        const updated = await res.json();
        setUserData(updated);
        changeProfilePhoto(false);
    };

    // Fetch user on load
    useEffect(() => {
        const auth = getAuth();
        console.log("🔥 CURRENT LOGGED-IN UID =", auth.currentUser?.uid);
        if (!firebaseUID) return;
        async function fetchUser() {
            try {
                const res = await fetch(`https://cs35lfinalproject.onrender.com/api/users/${firebaseUID}`);
                if (!res.ok) throw new Error("Failed to fetch user");
                const data = await res.json();
                setUserData(data);
            } catch (err) {
                console.error("Profile fetch error:", err);
            } finally {
                setLoading(false);
            }
        }

        fetchUser();
    }, [firebaseUID]);

    if (loading) return <div>Loading...</div>;

    return (
        <div className="profile-page">
            <Topbar />

            {userData && (
                <div className="profile-header">
                    <img
                        src={userData.photoUrl}
                        alt="Profile"
                        className="profile-picture"
                    />

                    <div className="profile-info">
                        <h1>{userData.username}</h1>
                        <p className="profile-bio">{userData.bio || "No bio yet."}</p>

                        <button className="edit-btn" onClick={() => {
                            setNewBio(userData.bio || "");
                            changeBio(true);
                        }}>
                            Edit Bio
                        </button>

                        <button className="edit-btn" onClick={() => {
                            setNewPhoto(userData.photoUrl || "");
                            changeProfilePhoto(true);
                        }}>
                            Change Profile Picture
                        </button>
                    </div>
                </div>
            )}

            <h2>Your Playlists</h2>
            <p>No playlists added yet.</p>

            {/* BIO MODAL */}
            {editchangeBio && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Edit Bio</h2>
                        <textarea
                            value={newBio}
                            onChange={(e) => setNewBio(e.target.value)}
                            placeholder="Write something about yourself!"
                        />
                        <button onClick={updateBio}>Save</button>
                        <button onClick={() => changeBio(false)}>Cancel</button>
                    </div>
                </div>
            )}

            {/* PROFILE PHOTO MODAL */}
            {editchangeProfilePhoto && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Change Profile Picture</h2>
                        <input
                            type="text"
                            value={newPhoto}
                            onChange={(e) => setNewPhoto(e.target.value)}
                            placeholder="Paste new image URL"
                        />
                        <button onClick={updatePhoto}>Save</button>
                        <button onClick={() => changeProfilePhoto(false)}>Cancel</button>
                    </div>
                </div>
            )}
        </div>
    );
}