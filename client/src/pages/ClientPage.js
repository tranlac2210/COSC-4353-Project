import React from 'react';
import {Link, useHistory} from 'react-router-dom';
import styled from 'styled-components';




function ClientPage() {
  return (
    <Wrapper>
    <div className='div_clientpage'>
      
      <h2>Welcome, Client!</h2>
      <p>Here you can access your account information, view your recent transactions, and manage your personal information.</p>
      <ul>
      <li><Link to="/ClientProfilePage">Manage Personal Information</Link></li>
        <li><a href="#">View Recent Transactions</a></li>
        <li><Link to="/ChangePassPage">Change Password</Link></li>
        
        
      </ul>
    </div>
    </Wrapper>   
  );
}
const Wrapper = styled.div`

.div_clientpage{
  background: linear-gradient(to right, #fa709a 0%, #fee140 100%);
  height: 100vh;
}
`;

export default ClientPage;
