import React from 'react';
import PropTypes from 'prop-types';
// import './WelcomeGuest.css';
import styled from "styled-components";

NavBar.propTypes = {
    
};

function NavBar(props) {
  return (
    <Wrapper>
      <div className='container'>
        <h1>Group 9 Project</h1>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  .container {
      display: flex;
      width: 100%;
      height: 100%;
      align-items: center;
      justify-content: center;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: red;
  }
`;

export default NavBar;
