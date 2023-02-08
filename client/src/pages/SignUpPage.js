import React, { useState } from 'react';
// import './SignUpPage.css';
import styled from "styled-components";

function SignUpPage() {

  const [username, setusername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }
    // Perform sign up action, for example by calling an API
    console.log(`Signing up with username: ${username} and password: ${password}`);
  };

  return (
    <Wrapper>
      <div>
        <h1>Welcome to Sign up Page</h1>
      <form className='signup_form' onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
        <div>
          <label className='signup_label_username' htmlFor="username">username:</label>
          <input className='signup_input'
            type="username"
            id="username"
            value={username}
            onChange={(event) => setusername(event.target.value)}
            required
          />
        </div>
        <div>
          <label className='signup_label_pass' htmlFor="password">Password:</label>
          <input className='signup_input'
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </div>
        <div>
          <label className='signup_label_conpass' htmlFor="confirmPassword">Confirm Password:</label>
          <input className='signup_input'
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            required
          />
        </div>
        <button className='signup_button' type="submit">Sign Up</button>
      </form>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .signup_form {
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
    width: 100%;
    padding: 10px;
    border-radius: 5px;
    border: none;
    margin-bottom: 20px;
  }
  
  .signup_button {
    background-color: #4CAF50;
    color: white;
    padding: 10px 20px;
    border-radius: 5px;
    border: none;
    cursor: pointer;
  }
  
  .signup_button:hover {
    background-color: #3e8e41;
  }
`; 

export default SignUpPage;
