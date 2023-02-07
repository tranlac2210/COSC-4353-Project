import React from 'react';
import { BrowserRouter as Router, Route,Routes , Link } from 'react-router-dom';
import LoginPage from "./LoginPage";
import HomePage from "./HomePage";
import SignUpPage from "./SignUpPage";
import ClientPage from './ClientPage';
import ClientProfilePage from './ClientProfilePage';
import './App.css';

function App() {
  return (
    <Router>
        <div>
      
      <Routes>
      <Route path="/LoginPage" element={<LoginPage/>} />
      
      <Route path="/" element={<HomePage/>} />
      <Route path="/SignUpPage" element={<SignUpPage/>} />
      <Route path="/ClientPage" element={<ClientPage/>} />
      <Route path="/ClientProfilePage" element={<ClientProfilePage/>} />
      </Routes>
      
      </div>
    </Router>
  );
}

export default App;
