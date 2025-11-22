import React from 'react';
import linkedoutlogo from '../Assets/linkedoutlogo2.png';

export default function loginComponent() {
    const login = async () => {
        console.log(err);
    };
    return (
        <div className = "login-wrapper ">
            <img src = {linkedoutlogo} className = "linkedoutlogo"/>
            <h1>Sign in</h1>
        </div>
    );
}