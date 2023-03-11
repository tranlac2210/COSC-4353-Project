import React, { useState } from "react";
import {Link, useNavigate} from 'react-router-dom';
import '../styles/AdminLoginPage.css';
import "bootstrap/dist/css/bootstrap.min.css"
import axios from 'axios';


function AdminLoginPage(){

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [ErrorLabel, setErrorLabel] = useState(false);
  const navigate  = useNavigate ();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Send a POST request to the login API endpoint
      const response = await axios.post('http://localhost:9000/admin/signin', {
        userName: username,
        password: password        
      });
      console.log(response.data);
      // alert(`${response.status},${password}`)
      if (response.status!==200) {
        // If the response is not OK, throw an error
        throw new Error('Incorrect Password or Username!!!!');
      }
  
      // If the response is OK, redirect to the client page
      navigate('/admin/clientlist?username='+ username);
    } 
     catch (error) {
      // If there's an error, set the error label
      setErrorLabel('Incorrect Password or Username !!');
    }
    // alert('Incorrect Password or Username!!');
    setErrorLabel(true);
    // setErrorLabel('Incorrect Password or Username!!');
    console.log("Username: ", username);
    console.log("Password: ", password);
    
  };

  return (
      <div className="container">
      <div className="ad_login_form">
        <div className="headAdmin"></div>
        <h3>Staff Log in</h3>
        <div className="content">
        <div>
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

        <button className="btn btn-success btn-ho" onClick={handleSubmit}>Submit</button>
        </div>
        
        
        {/* <div className="already-have-account">
        Not a member? 
        <a className="signup_now" href="/SignupPage">Create New Account</a>
      </div> */}
        {/* <Link className="demo" to="/admin/clientlist">Continue as Guest</Link> */}

      </div>
      </div>
  );
};

export default AdminLoginPage;