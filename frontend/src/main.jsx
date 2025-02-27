import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './index.css'
import axiosInstance from '../src/context/customHooks/RefreshTokenAxios.jsx';
// import { AuthContextProvider } from './context/customHooks/AuthContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <AuthContextProvider> */}
      <App />
      <ToastContainer />
    {/* </AuthContextProvider> */}
  </React.StrictMode>,
)
 