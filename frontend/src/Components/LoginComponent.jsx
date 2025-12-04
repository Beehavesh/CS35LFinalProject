import React from 'react';
import { useState } from 'react';
import motifv2 from '../Assets/motif-v2.svg';
import motifChrome from '../Assets/motif-chrome.svg';
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
        <> 

        <p className="marquee">
            <span> <x-purpletext> MOTIF </x-purpletext> MADE BY MUSICIANS, FOR MUSICIANS.  <x-purpletext> MOTIF </x-purpletext>  MADE BY MUSICIANS.  <x-purpletext> MOTIF </x-purpletext> MADE BY MUSICIANS, FOR MUSICIANS. <x-purpletext> MOTIF </x-purpletext> MADE BY MUSICIANS, FOR MUSICIANS.  &nbsp;</span>
        </p>

        <div className = "model-viewer">
            <model-viewer
            id="reveal"
            loading="eager"
            camera-controls touch-action = "pan-y"
            auto-rotate
            disable-zoom
            disable-pan
            poster={motifChrome}
            tone-mapping="aces"
            src="/motif3dreal.gltf"
            environment-image="neutral"
            shadow-intensity="1"
            alt="3d model of motif logo"
            ></model-viewer>
        </div>
        <div className = "login-wrapper">
            <img src = {motifChrome} className = "linkedoutlogo"/>
            <div className = "login-divider">
                <h1 className="heading1">SIGN IN</h1>
                <p className="subheading1">Welcome back! Please enter your details.</p>
                <div className ="auth-inputs">
                    <input onChange={(event) => {
                        setCredentials({ ...credentials, email: event.target.value });
                    }} 
                    id = 'email'
                    className='common-input' 
                    type='email'
                    placeholder='Enter your email' 
                    />
                    <input onChange={(event) => {
                        setCredentials({ ...credentials, password: event.target.value });
                    }} 
                    id = 'password'
                    className='common-input' 
                    type='password'
                    placeholder='Enter your password' 
                    />
                </div>
                    <button onClick={login} className='login-button'>
                        Log in
                </button>
            </div>
            <hr className="line-divider" data-content="or" />
            <div className='google-button-wrapper'>
            <GoogleButton
                className="google-button"
                type="light" 
                onClick={() => { googleSignIn(); }}
            />
            <p className="signup-text">Don't have an account? <span className="signup-link" onClick={() => navigate("/register")}>Sign up</span></p>
            </div>
        </div>
    </>
    );
}