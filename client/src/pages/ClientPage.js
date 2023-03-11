import React from 'react';
import {Link, useHistory,useLocation, useNavigate } from 'react-router-dom';
import '../styles/ClientPage.css'
import "bootstrap/dist/css/bootstrap.min.css"

function ClientPage() {
  const location = useLocation();
  const id = new URLSearchParams(location.search).get('id');
  const navigate = useNavigate();

  const handleClick = (toLink) => {
    navigate(`/${toLink}`)
  }
  return (
    <>
    <div className='div_clientpage'>
      {/* <h2 className='c_h2'>Welcome, {username}!</h2> */}
      <p className='welcome'>Welcome back</p>
      <div className='headClientPage'></div>
      {/* <p className='c_p'>Here you can access your account information, Create Fuel Quote Form, and manage your personal information.</p> */}
      
      <div className='outside'>
        <div className='container' style={{backgroundColor: "#ff8177"}} onClick={() => handleClick(`ClientProfilePage?id=${id}`)}>
          <p>Manage Personal Information</p>
        </div>

        <div className='container' style={{backgroundColor: "#cf556c"}} onClick={() => handleClick("FuelQuoteForm")}>
          <p>Fuel Quote Form</p>
        </div>

        <div className='container' style={{backgroundColor: "#a00533"}} onClick={() => handleClick("ChangePassPage")}>
          <p>Change Password</p>
        </div>
      </div>
      
    </div>
    </>   
  );
}

export default ClientPage;
