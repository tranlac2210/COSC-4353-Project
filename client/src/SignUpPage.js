import React, { useState } from 'react';
import './SignUpPage.css';


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
  );
};

export default SignUpPage;
