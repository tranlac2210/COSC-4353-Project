import React from 'react';
import { BrowserRouter as Router, Route,Routes , Link } from 'react-router-dom';
import { LoginPage } from './pages';
import { HomePage } from './pages';
import { SignUpPage } from './pages';
import { ClientPage } from './pages';
import { ClientProfilePage } from './pages';
import { FuelQuoteForm } from './pages';
import { ChangePassPage } from './pages';
import { AdminLoginPage } from './pages';

import './App.css';
import ClientList from './admins/pages/ClientList';
import ClientEdit from './admins/pages/ClientEdit';

function App() {
  return (
    <>
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<HomePage/>} />
            {/* <Route path="/LoginPage" element={<LoginPage/>} /> */}
            <Route path="/SignUpPage" element={<SignUpPage/>} />
            <Route path="/ClientPage" element={<ClientPage/>} />
            <Route path="/ClientProfilePage" element={<ClientProfilePage/>} />

            <Route path="/FuelQuoteForm" element={<FuelQuoteForm/>} />


            <Route path="/admin/ClientList" element={<ClientList/>}></Route>
            <Route path="/admin/ClientList/edit" element={<ClientEdit/>}></Route>
            <Route path="/ChangePassPage" element={<ChangePassPage/>} />
            <Route path="/AdminLoginPage" element={<AdminLoginPage/>} />


          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
