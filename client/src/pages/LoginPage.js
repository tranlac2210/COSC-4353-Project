import React, { useState } from "react";
import {Link, useHistory} from 'react-router-dom';
// import './LoginPage.css';
import ClientPage from './ClientPage';
import styled from "styled-components";

function LoginPage(){

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = event => {
    event.preventDefault();
    console.log("Username: ", username);
    console.log("Password: ", password);
  };

  return (
    <Wrapper>
      <div><h1>Welcome to the Login Page</h1>
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
        <Link className="demo" to="/ClientPage">Demo</Link>

      </form>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .login_form {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #f2f2f2;
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    width: 50%;
    margin: auto;
  }
  
  h1 {
    text-align: center;
    margin-top: 10px;
    margin-bottom: 30px;
  } 


  .login_form h2 {
    font-size: 40px;
    margin-bottom: 30px;
  }

  .login_username,.login_pass {
    font-size: 24px;
    margin-bottom: 10px;
    margin-right: 20px;
  }
  
  .login_input {
    width: 300px;
    height: 40px;
    padding: 10px;
    margin-bottom: 20px;
    border-radius: 5px;
    border: none;
    font-size: 16px;
  }
  
  .login_button {
    margin-top: 20px;
    width: 300px;
    height: 40px;
    padding: 10px;
    border-radius: 5px;
    border: none;
    font-size: 16px;
    background-color: #4CAF50;
    color: white;
    cursor: pointer;
  }

  .demo{
    margin-top: 20px;

    padding: 10px;
    border-radius: 5px;
    border: none;
    font-size: 16px;
    background-color: #4CAF50;
    color: white;
    cursor: pointer;
  }
  .demo:hover {
    background-color: #3e8e41;
  }
  
  .login_button:hover {
    background-color: #3e8e41;
  }
`;

export default LoginPage;