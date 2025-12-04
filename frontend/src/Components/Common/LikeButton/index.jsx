import React, { useMemo, useState } from "react";
import { getAuth } from "firebase/auth";
import { toast } from 'react-toastify';
import "./index.scss";
import { AiOutlineHeart, AiFillHeart, AiOutlineComment } from "react-icons/ai";
import { BsFillHandThumbsUpFill, BsHandThumbsUp } from "react-icons/bs";

const getLikes = async (targetPostID) => {
  try {
    const auth = getAuth();
    const token = await auth.currentUser.getIdToken();
    const response = await fetch("https://cs35lfinalproject.onrender.com/api/likes", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
    });
    if (!response.ok) throw new Error("Failed to fetch likes");
    const data = await response.json();
    const likedUsers = (data.find(idk => idk.postID === targetPostID)).likedUserIDs;
    const likeNumber = likedUsers.length;
    console.log(likeNumber + " people liked this post");
    
  } catch (err) {
    console.log(err);
  }
};

// add a like to post
// will need to pass user ID as argument
const addLike = async (targetPostID) => {
  try {
    const auth = getAuth();
    const token = await auth.currentUser.getIdToken();

    const response = await fetch(`https://cs35lfinalproject.onrender.com/api/likes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        postID: targetPostID,
        userID: "Example user ID",
      })
    });
    if (!response.ok) throw new Error("Failed to like this post");
  } catch (err) {
    console.log(err);
  }
  
}

export default function LikeButton({ postID }) {
  const handleLike = () => {
    console.log("like button clicked");
    addLike(postID);
  }
  //getLikes(postID);

  return (
    <div className="like-container" onClick={handleLike}>
      <AiOutlineHeart size={25} />
    </div>
  );
}
