import React, { useState } from "react";
import {Link, useHistory} from 'react-router-dom';
import "../styles/LoginPage.css";

import { Navbar } from '../components'
import { Background } from '../components'
import { Sidebar } from '../components'
import { Submenu } from '../components'
import { AppProvider } from '../components';


function LoginPage(){

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [ErrorLabel, setErrorLabel] = useState(false);

  const handleSubmit = event => {
    event.preventDefault();
    alert('Incorrect Password or Username!!');
    setErrorLabel(true);
    setErrorLabel('Incorrect Password or Username!!');
    console.log("Username: ", username);
    console.log("Password: ", password);
  };

  return (
    <>
      
      <div className="wholeloginpage"> 
      <div className="bb"></div>
      
      <form className="login_form" onSubmit={handleSubmit}>
      <div className="login-background">
        <img src="https://cdn.discordapp.com/attachments/722016314679361559/1075986201259036722/login.jpg" alt="Login Image"/>
      </div>
      
        <h3>Log in</h3>
        <div >
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
        Not a member? 
        <a className="signup_now" href="/SignupPage">Create New Account</a>
      </div>
        <Link className="demo" to="/ClientPage">Continue as Guest</Link>

      </form>
      </div>
    </>
    
  );
};

export default LoginPage;