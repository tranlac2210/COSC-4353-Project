import React from 'react';
import {Link, useHistory} from 'react-router-dom';
import '../styles/ClientPage.css'

function ClientPage() {
  return (
    <>
    <div className='div_clientpage'>

      
      <h2 className='c_h2'>Welcome, Client!</h2>
      <p className='c_p'>Here you can access your account information, Create Fuel Quote Form, and manage your personal information.</p>
      <ul className='linklist'>
      <li><Link to="/ClientProfilePage" style={{ color: 'white' }}>Manage Personal Information</Link></li>
        <li><Link to="/FuelQuoteForm" style={{ color: 'white' }}>Fuel Quote Form</Link></li>
        <li><Link to="/ChangePassPage" style={{ color: 'white' }}>Change Password</Link></li>
        
        
      </ul>
    </div>
    </>   
  );
}

export default ClientPage;
