import React, { useState } from 'react';
import {Link, useHistory} from 'react-router-dom';
import "../styles/SignUpPage.css";

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
    <>
      {backlogin ? (
      <div className='whole_signup'>
        
        <h1 className='signup_h1'></h1>
      <form className='signup_form' onSubmit={handleSubmit}>
      <a className="loginbb" href="/" id="bottle" onclick="document.location=this.id+'.html';return false;">
        <img src="https://cdn.discordapp.com/attachments/722016314679361559/1078414402761527417/image_3.png" alt="bottle"/>
        </a>
        {begin}
        <div className="signup-background">
        <img src="https://cdn.discordapp.com/attachments/722016314679361559/1076179438733107290/Untitled-PfTme9ZCQ-transformed.jpeg" alt="Login Image"/>
      </div>
        <div className='in_signup'>
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
      </div>
      </form>
      </div>
      ) :(
        <div><h1 className='empty'> </h1><form className='con_signup_form' onSubmit={handleSubmit}><label className='backlogin'><h1 className='backlogin_h1'>Congraturation!</h1> You have successfully created a new account .Click <a className="signup_link" href="/LoginPage"> Sign In</a> to get back to log in page</label></form></div>
        )}
    </>
  );
};

export default SignUpPage;
