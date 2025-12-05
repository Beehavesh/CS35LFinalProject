import React, { useMemo, useState } from "react";
import { getAuth } from "firebase/auth";
import { toast } from 'react-toastify';
import "./index.scss";

//add a like to a post
const addLike = async (postID, setLikedUsers) => {
  try {
    const auth = getAuth();
    const token = await auth.currentUser.getIdToken();
    const userID = auth.currentUser.uid;

    const response = await fetch(
      `https://cs35lfinalproject.onrender.com/api/posts/${postID}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ uid: userID })
      }
    );

    if (!response.ok) throw new Error("Failed to like this post");

    const updatedPost = await response.json();
    setLikedUsers(updatedPost.likedUsers);
    toast.success("Applied to this job!");
  } catch (err) {
    console.log(err);
  }
};

export default function LikeButton({ likedUsers, setLikedUsers, postID }) {
  const handleLike = () => {
    addLike(postID, setLikedUsers);
  };

  return (
    <div className="like-container">
      <div className="like-button" onClick={handleLike}>
        <h3>Apply</h3>
      </div>
      <p>Number of Applications: {likedUsers?.length || 0}</p>
    </div>
  );
}
