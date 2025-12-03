import { createBrowserRouter } from "react-router-dom"; 
import Login from "../Pages/Login.jsx"; 
import Register from "../Pages/Register.jsx";
import HomeLayout from "../layouts/HomeLayout.jsx";
import Profile from "../Pages/Profile.jsx";
import PlaylistLayout from "../layouts/PlaylistLayout.jsx"
import Jobpost from "../Pages/Jobpost.jsx"
import Search from "../Pages/Search.jsx"

export const router = createBrowserRouter(
    [
    { 
        path: "/", 
        element: <Login />, 
    }, 
    { 
        path: "/register", 
        element: <Register />, 
    },
    { 
        path: "/home", 
        element: <HomeLayout />, 
    },
    { 
        path: "/profile", 
        element: <Profile />, 
    },
    { 
        path: "/playlist", 
        element: <PlaylistLayout />, 
    },
    { 
        path: "/job-posting", 
        element: <Jobpost />
    },
    { 
        path: "/search", 
        element: <Search />, 
    }
    ]
);