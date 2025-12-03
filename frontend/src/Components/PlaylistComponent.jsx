import '../Sass/PlaylistComponent.scss';
import { useState } from 'react';
import { getAuth } from 'firebase/auth';
import FormComponent from './Common/Form';
import ModalComponent from './Common/Modal';

export default function PlaylistComponent() {
    const [modalOpen, setModalOpen] = useState(false);
    const [playlistTitle, setPlaylistTitle] = useState("");
    const [songs, setSongs] = useState([
     { title: "", artist: "", album: "", releaseDate: "", link: "" }
    ]);
    const handleSubmit = async () => {
    const auth = getAuth();
    const token = await auth.currentUser.getIdToken();
    
    const response = await fetch("https://cs35lfinalproject.onrender.com/api/playlists", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
    },
        body: JSON.stringify({
        userId: auth.currentUser.uid,
        playlistTitle,
         songs
    })
    });

    if (!response.ok) {
        console.error("Error creating playlist");
    }
    };
    return (
        <div className="playlist-upload-container">
            <div className="playlist-upload">
                <button
                    className="open-playlist-form"
                    onClick={() => setModalOpen(true)}
                >
                    Start a Post
                </button>
            </div>
            <ModalComponent
                modalOpen={modalOpen}
                setModalOpen={setModalOpen}
                title="Create a Playlist"
                onSubmit={handleSubmit}
                submitLabel="Create"
                disableSubmit={false}
            >
                <FormComponent />
            </ModalComponent>
        </div>
    );
}

/*const [playlistTitle, setPlaylistTitle] = useState("");
    const [songs, setSongs] = useState([
     { title: "", artist: "", album: "", releaseDate: "", link: "" }
    ]);
    const addSong = () => {
        setSongs([...songs, { title: "", artist: "", album: "", releaseDate: "", link: "" }]);
    };

    const updateSong = (index, field, value) => {
    const updated = [...songs];
    updated[index][field] = value;
        setSongs(updated);
    };

    const removeSong = (index) => {
    const updated = songs.filter((_, i) => i !== index);
        setSongs(updated);
    };

    const handleSubmit = async () => {
    const auth = getAuth();
    const token = await auth.currentUser.getIdToken();
    
    const response = await fetch("https://cs35lfinalproject.onrender.com/api/playlists", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
    },
        body: JSON.stringify({
        userId: auth.currentUser.uid,
        playlistTitle,
         songs
    })
    });

    if (!response.ok) {
        console.error("Error creating playlist");
    }
    };*/