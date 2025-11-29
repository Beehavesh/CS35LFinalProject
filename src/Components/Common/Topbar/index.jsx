import React from 'react';
import './index.scss';
import linkedoutlogo from '../../../assets/linkedoutlogo2.png';
import { FaHome, FaUsers, FaBriefcase, FaSearch, FaBell } from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";


export default function Topbar() {
    return (
        <div className="topbar-container">
            <img src={linkedoutlogo} alt="LinkedOut Logo" height="50px" style={{ margin: '5px' }} />
            <div className="icons">
                <FaHome size={40} className="icon"/>
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