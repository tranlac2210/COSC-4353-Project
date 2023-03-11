import React, { useState } from "react";
import {Link, useHistory} from 'react-router-dom';
import '../styles/AdminLoginPage.css';
import "bootstrap/dist/css/bootstrap.min.css"

function AdminLoginPage(){

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
      <div className="container">
      <div className="ad_login_form">
        <div className="headAdmin"></div>
        <h3>Staff Log in</h3>
        <div className="content">
        <div>
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

        <button className="btn btn-success btn-ho" onClick={handleSubmit}>Submit</button>
        </div>
        
        
        {/* <div className="already-have-account">
        Not a member? 
        <a className="signup_now" href="/SignupPage">Create New Account</a>
      </div> */}
        {/* <Link className="demo" to="/admin/clientlist">Continue as Guest</Link> */}

      </div>
      </div>
  );
};

export default AdminLoginPage;