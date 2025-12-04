import ProfilePopup from "../ProfilePopup";
import React, { useState } from "react";
import './index.scss';
import linkedoutlogo from '../../../assets/linkedoutlogo2.png';
import user from "../../../assets/user.png";
import { FaHome, FaUser, FaItunesNote, FaBriefcase, FaSearch } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';


export default function Topbar() {
    let navigate = useNavigate();
    const [showPopup, setShowPopup] = useState(false);
    const goToRoute = (route) => {
        navigate(route);
    }
    return (
        <div className="topbar-container">
            <img src={linkedoutlogo} alt="LinkedOut Logo" height="50px" style={{ margin: '5px' }} />
            <div className="icons">
                <FaHome size={40} className="icon" onClick={()=>goToRoute("/home")} />
                <FaUser size={35} className="icon" onClick={()=>goToRoute("/profile")}/>
                <FaItunesNote size={40} className="icon" onClick={()=>goToRoute("/playlist")} />
                <FaBriefcase size={40} className="icon" onClick={()=>goToRoute("/job-posting")}/>
                <FaSearch size={40} className="icon" onClick={()=>goToRoute("/search")}/>
            </div>

            <div className="profile-wrapper">
                <img className="profile-picture" src={user} alt="user" onClick={() => setShowPopup(prev => !prev)}/>
                {showPopup && <ProfilePopup />}
            </div>

        </div>

    );
}