import React from 'react';
import {Link, useHistory,useLocation, useNavigate } from 'react-router-dom';
import './AdminPage.css'
import "bootstrap/dist/css/bootstrap.min.css"

function AdminPage() {
  const location = useLocation();
  const id = new URLSearchParams(location.search).get('id');
  const navigate = useNavigate();

  const handleClick = (toLink) => {
    navigate(`/${toLink}`)
  }
  return (
    <>
    <div className='div_clientpage'>
      <p className='welcome'>Welcome back</p>
      <div className='headClientPage'></div>
      
      <div className='outside'>
        <div className='container' style={{backgroundColor: "#ff8177"}} onClick={() => handleClick(`admin/ClientList`)}>
          <p>Manage Clients</p>
        </div>

        <div className='container' style={{backgroundColor: "#cf556c"}} onClick={() => handleClick("FuelQuoteForm")}>
          <p>Manage Orders</p>
        </div>

        <div className='container' style={{backgroundColor: "#a00533"}} onClick={() => handleClick("ChangePassPage")}>
          <p>Change Password</p>
        </div>
      </div>
      
    </div>
    </>   
  );
}

export default AdminPage;
