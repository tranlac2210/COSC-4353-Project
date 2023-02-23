import React from 'react';
import { BrowserRouter as Router, Route,Routes , Link } from 'react-router-dom';
import { Navbar } from '../components'
import { Background } from '../components'
import { Sidebar } from '../components'
import { Submenu } from '../components'
import { AppProvider } from '../components';

function HomePage() {
  return (
    <>
       <AppProvider>
          <Navbar/>
          <Background/>
          <Sidebar/>
          <Submenu/>
        </AppProvider>
      
      
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
            <li>
              <Link to="/FuelQuoteForm">FuelQuoteFormTest</Link>
            </li>
          </ul>
        </nav>
        </div>
      
    </>
  );
}

export default HomePage;