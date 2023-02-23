import React, { useState } from "react";
import {Link, useHistory} from 'react-router-dom';
import '../styles/AdminLoginPage.css';

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
      <div><h1>Welcome to the Login Page</h1>
      <form className="ad_login_form" onSubmit={handleSubmit}>
        <h3>Log in</h3>
        <div  >
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
        <Link className="demo" to="/admin/clientlist">Continue as Guest</Link>

      </form>
      </div>
  );
};

export default AdminLoginPage;