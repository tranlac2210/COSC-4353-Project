import React from 'react';
import PropTypes from 'prop-types';
import './WelcomeGuest.css';

WelcomeGuest.propTypes = {
    
};

function WelcomeGuest(props) {
    return (
        <div className='container'>
            <button>Sign up</button>
            <button>Log in</button>
        </div>
    );
}

export default WelcomeGuest;