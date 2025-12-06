import '../Sass/PlaylistComponent.scss';
import { useState } from 'react';
import { Form } from 'antd';
import { getAuth } from 'firebase/auth';
import FormComponent from './Common/Form';
import ModalComponent from './Common/Modal';
import GetUserPlaylists from './Common/Getters/GetUserPlaylists';

export default function PlaylistComponent() {
    const [modalOpen, setModalOpen] = useState(false);
    const [form] = Form.useForm(); 
    const handleSubmit = async () => {
    const auth = getAuth();
    const token = await auth.currentUser.getIdToken();

    try {
    await form.validateFields();
    } catch (err) {
    console.error("Validation failed, not submitting", err);
    return;
    }

    const values = form.getFieldsValue();

    const payload = {
        userId: auth.currentUser.uid,
        playlistTitle: values.playlistTitle,
        songs: values.songs,
        genreTags: values.genreTags || []
    };

    console.log("Submitting payload:", payload);

    const response = await fetch(
      "https://cs35lfinalproject.onrender.com/api/playlist",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      }
    );

    if (!response.ok) {
      console.error("Error creating playlist");
    }
    setModalOpen(false);
}
        
    return (
        <>
        <h1 className="heading1"> YOUR MUSIC </h1>
        <div className="playlist-upload-container">
            <div className="playlist-upload">
                <button
                    className="open-playlist-form"
                    onClick={() => setModalOpen(true)}
                >
                    Create a Playlist
                </button>
            </div>
            <ModalComponent
                modalOpen={modalOpen}
                setModalOpen={setModalOpen}
                onSubmit={handleSubmit}
            >
                <FormComponent form={form}/>
            </ModalComponent>
            <GetUserPlaylists />
        </div>
    </>
    );
}