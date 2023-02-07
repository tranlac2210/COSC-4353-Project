import React, { useState } from "react";
import {Link, useHistory} from 'react-router-dom';
import './LoginPage.css';

function LoginPage(){

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = event => {
    event.preventDefault();
    console.log("Username: ", username);
    console.log("Password: ", password);
  };

  return (
    <form className="login_form" onSubmit={handleSubmit}>
      <h2>Log in</h2>
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
      <button className="login_button" type="submit">Submit</button>
    </form>
  );
};

export default LoginPage;