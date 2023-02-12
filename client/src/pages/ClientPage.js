import React from 'react';
import {Link, useHistory} from 'react-router-dom';




function ClientPage() {
  return (
    <div>
      
      <h2>Welcome, Client!</h2>
      <p>Here you can access your account information, view your recent transactions, and manage your personal information.</p>
      <ul>
        <li><a href="#">View Account Information</a></li>
        <li><a href="#">View Recent Transactions</a></li>
        <li><Link to="/ChangePassPage">Change Password</Link></li>
        <li><Link to="/ClientProfilePage">Manage Personal Information</Link></li>
        
      </ul>
    </div>
  );
}

<style>

</style>

export default ClientPage;
