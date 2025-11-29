import React from 'react';
import './index.scss';
import linkedoutlogo from '../../../assets/linkedoutlogo2.png';
import { FaHome, FaUsers, FaBriefcase, FaSearch, FaBell } from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';


export default function Topbar() {
    let navigate = useNavigate();
    const goToRoute = (route) => {
        navigate(route);
    }
    return (
        <div className="topbar-container">
            <img src={linkedoutlogo} alt="LinkedOut Logo" height="50px" style={{ margin: '5px' }} />
            <div className="icons">
                <FaHome size={40} className="icon" onClick={()=>goToRoute("/home")} />
                <FaUsers size={40} className="icon"/>
                <FaBriefcase size={40} className="icon"/>
                <FaSearch size={40} className="icon"/>
                <FaMessage size={40} className="icon"/>
                <FaBell size={40} className="icon"/>
            </div>
            <img className="profile-picture" src={linkedoutlogo} alt="LinkedOut Logo"  />
        </div>
    );
}