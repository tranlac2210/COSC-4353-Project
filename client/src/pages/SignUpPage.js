import React, { useState } from 'react';
import {Link, useHistory} from 'react-router-dom';
// import './SignUpPage.css';
import styled from "styled-components";

function SignUpPage() {

  const [username, setusername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showLabel, setshowLabel] = useState(false);
  const [backlogin, setbacklogin] = useState(true);
  const [begin, setbegin] = useState(true);
  const handleSubmit = (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords don't match");
      setshowLabel(true);
      setshowLabel('Password and Confirm Password not match!!! ');
      setusername('');
      setPassword('');
      setConfirmPassword('');
      
      return;
    }
    setshowLabel(false);
    alert("Account successfully created!");
    setbegin(false)
    setusername(false);
    setPassword(false);
    setConfirmPassword(false);
    // Perform sign up action, for example by calling an API
    console.log(`Signing up with username: ${username} and password: ${password}`);
    setbacklogin(false);
  };

  return (
    <Wrapper>
      {backlogin ? (
      <div>
        
        <h1 className='signup_h1'>Welcome to Sign up Page</h1>
      <form className='signup_form' onSubmit={handleSubmit}>
        {begin}
        <h2>Sign Up</h2>
        <div>
          <label className='signup_label_username' htmlFor="username">Username</label>
          <input className='signup_input'
            type="username"
            id="username"
            value={username}
            onChange={(event) => setusername(event.target.value)}
            required
          />
        </div>
        <div>
          <label className='signup_label_pass' htmlFor="password">Password</label>
          <input className='signup_input'
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </div>
        <div>
          <label className='signup_label_conpass' htmlFor="confirmPassword">Confirm Password</label>
          <input className='signup_input'
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            required
          />
        </div>
        {showLabel && (
        <label className="show-label">{showLabel}</label>
      )}
        <button className='signup_button' type="submit">CREATE ACCOUNT</button>
       
        <div className="already-have-account">
        Already have an account? 
        <a className="signup_link" href="/LoginPage"> Sign In</a>
      </div> 
      </form>
      </div>
      ) :(
        <div><h1 className='empty'> </h1><form className='con_signup_form' onSubmit={handleSubmit}><label className='backlogin'><h1 className='backlogin_h1'>Congraturation!</h1> You have successfully created a new account .Click <a className="signup_link" href="/LoginPage"> Sign In</a> to get back to log in page</label></form></div>
        )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
 .empty{
  margin-top:40px;
 }
.show-label{
  color:red;
  margin-bottom:10px;
}
  .already-have-account {
    text-align: center;
    margin-top: 1rem;
    font-size: 0.9rem;
  }
  .signup_h1,.backlogin_h1{
    text-align:center;
    margin-bottom:10px;
  }
  .con_signup_form{
    font-size: 20px;
    background: linear-gradient(to right, #fa709a 0%, #fee140 100%);
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #f2f2f2;
    padding: 200px;
    border-radius: 15px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    width: 40%;
    margin: auto;
  }

  .signup_form {
    background: linear-gradient(to right, #fa709a 0%, #fee140 100%);
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #f2f2f2;
    padding: 20px;
    border-radius: 15px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    width: 30%;
    margin: auto;
  }
  
  .signup_form h2 {
    margin-bottom: 30px;
  }
  
  .signup_label_username,.signup_label_pass,.signup_label_conpass {
    display: flex;
    margin-top: 10px;
    margin-bottom: 5px;
    align-items: center;
  }
  
  .signup_input {
    width: auto;
    padding: 10px;
    border-radius: 10px;
    border: none;
    margin-bottom: 20px;
  }
  
  .signup_button {
    background-color: #4CAF50;
    color: white;
    padding: 10px 20px;
    border-radius: 30px;
    border: none;
    cursor: pointer;
  }
  
  .signup_button:hover {
    background-color: #3e8e41;
  }
`; 

export default SignUpPage;
