import React from 'react';
import { BrowserRouter as Router, Route,Routes , Link } from 'react-router-dom';
import styled from "styled-components";
import { NavBar } from '../components'

function HomePage() {
  return (
    <>
      <NavBar/>
      <Wrapper>
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
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`

`;

export default HomePage;