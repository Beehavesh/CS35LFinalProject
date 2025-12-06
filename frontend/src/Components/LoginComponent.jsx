import React from 'react';
import { useState } from 'react';
import motifv2 from '../assets/motif-v2.svg';
import motifChrome from '../assets/motif-chrome.svg';
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
         <div className="entire-page-container">
           <img src = {motifChrome} className = "linkedoutlogo"/>
       
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
       
               <div className="left-side"> 
                   <div className="hero-wrapper">
                       <div className="hero-divider">
                           <h1 className="heading1"> MOTIF. </h1>
                           <h2> an innovative platform for musicians, composers, & employers to connect. </h2>
                           <h3> FEATURING... </h3>
                           <ul>
                               <li> PLAYLIST UPLOAD</li>
                               <li> MUSIC TASTE-BASED JOB SEARCH </li>
                               <li> VIRTUAL INTERACTIONS </li>
                           </ul>
                       </div>
                   </div>
               </div>
       
    <div className="right-side">
        <div className = "login-wrapper">
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
                    <button onClick={login} className='login-button' id="login-button">
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

        </div>
        </div>

    </>
    );
}