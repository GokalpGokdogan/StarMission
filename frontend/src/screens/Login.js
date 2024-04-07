import React, { useEffect, useState } from 'react';
import {Link, Route} from 'react-router-dom';
import { login } from '../Requests';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showEmailPlaceholder, setShowEmailPlaceholder] = useState(true);
  const [showPasswordPlaceholder, setShowPasswordPlaceholder] = useState(true);
  const [isChecked, setIsChecked] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setShowEmailPlaceholder(e.target.value === '');
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setShowPasswordPlaceholder(e.target.value === '');
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add login functionality here
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
          placeholder="mail@tubitak.com"
          value={email}
          onChange={handleEmailChange}
          className="bg-transparent border border-gray-300 rounded-lg p-2 mb-4 text-white w-full"
        />
        <label htmlFor="password" className="mt-2 text-white text-sm">Password</label>
        <input
          type="password"
          placeholder="Min. 8 characters"
          value={password}
          onChange={handlePasswordChange}
          className="bg-transparent border border-gray-300 rounded-lg p-2 mb-4 text-white w-full"
        />
        <div className="flex items-center justify-between mt-2 mb-6">
          <div className="flex items-center">
            <input type="checkbox" id="keepLoggedIn" checked={isChecked} onChange={handleCheckboxChange} className="mr-2 custom-checkbox" />
            <label htmlFor="keepLoggedIn" className="text-white text-sm">Keep me logged in</label>
          </div>
          <button type="button" className="text-white text-sm cursor-pointer" onClick={handleForgotPasswordClick}>Forgot password?</button>
        </div>
        <label htmlFor="signup" className="mb-2 text-white text-sm">Don't have an account? <Link to="/sign-up" className="text-blue-500">Sign up</Link></label>
        <div className="flex items-center justify-center mb-4 mt-4">
          <button type="submit" className={`w-32 bg-button-purple text-white py-2 rounded-lg font-bold`} onClick={()=> login(email, password)}>
            Login
          </button>
        </div> 
    </form>
    </div>
  );
};


export default Login;