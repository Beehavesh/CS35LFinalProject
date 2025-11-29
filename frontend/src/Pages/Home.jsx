import React, { useEffect, useState } from 'react';
import HomeComponent from '../Components/HomeComponent.jsx';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebaseConfig.js';
import { useNavigate } from 'react-router-dom';
import Loader from '../Components/Common/Loader.jsx';

export default function Home() {
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    useEffect(() => {
    onAuthStateChanged(auth, (res) => {
        if(!res?.accessToken) {
            navigate("/");
        }else{
            setLoading(false);
        }
    });
    }, []);
    return loading ? <Loader /> : <HomeComponent />;
}