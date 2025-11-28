import React from 'react' 
import ReactDOM from 'react-dom/client' 
import { StrictMode } from 'react' 
import { createRoot } from 'react-dom/client' 
import './index.css' 
import { RouterProvider } from 'react-router-dom' 
import { router } from './Routes/index.jsx' 
import { auth } from './firebaseConfig';

ReactDOM.createRoot(document.getElementById('root')).render( 
  <StrictMode> 
  <RouterProvider router={router} /> 
  </StrictMode>, 
  )