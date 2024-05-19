import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from '../UserProvider';
import {Link, Route, Navigate, useNavigate} from 'react-router-dom';
import { login } from '../Requests';
import { useUser } from '../UserProvider';
import { Alert } from '@mui/material';
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const Login = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [alertText, setAlertText] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showEmailPlaceholder, setShowEmailPlaceholder] = useState(true);
  const [showPasswordPlaceholder, setShowPasswordPlaceholder] = useState(true);
  const [isChecked, setIsChecked] = useState(false);
  const navigate = useNavigate();
  const {setUserType} = useUser();
  const {setUserId} = useUser();
  
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setShowEmailPlaceholder(e.target.value === '');
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setShowPasswordPlaceholder(e.target.value === '');
  };
  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };
  const handleForgotPasswordClick = () => {
    // Handle forgot password logic
    console.log("Forgot password clicked");
  };

  useEffect (() => {
    console.log(email);
    console.log(password);
  }, [email, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password, navigate, setUserType, setUserId);
    }catch (error){
      if (error.response && error.response.status) {
        const status = error.response.status;
  
        if (status === 400) {
          setAlertText('Invalid email or password.');
        }else {
          setAlertText('An unknown error occurred. Please try again.');
        }
      
      setShowAlert(true);
      }}
  };
  

  return (
    <div className="flex items-center justify-center bg-main-bg h-screen">
      <form onSubmit={handleSubmit} className="bg-main-bg p-8 rounded shadow-md flex flex-col justify-center w-full max-w-md">
        <div className="flex items-center justify-center mb-4">
          <h2 className="text-6xl font-bold mt-4 mb-4 text-white">StarMission</h2>
        </div>
        <label htmlFor="email" className="mt-2 text-white text-lg">Enter your email and password to login!</label>
        <label htmlFor="email" className="mt-6 text-white text-sm">Email</label>
        <input
          type="email"
          id="email"
          placeholder="mail@tubitak.com"
          value={email}
          onChange={handleEmailChange}
          className="bg-transparent border border-gray-300 rounded-lg p-2 mb-4 text-white w-full"
        />
        <label htmlFor="password" className="mt-2 text-white text-sm">Password</label>
        <input
          type="password"
          id="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
          className="bg-transparent border border-gray-300 rounded-lg p-2 mb-4 text-white w-full"
        />

        <label className="mb-2 text-white text-sm">Don't have an account? <Link to="/sign-up" className="text-blue-500">Sign up</Link></label>
        <div className="flex items-center justify-center mb-4 mt-4">
          <button type="submit" className={`w-32 bg-button-purple text-white transition-colors duration-300 ease-in-out hover:bg-indigo-700 hover:text-gray-100 hover:shadow-lg py-2 rounded-lg font-bold`}>
            Login
          </button>
        </div> 
    </form>
    {showAlert && (
                <div className={`fixed bottom-4 right-4 max-w-96 flex ${alertText.length > 40 ? 'flex-col items-end justify-center' : 'flex-row items-center'}`}>
                    <Alert severity={alertText.includes('successful') ? 'success' : 'error'} className="w-full">
                        <div className="flex items-center justify-between w-full">
                            <div>{alertText}</div>
                            <IconButton onClick={() => setShowAlert(false)}>
                                <CloseIcon />
                            </IconButton>
                        </div>
                    </Alert>
                </div>
            )}
    </div>
  );
};


export default Login;