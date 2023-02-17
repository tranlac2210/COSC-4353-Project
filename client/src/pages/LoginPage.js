import React, { useState } from "react";
import {Link, useHistory} from 'react-router-dom';
// import './LoginPage.css';
import ClientPage from './ClientPage';
import styled from "styled-components";

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
   
          
          
          
         
       
    
    <Wrapper>
      
      <div className="wholeloginpage"> <AppProvider></AppProvider>
      <form className="login_form" onSubmit={handleSubmit}>
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
        <Link className="demo" to="/ClientPage">Continue as Guest</Link>

      </form>
      </div>
    </Wrapper>
    
  );
};

const Wrapper = styled.div`
.wholeloginpage{
  background-color: #111;
  height: 100vh;
  display:flex;
  justify-content: center;
  align-items: center;
}
.error-label{
  color:red;
}
  .login_h4{
    background-image: linear-gradient(to right, #ff8177 0%, #ff867a 0%, #ff8c7f 21%, #f99185 52%, #cf556c 78%, #b12a5b 100%); 
    margin-top:20px;
  }

  .signup_now {
    
    padding: 5px;
    text-decoration: none;
    color: inherit;
    margin-top:20px;
    color: purple;
    cursor: pointer;
    }

    .signup_now:hover {
      color: #3e8e41;
    }
  .login_form {
    background-image: linear-gradient(to right, #ff8177 0%, #ff867a 0%, #ff8c7f 21%, #f99185 52%, #cf556c 78%, #b12a5b 100%); 
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #f2f2f2;
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    width: 30%;
    margin: auto;
  }
  
  h1 {
    text-align: center;
    margin-top: 10px;
    margin-bottom: 30px;
  } 


  .login_form h3 {
    font-size: 30px;
    margin-bottom: 30px;
  }

  .login_username,.login_pass {
    font-size: 20px;
    margin-bottom: 10px;
    margin-right: 20px;
  }
  
  .login_input {
    width: 300px;
    height: 40px;
    padding: 10px;
    margin-bottom: 20px;
    border-radius: 10px;
    border: none;
    font-size: 16px;
  }
  
  .login_button {
    margin-bottom:10px;
    margin-top: 20px;
    width: 300px;
    height: 40px;
    padding: 10px;
    border-radius: 30px;
    border: none;
    font-size: 16px;
    background-color: #4CAF50;
    color: white;
    cursor: pointer;
  }

  .demo{
    margin-top: 20px;

    padding: 10px;
    border-radius: 20px;
    border: none;
    font-size: 16px;
    background-color: #4CAF50;
    color: white;
    cursor: pointer;
  }
  .demo:hover {
    background-color: #3e8e41;
  }
  
  .login_button:hover,.signup_link:hover{
    background-color: #3e8e41;
  }
`;

export default LoginPage;