import React from 'react';
import {Link, useHistory,useLocation } from 'react-router-dom';
import '../styles/ClientPage.css'

function ClientPage() {
  const location = useLocation();
  const username = new URLSearchParams(location.search).get('username');

  return (
    <>
    <div className='div_clientpage'>

      
      <h2 className='c_h2'>Welcome, {username}!</h2>
      <p className='c_p'>Here you can access your account information, Create Fuel Quote Form, and manage your personal information.</p>
      <ul className='linklist'>
      <li><Link to={`/ClientProfilePage?username=${username}`} style={{ color: 'white' }}>Manage Personal Information</Link></li>
        <li><Link to="/FuelQuoteForm" style={{ color: 'white' }}>Fuel Quote Form</Link></li>
        <li><Link to="/ChangePassPage" style={{ color: 'white' }}>Change Password</Link></li>
        
        
      </ul>
    </div>
    </>   
  );
}

export default ClientPage;
