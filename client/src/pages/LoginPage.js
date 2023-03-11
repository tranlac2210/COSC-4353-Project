import React, { useState } from "react";
import {Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../styles/LoginPage.css";
import { AppProvider } from '../components';
import { createAPIEndpoint, ENDPOINTS } from "../API";

import { Navbar } from '../components'
import { Background } from '../components'
import { Sidebar } from '../components'
import { Submenu } from '../components'



function LoginPage({onBack, onClose, openSignUp}){

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [ErrorLabel, setErrorLabel] = useState(false);
  const navigate  = useNavigate ();

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      // Send a POST request to the login API endpoint
      // const response = await axios.post('http://localhost:9000/user/signin', {
      //   userName: username,
      //   password: password        
      // });
      const response = await createAPIEndpoint(ENDPOINTS.UserSignIn).post({
        userName: username,
        password: password        
      });

      console.log(response.data);
      // alert(`${response.status},${password}`)
      if (response.status!==200) {
        // If the response is not OK, throw an error
        throw new Error(response.error);
      }
  
      // If the response is OK, redirect to the client page
      navigate('/ClientPage?id='+ response.id);
    } 
     catch (er) {
      // If there's an error, set the error label
      setErrorLabel(er.error);
    }
  };

  return (
    <>
      {/* onclick="window.location.href='/';" */}
      <div className="wholeloginpage overlay" onClick={onClose}> 
        <div onClick={(e) => {e.stopPropagation()}}>
        <form className="c_login_form" onSubmit={handleSubmit}>
          <button onClick={onBack} className="loginbb" href="/" id="bottle">
            <img src="https://cdn.discordapp.com/attachments/722016314679361559/1078414402761527417/image_3.png" alt="bottle"/>
          </button>

          <div className="login-background">
            <img src="https://cdn.discordapp.com/attachments/722016314679361559/1075986201259036722/login.jpg" alt="Login Image"/>
          </div>

  
          <div className="pink">
            <h3>Log In</h3>
            <label className="login_username" htmlFor="username">Username:</label>
            <input className="login_input"
              type="text"
              id="username"
              value={username}
              onChange={event => setUsername(event.target.value)}
            />
          </div>
          <div>
            <label className="login_pass" htmlFor="password">Password:</label>
            <input className="login_input"
              type="password"
              id="password"
              value={password}
              onChange={event => setPassword(event.target.value)}
            />
          </div>
          {ErrorLabel && (<label className="error-label"> {ErrorLabel}</label>)}

          <button className="login_button" type="submit"><h4>Submit</h4></button>
          
          
          
          
          <div className="already-have-account">
          Not a member yet? 
          <button className="signup_now" onClick={openSignUp}>Create New Account</button>
        </div>
        <div className="already-have-account">
          Admin log in - 
          <a className="signup_now" href="/AdminLoginPage">Click here</a>
        </div>
          <Link className="demo" to="/ClientPage">Continue as Guest</Link>

        </form>
        </div>
        
      </div>
    </>
    
  );
};

export default LoginPage;