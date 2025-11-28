import React from 'react';
import { useState } from 'react';
import linkedoutlogo from '../Assets/linkedoutlogo2.png';
import { LoginAPI } from '../api/AuthAPI';
import { RegisterAPI } from '../api/AuthAPI';
import '../Sass/LoginComponent.scss';

export default function LoginComponent() {
    const [credentials, setCredentials] = useState({});
    const login = async () => {
        try {
            let res = await LoginAPI(credentials.email, credentials.password);
            console.log(res);
        }
        catch (err) {
            console.log(err);
        }   
    };
    return (
        <div className = "login-wrapper ">
            <img src = {linkedoutlogo} className = "linkedoutlogo"/>
            <h1>Sign in</h1>
            <div className ="auth-inputs">
                <input onChange={(event) => {
                    setCredentials({ ...credentials, email: event.target.value });
                }} 
                className='common-input' 
                placeholder='Enter your email' 
                />
                <input onChange={(event) => {
                    setCredentials({ ...credentials, password: event.target.value });
                }} 
                className='common-input' 
                placeholder='Enter your password' 
                />
            </div>
            <button onClick={login} className='login-button'>
                Log in
            </button>
        </div>
    );
}