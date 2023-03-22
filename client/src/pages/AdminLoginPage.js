import React, { useState } from "react";
import {Link, useNavigate} from 'react-router-dom';
import '../styles/AdminLoginPage.css';
import "bootstrap/dist/css/bootstrap.min.css"
import axios from 'axios';
import Cookies from "js-cookie";
import { createAPIEndpoint, ENDPOINTS } from "../API";


function AdminLoginPage(){

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [ErrorLabel, setErrorLabel] = useState(false);
  const navigate  = useNavigate ();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      //Send a POST request to the login API endpoint
      // const response = await axios.post('http://localhost:9000/api/auth/adminLogIn', {
      //   userName: username,
      //   password: password        
      // });

      const response = await createAPIEndpoint(ENDPOINTS.AdminSignIn).post({
        userName: username,
        password: password        
      });
      // alert(`${response.status},${password}`)
      if (response.status!==200) {
        // If the response is not OK, throw an error
        throw new Error('Incorrect Password or Username!!!!');
      }
  
      // If the response is OK, redirect to the client page
      console.log(response)
      Cookies.set("role", "Admin");
      navigate('/admin/ClientList');
      // navigate('/admin/clientlist?username='+ username);
    } 
     catch (error) {
      // If there's an error, set the error label
      // setErrorLabel('Incorrect Password or Username !!');
      setErrorLabel(`${error.response.data.error}`);
    }
    // alert('Incorrect Password or Username!!');
    // setErrorLabel(true);
    // setErrorLabel('Incorrect Password or Username!!');
  };

  return (
      <div className="container-adminLoginPage">
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
            required
          />
        </div>
        <div>
          <label className="login_pass" htmlFor="password">Password:</label>
          <input className="login_input"
            type="password"
            id="password"
            value={password}
            onChange={event => setPassword(event.target.value)}
            required
          />
        </div>
        {ErrorLabel && (<label className="error-label"> {ErrorLabel}</label>)}

        <button className="btn btn-success btn-ho" onClick={handleSubmit}>Submit</button>
        </div>
      </div>
      </div>
  );
};

export default AdminLoginPage;