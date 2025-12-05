import React, { useMemo, useState } from "react";
import { getAuth } from "firebase/auth";
import { toast } from 'react-toastify';
import "./index.scss";
import { AiOutlineHeart, AiFillHeart, AiOutlineComment } from "react-icons/ai";
import { BsFillHandThumbsUpFill, BsHandThumbsUp } from "react-icons/bs";



// add a like to post
const addLike = async (likedUsers, userID) => {
  try {

    const auth = getAuth();
    const token = await auth.currentUser.getIdToken();

    const response = await fetch(`https://cs35lfinalproject.onrender.com/api/posts`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        "op": "add",
        "path": "/likedUsers/-",
        "value": userID,
      })
    });
    if (!response.ok) throw new Error("Failed to like this post");
  } catch (err) {
    console.log(err);
  }
  
}

export default function LikeButton({ likedUsers, userID }) {

  const handleLike = () => {
    console.log("like button clicked");
    addLike(likedUsers, userID);
  }
  
  let likeNumber = 0;
  if (likedUsers != null) likeNumber = likedUsers.length;

  return (
    <div className="like-container">
      <div className="like-button" onClick={handleLike}>
        <AiOutlineHeart size={25} />
      </div>
      <p>{likeNumber}</p>
    </div>
  );
}
