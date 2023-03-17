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
import AdminPage from './admins/pages/AdminPage';
import {AdminElement, UserElement} from './role-based/RoleElement';
import NoAccess from './role-based/NoAccess';

function App() {
  return (
    <>
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<HomePage/>} />
            <Route path="/noaccess" element={<NoAccess/>}/>
            /* -------------CLIENT------------- */
            <Route path="/ClientPage" element={<UserElement><ClientPage/></UserElement>} />
            <Route path="/ClientProfilePage" element={<UserElement><ClientProfilePage/></UserElement>} />
            <Route path="/FuelQuoteForm" element={<UserElement><FuelQuoteForm/></UserElement>} />

            /* -------------ADMIN------------- */
            <Route path='/admin/ClientList' element={<AdminElement><ClientList/></AdminElement>}></Route>
            {/* <Route path="/admin/ClientList" element={<ClientList/>}></Route> */}
            <Route path="/admin/ClientList/edit" element={<AdminElement><ClientEdit/></AdminElement>}></Route>
            <Route path="/ChangePassPage" element={<AdminElement><ChangePassPage/></AdminElement>} />
            <Route path="/AdminLoginPage" element={<AdminLoginPage/>} />
            <Route path='/admin/AdminPage' element={<AdminElement><AdminPage/></AdminElement>}/>


          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
