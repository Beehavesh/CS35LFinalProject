import { createBrowserRouter } from "react-router-dom"; 
import Login from "../Pages/Login.jsx"; 
import Register from "../Pages/Register.jsx";
import Home from "../Pages/Home.jsx";

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
        element: <Home />, 
    }
    ]
);