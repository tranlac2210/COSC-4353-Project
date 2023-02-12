import React, { useState } from 'react';
import styled from "styled-components";
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';


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
    <Wrapper>
        <h2></h2>
    <form className='change_pass_form' onSubmit={handleSubmit}>
      <h2>Change Password</h2>
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
   
    </Wrapper>
  );
};

const Wrapper = styled.div`


.select_box{
    margin-bottom: 20px;
  }

  .success-label{
    color:green;
  }

  .error-label{
    color:red;
  }

  .profileh1{
    text-align: center;
    margin-bottom: 15px;
  }
  .change_pass_form {
    
    background: linear-gradient(to right, #fa709a 0%, #fee140 100%);
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #f2f2f2;
    padding: 30px;
    border-radius: 20px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    width: 30%;
    margin: auto;
  }
  
  h2 {
    text-align: center;
    margin-top: 10px;
    margin-bottom: 30px;
  } 


  .login_form h2 {
    font-size: 40px;
    margin-bottom: 30px;
  }

  .change_pass_label,.login_pass {
    font-size: 24px;
    margin-bottom: 10px;
    margin-right: 20px;
  }
  
  .change_pass_input {
    width: 300px;
    height: 40px;
    padding: 10px;
    margin-bottom: 20px;
    border-radius: 25px;
    border: none;
    font-size: 16px;
  }
  
  .change_pass_button {
    margin-top: 20px;
    width: 300px;
    height: 40px;
    padding: 10px;
    border-radius: 25px;
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
  
  .change_pass_button:hover {
    background-color: #3e8e41;
  }


`;

export default ChangePassPage;
