import React from "react";
import { onLogout } from "../../../api/AuthAPI";
import { useNavigate } from "react-router-dom";
import "./index.scss";

export default function ProfilePopup(){
    const navigate = useNavigate();

    const logoutUser = () =>{
        onLogout().then(()=>{
            navigate("/login");
        });
    }
    return(
        <div className="popup-card">
            <ul className="popup-options">
                <li className="popup-option" onClick={onLogout}>
                    Logout
                </li>
            </ul>
        </div>
    );
}