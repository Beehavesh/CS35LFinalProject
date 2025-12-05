import { useState, useEffect } from "react";
import "./index.scss";
import { getAuth } from "firebase/auth";

const getUserPlaylists = async (setUserPlaylists) => {
    try {
        const auth = getAuth();
        const userId = auth.currentUser.uid;

        if (!auth.currentUser) {
            console.log("User not logged in yet");
            return;
        }

        const token = await auth.currentUser.getIdToken();

        const response = await fetch(
            `https://cs35lfinalproject.onrender.com/api/playlist/${userId}`,
            {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        if (!response.ok) throw new Error("Failed to fetch posts");

        const data = await response.json();
        setUserPlaylists(data);
    } catch (err) {
        console.log(err);
    }
};

export default function GetUserPlaylists() {
    const [userPlaylists, setUserPlaylists] = useState([]);

    useEffect(() => {
        getUserPlaylists(setUserPlaylists);
    }, []);


    return (
        <div className="playlists-container">
            {userPlaylists.map((playlist) => (
                <div key={playlist._id} className="playlist-item">
                    <h3>{playlist.playlistTitle}</h3>
                    {playlist.tags && playlist.tags.length > 0 && (
                        <div className="playlist-tags">
                            <strong>Tags:</strong>
                            <ul>
                                {playlist.tags.map((tag, index) => (
                                    <li key={index}>{tag}</li>
                                ))}
                        </ul>
                    </div>
                    )}
                    {playlist.songs && playlist.songs.length > 0 && (
                    <div className="playlist-songs">
                        <strong>Songs:</strong>
                        <ul>
                            {playlist.songs.map((song, index) => (
                                <li key={index}>
                                    {song.title} — {song.artist}
                                </li>
                            ))}
                        </ul>
                    </div>
                    )}
                </div>
            ))}
        </div>
    );
}