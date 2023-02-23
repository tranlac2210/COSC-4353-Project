import React from 'react';
import {Link, useHistory} from 'react-router-dom';
import '../styles/ClientPage.css'

function ClientPage() {
  return (
    <>
    <div className='div_clientpage'>

      
      <h2>Welcome, Client!</h2>
      <p>Here you can access your account information, view your recent transactions, and manage your personal information.</p>
      <ul>
      <li><Link to="/ClientProfilePage">Manage Personal Information</Link></li>
        <li><a href="#">View Recent Transactions</a></li>
        <li><Link to="/ChangePassPage">Change Password</Link></li>
        
        
      </ul>
    </div>
    </>   
  );
}

export default ClientPage;
