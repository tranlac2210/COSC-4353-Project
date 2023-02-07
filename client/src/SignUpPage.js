import React, { useState } from 'react';
import './SignUpPage.css';


function SignUpPage() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }
    // Perform sign up action, for example by calling an API
    console.log(`Signing up with email: ${email} and password: ${password}`);
  };

  return (
    <form className='signup_form' onSubmit={handleSubmit}>
      <h2>Sign Up</h2>
      <div>
        <label className='signup_label_email' htmlFor="email">Email:</label>
        <input className='signup_input'
          type="email"
          id="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
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
  );
};

export default SignUpPage;
