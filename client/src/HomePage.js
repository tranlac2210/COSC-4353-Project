import React from 'react';
import { BrowserRouter as Router, Route,Routes , Link } from 'react-router-dom';

function HomePage() {
  return (
    <div>
      <h1>Welcome to the Home Page</h1>
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
      
    </div>
  );
}

export default HomePage;