import React from 'react';
import { useState } from 'react';
import motifv2 from '../Assets/motif-v2.svg';
import { RegisterAPI, GoogleSignInAPI } from '../api/AuthAPI';
import GoogleButton from 'react-google-button';
import { useNavigate } from "react-router-dom";
import '../Sass/LoginComponent.scss';
import { toast } from 'react-toastify';

export default function RegisterComponent() {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({});
    const register = async () => {
        try {
            let res = await RegisterAPI(credentials.email, credentials.password);
            toast.success("Created account successfully!");
            console.log(res);
            navigate("/home");
        }
        catch (err) {
            console.log(err);
            toast.error("Account creation failed.");
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
            <img src = {motifv2} className = "linkedoutlogo"/>
            <div className = "login-divider">
                <h1 className="heading1">Sign up</h1>
                <p className="subheading1">Welcome! Enter your info to create an account.</p>
                <div className ="auth-inputs">
                    <input onChange={(event) => {
                        setCredentials({ ...credentials, name: event.target.value });
                    }} 
                    className='common-input' 
                    type='text'
                    placeholder='Your Name' 
                    />
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
                    <button onClick={register} className='login-button'>
                        Sign up
                </button>
            </div>
            <hr class="line-divider" data-content="or" />
            <div className='google-button-wrapper'>
            <GoogleButton
                className="google-button"
                type="light" 
                onClick={() => { googleSignIn(); }}
            />
            <p className="signup-text">Already have an account? <span className="signup-link" onClick={() => navigate("/")}>Sign in</span></p>
            </div>
        </div>
    );
}