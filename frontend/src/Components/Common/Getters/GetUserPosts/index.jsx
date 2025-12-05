import { useState, useEffect } from "react";
import "./index.scss";
import { getAuth } from "firebase/auth";

// Fetch all posts created by current user
const getUserPosts = async (setUserPosts) => {
  try {
    const auth = getAuth();

    if (!auth.currentUser) {
      console.log("User not logged in yet");
      return;
    }

    const userId = auth.currentUser.uid;
    const token = await auth.currentUser.getIdToken();

    const response = await fetch(
      `https://cs35lfinalproject.onrender.com/api/posts/${userId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) throw new Error("Failed to fetch posts");

    const data = await response.json();
    setUserPosts(data);
  } catch (err) {
    console.log(err);
  }
};

// Fetch applicants for a specific post
const getApplicants = async (postId, setApplicants) => {
  try {
    const auth = getAuth();
    const token = await auth.currentUser.getIdToken();

    const response = await fetch(
      `https://cs35lfinalproject.onrender.com/api/posts/${postId}/likes`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (!response.ok) throw new Error("Failed to fetch applicants");

    const data = await response.json();
    setApplicants(data.likes || []);
  } catch (err) {
    console.log(err);
  }
};

// Component for one post + its applicants
function PostWithApplicants({ post }) {
  const [applicants, setApplicants] = useState([]);

  useEffect(() => {
    getApplicants(post._id, setApplicants);
  }, [post._id]);

  return (
    <div className="user-post-item">
      <h3>Applicants:</h3>

      {applicants.length === 0 && <p>No applicants yet.</p>}

      <ol className="applicant-list">
        {applicants.map((a) => (
          <li key={a.firebaseUID} className="applicant-item">
            <div>
              <p className="applicant-username">{a.username}</p>
              <p className="applicant-bio">{a.bio}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default function GetUserPosts() {
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    getUserPosts(setUserPosts);
  }, []);

  return (
    <div className="user-posts-container">
      {userPosts.map((post) => (
        <div key={post._id} className="all-post-item">
                    <h1>{post.text}</h1>
                    <h2>{post.company}</h2>
                    <h3>{post.description}</h3>
                {post.tags.map((tag, index) => (
                    <p className="wrapped" key={index}>{tag.genre}</p>
                    ))}   
        <PostWithApplicants key={post._id} post={post} />
        </div>
      ))}
    </div>
  );
}
