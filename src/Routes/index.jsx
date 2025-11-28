import { createBrowserRouter } from "react-router-dom"; 
import Login from "../Pages/Login.jsx"; 
import Register from "../Pages/Register.jsx";

export const router = createBrowserRouter(
    [
    { 
        path: "/", 
        element: <Login />, 
    }, 
    { 
        path: "/register", 
        element: <Register />, 
    }
    ]
);