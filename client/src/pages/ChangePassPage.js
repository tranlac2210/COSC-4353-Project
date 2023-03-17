import React, { useState,useEffect } from 'react';
import { useLocation ,useNavigate} from "react-router-dom";
import "../styles/ChangePassPage.css";
import Cookies from "js-cookie";
import axios from "axios";
import logo from "../image/logo.svg";

function ChangePassPage() 
{
  const location = useLocation();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showSuccessLabel, setShowSuccessLabel] = useState(false);
  const [SuccessLabel, setSuccessLabel] = useState(false);

  const id = new URLSearchParams(location.search).get("id");
  const navigate = useNavigate();

  const handleClick = (toLink) => {
    navigate(`/${toLink}`);
  };

  const handleClickLogOut = (e) => {
    Cookies.remove('role');
    Cookies.remove('accessToken');
    e.preventDefault();
    navigate('/')
  }

  const handleClickLogo = (e) => {
    e.preventDefault();
    navigate('/ClientPage')
  }

  useEffect(() => {
    async function fetchData() {
      let accessToken = Cookies.get("accessToken");
      let webApiUrl = "http://localhost:9000/api/user/authGetUsers";
      const res = await axios.get(webApiUrl, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      setPassword(res.data.password);     
    }
    fetchData();
  }, []);


  const handleSubmit = async (event) => {
    event.preventDefault();

      if (password !== confirmPassword) {
      setShowSuccessLabel(false);
      
      setSuccessLabel("New password and confirm password not match!!!");
      setPassword('');
      setConfirmPassword('');
      
      return;
    }
    if (password == confirmPassword) {
      try {
        let accessToken = Cookies.get("accessToken");
        let webApiUrl = "http://localhost:9000/api/user/passwordChange";
        const jsonBody = {
          password: password
       
        };
        const res = await axios.post(webApiUrl, jsonBody, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "content-type": "application/json",
          },
        });
  
        // const res = await createAPIEndpoint(ENDPOINTS.UserInfoChange).put(id, {
        //   // userName: username,
        //   FullName: fullName,
        //   Address1: address1,
        //   Address2: address2,
        //   city: city,
        //   State: state,
        //   Zipcode: zipcode,
        // });
  
        alert("Your changes have been successfully saved!");
        setSuccessLabel(false);
        setShowSuccessLabel(true);
        setShowSuccessLabel("Password changed successfully");
        setPassword('');
        setConfirmPassword('');
        console.log(res.data.success);
        return;
  
        
      } catch (error) {
        console.error(error);
      }
    };
        
      }
 

  return (
    <>
    <nav className="navbar nav-pad navbar-light bg-light">
        <a className="navbar-brand" href="/ClientPage" onClick={handleClickLogo}> 
          <img
            src={logo}
            width="40"
            height="40"
            className="d-inline-block align-top"
            alt=""
          ></img>
        </a>
        <a className="nav-item nav-link click bg-dark text-white" href="#" onClick={handleClickLogOut}>
          Log Out
        </a>
      </nav>
    <h2 className='empty'></h2>
    
    <form className='change_pass_form' onSubmit={handleSubmit}>    
    
    <div className="cp_headSignUp"></div>
    
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
      <h2 className='empty'></h2>
    </form>
    </>
  );
};

export default ChangePassPage;
