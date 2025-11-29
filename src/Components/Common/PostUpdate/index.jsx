import React from 'react';
import './index.scss';

export default function PostStatus() {
    return (
        <div className="post-status-container">
            <div className="post-status">
                <textarea
                    className="post-textarea"
                    placeholder="What's on your mind?"
                ></textarea>
                <button className="post-button">Post</button>
            </div>
        </div>
    );
}

