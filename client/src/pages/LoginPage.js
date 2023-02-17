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
    </Wrapper>
    
  );
};

const Wrapper = styled.div`
h3{
  text-align: center;
  margin-top:50px;
}
.wholeloginpage login-background {
  color: rgba(255, 255, 255, 1);
  background-size: cover;
  width: 50%;
  height: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1px;
  margin: auto;
  
}

.wholeloginpage{
  
  // background-image: linear-gradient(to top, #ffffff, #ffffff, #ff8177, #ff8177);
  // background-color:white;
 background:url('https://cdn.discordapp.com/attachments/722016314679361559/1076156890700062750/bg_1.jpg')no-repeat center center fixed;
 background-size: cover;
  height: 100vh;
  margin:auto;
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
    
    display:flex;
    // background-image: linear-gradient(to bottom, #ffffff,#ffffff,#ffffff,#ffffff, #ffe7e6 ,#ff8177, #ff8177);
    background-image: linear-gradient(to bottom, #ffffff 53%, #ff8177 48%);
      justify-content: center;    
      flex-direction: column;
      align-items: center;
      border-radius:20px;
      padding: 10px;
          
      width: 50%;
      margin:auto;
      
      
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