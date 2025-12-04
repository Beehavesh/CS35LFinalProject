import React from 'react';
import { useState } from 'react';
import motifv2 from '../Assets/motif-v2.svg';
import { RegisterAPI, GoogleSignInAPI } from '../api/AuthAPI';
import GoogleButton from 'react-google-button';
import { useNavigate } from "react-router-dom";
import '../Sass/LoginComponent.scss';
import { toast } from 'react-toastify';
import {getAuth} from "firebase/auth";


export default function RegisterComponent() {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({});

    //linking to the backend 
    //uncomment if this doesnt work
    /*
    const saveUserDataDB = async() =>{
        try{
            const auth = getAuth();
            const token = await auth.currentUser.getIdToken();
            await fetch("https://cs35lfinalproject.onrender.com/api/auth",{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({}),
            });
        }
        catch(err){
            console.log("error saving user bluh", err)
        }
    };
    */
   const saveUserDataDB = async(email, username, photoUrl) =>{
    const auth = getAuth();
    const userId = auth.currentUser.uid; //this is the firebase uid

    await fetch("https://cs35lfinalproject.onrender.com/api/auth",{
        method: "POST",
        headers:{
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(userData),
    });
   };

    const register = async () => {
        try {
            let res = await RegisterAPI(credentials.email, credentials.password);
            toast.success("Created account successfully!");
            console.log(res);
            //implement mongodb stuff here

            await saveUserDataDB({
                email: credentials.email,
                username: credentials.name,
                photoUrl:""
            });

            navigate("/home");
        }
        catch (err) {
            console.log(err);
            toast.error("heyyy ur stuff not workinnn.");
        }   
    };
    const googleSignIn = async () => {
        try {
            let res = await GoogleSignInAPI();
            const user = res.user;
            toast.success("Google Sign-In successful!");
            console.log(res);
            //implement mongodb stuff here
            await saveUserDataDB({
                email: user.email,
                username: user.displayName || user.email.split("@")[0],
                photoUrl: user.photoUrl || "",
            });

            navigate("/home");
        }
        catch (err) {
            toast.error("Google Sign-In failed.");
            console.log(err);
        }
    };
    return (
<<<<<<< HEAD
        <div className = "login-wrapper ">
            <img src = {motifv2} className = "linkedoutlogo"/>
=======
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
>>>>>>> dfbc7a63546955e42605eed7bd75cdbb5cc59086
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
            <hr className="line-divider" data-content="or" />
            <div className='google-button-wrapper'>
            <GoogleButton
                className="google-button"
                type="light" 
                onClick={() => { googleSignIn(); }}
            />
            <p className="signup-text">Already have an account? <span className="signup-link" onClick={() => navigate("/")}>Sign in</span></p>
            </div>
        </div>
<<<<<<< HEAD
=======
        </div>

     </div>
    </>
>>>>>>> dfbc7a63546955e42605eed7bd75cdbb5cc59086
    );
};