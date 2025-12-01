import React, { useMemo, useState } from "react";

import "./index.scss";
import { AiOutlineHeart, AiFillHeart, AiOutlineComment } from "react-icons/ai";
import { BsFillHandThumbsUpFill, BsHandThumbsUp } from "react-icons/bs";

export default function LikeButton({ userID, postID }) {
  const handleLike = () => {
    console.log("like button clicked");
  }
  return (
    <div className="like-container" onClick={handleLike}>
      <AiOutlineHeart size={25} />
    </div>
  );
}
