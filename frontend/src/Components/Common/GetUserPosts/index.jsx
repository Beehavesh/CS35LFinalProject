import { useState, useEffect } from "react";
import "./index.scss";
import { getAuth } from "firebase/auth";

const getUserPosts = async (setUserPosts) => {
    try {
        const auth = getAuth();
        const userId = auth.currentUser.uid;

        if (!auth.currentUser) {
            console.log("User not logged in yet");
            return;
        }

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

const getApplicants = async (postId, setApplicants) => {
  try {
    const auth = getAuth();
    const token = await auth.currentUser.getIdToken();

    const response = await fetch(
      `https://cs35lfinalproject.onrender.com/api/posts/${postId}/likes`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) throw new Error("Failed to fetch applicants");

    const data = await response.json();
    setApplicants(data.applicants);
  } catch (err) {
    console.log(err);
  }
};

export default function GetUserPosts() {
    const [userPosts, setUserPosts] = useState([]);

    useEffect(() => {
        getUserPosts(setUserPosts);
    }, []);

function PostWithApplicants({ post }) {
  const [applicants, setApplicants] = useState([]);

  useEffect(() => {
    getApplicants(post._id, setApplicants);
  }, [post._id]);

  return (
    <div className="user-post-item">
      <p className="job-text">{post.text}</p>

      <h3>Applicants:</h3>

      {applicants.length === 0 && <p>No applicants yet.</p>}

      <ol className="applicant-list">
        {applicants.map((a) => (
          <li key={a.firebaseUID} className="applicant-item">
            <img src={a.photoUrl} alt="profile" className="applicant-pfp" />
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
}