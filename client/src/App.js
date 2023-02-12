import React from 'react';
import { BrowserRouter as Router, Route,Routes , Link } from 'react-router-dom';
import { LoginPage } from './pages';
import { HomePage } from './pages';
import { SignUpPage } from './pages';
import { ClientPage } from './pages';
import { ClientProfilePage } from './pages';
import { ChangePassPage } from './pages';

import './App.css';

function App() {
  return (
    <>
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<HomePage/>} />
            <Route path="/LoginPage" element={<LoginPage/>} />
            <Route path="/SignUpPage" element={<SignUpPage/>} />
            <Route path="/ClientPage" element={<ClientPage/>} />
            <Route path="/ClientProfilePage" element={<ClientProfilePage/>} />
            <Route path="/ChangePassPage" element={<ChangePassPage/>} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
