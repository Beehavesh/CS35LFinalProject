import React from 'react';
import Home from '../Pages/Home.jsx';
import Topbar from '../Components/Common/Topbar/index.jsx';

export default function HomeLayout() {
    return (
        <div>
            <Topbar />
             <Home />
        </div>
    );
}