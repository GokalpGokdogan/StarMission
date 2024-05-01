import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { UserProvider } from './UserProvider';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

axios.interceptors.response.use(response => {
  return response;
}, error => {
  if (error.response && error.response.status === 401) { // Assuming 401 means session expired
    // Redirect to login
    const navigate = useNavigate();
    navigate('/');
  }
  return Promise.reject(error);
});


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
  <UserProvider>
    <App />
  </UserProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
