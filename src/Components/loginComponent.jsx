import React from 'react';
import { useState } from 'react';
import linkedoutlogo from '../Assets/linkedoutlogo2.png';
import { LoginAPI, GoogleSignInAPI } from '../api/AuthAPI';
import GoogleButton from 'react-google-button';
import { useNavigate } from "react-router-dom";
import '../Sass/LoginComponent.scss';
import { toast } from 'react-toastify';

export default function LoginComponent() {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({});
    const login = async () => {
        try {
            let res = await LoginAPI(credentials.email, credentials.password);
            toast.success("Logged in successfully!");
            console.log(res);
            navigate("/home");
        }
        catch (err) {
            console.log(err);
            toast.error("Login failed. Please check your credentials.");
        }   
    };
    const googleSignIn = async () => {
        try {
            let res = await GoogleSignInAPI();
            toast.success("Google Sign-In successful!");
            console.log(res);
            navigate("/home");
        }
        catch (err) {
            toast.error("Google Sign-In failed.");
            console.log(err);
        }
    };
    return (
        <div className = "login-wrapper ">
            <img src = {linkedoutlogo} className = "linkedoutlogo"/>
            <div className = "login-divider">
                <h1 className="heading1">Sign in</h1>
                <p className="subheading1">Welcome back! Please enter your details.</p>
                <div className ="auth-inputs">
                    <input onChange={(event) => {
                        setCredentials({ ...credentials, email: event.target.value });
                    }} 
                    className='common-input' 
                    type='email'
                    placeholder='Enter your email' 
                    />
                    <input onChange={(event) => {
                        setCredentials({ ...credentials, password: event.target.value });
                    }} 
                    className='common-input' 
                    type='password'
                    placeholder='Enter your password' 
                    />
                </div>
                    <button onClick={login} className='login-button'>
                        Log in
                </button>
            </div>
            <hr class="line-divider" data-content="or" />
            <div className='google-button-wrapper'>
            <GoogleButton
                className="google-button"
                type="light" 
                onClick={() => { googleSignIn(); }}
            />
            <p className="signup-text">Don't have an account? <span className="signup-link" onClick={() => navigate("/register")}>Sign up</span></p>
            </div>
        </div>
    );
}