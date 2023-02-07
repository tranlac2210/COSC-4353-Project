import React from 'react';
import { BrowserRouter as Router, Route,Routes , Link } from 'react-router-dom';
import LoginPage from "./LoginPage";
import HomePage from "./HomePage";
import './App.css';

function App() {
  return (
    <Router>
        <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/LoginPage">Login</Link>
          </li>
          <li>
            <Link to="/SignUpPage">Sign Up</Link>
          </li>
        </ul>
      </nav>
      <Routes>
      <Route path="/LoginPage" element={<LoginPage/>} />
      
      <Route path="/" element={<HomePage/>} />
      </Routes>
      
      </div>
    </Router>
  );
}

export default App;
