import React, { useState } from 'react';
import "../styles/ChangePassPage.css"

function ChangePassPage() 
{
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showSuccessLabel, setShowSuccessLabel] = useState(false);
  const [SuccessLabel, setSuccessLabel] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

      if (password !== confirmPassword) {
      setShowSuccessLabel(false);
      
      setSuccessLabel("New password and confirm password not match!!!");
      setPassword('');
      setConfirmPassword('');
      
      return;
    }
    if (password == confirmPassword) {
        
        setSuccessLabel(false);
        setShowSuccessLabel(true);
        setShowSuccessLabel("Password changed successfully");
        setPassword('');
        setConfirmPassword('');
        
        return;
      }
  };

  return (
    <>
    <h2 className='empty'></h2>
    <form className='change_pass_form' onSubmit={handleSubmit}>
      <h2 className='change_h2'>Change Password</h2>
      <div>
        <label className='change_pass_label' htmlFor="password">New Password:</label>
        <input className='change_pass_input'
          type="password"
          id="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />
      </div>
      <div>
        <label className='change_pass_label' htmlFor="confirmPassword">Confirm New Password:</label>
        <input className='change_pass_input'
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
          required
        />
      </div>
      {showSuccessLabel && (
        <label className="success-label">{showSuccessLabel}</label>
      )}
      {SuccessLabel && (
        <label className="error-label">{SuccessLabel}</label>
      )}
      <button className='change_pass_button' type="submit">Change Password</button>
    </form>
    </>
  );
};

export default ChangePassPage;
