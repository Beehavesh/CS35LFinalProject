import { createBrowserRouter } from "react-router-dom"; 
import Login from "../Pages/Login.jsx"; 

export const router = createBrowserRouter(
    [ { 
        path: "/", 
        element: <Login />, 
    }, ]
);