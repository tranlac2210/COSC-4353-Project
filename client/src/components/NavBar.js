import React, { useEffect, useState } from 'react';
import logo from '../image/logo.svg';
import { FaBars } from 'react-icons/fa';
import { useGlobalContext } from './context';
import "bootstrap/dist/css/bootstrap.min.css"
import '../styles/navbar.css'
import { BrowserRouter as Router, Route,Routes , Link } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';

const Navbar = () => {
  const [openModal, setOpenModal] = useState(false);
  const { openSidebar, openSubmenu, closeSubmenu } = useGlobalContext();

  const displaySubmenu = (e) => {
    const page = e.target.textContent;
    const tempBtn = e.target.getBoundingClientRect();
    const center = (tempBtn.left + tempBtn.right) / 2;
    const bottom = tempBtn.bottom - 3;
    openSubmenu(page, { center, bottom });
  };
  const handleSubmenu = (e) => {
    if (!e.target.classList.contains('link-btn')) {
      closeSubmenu();
    }
  };

  useEffect(() => {
    if (openModal) {
        document.body.style.overflow = 'hidden';
    }
    else {
        document.body.style.overflow = 'unset';
    }
  }, [openModal])

  return (
    <>
    <nav className='nav' onMouseOver={handleSubmenu}>
      <div className='nav-center'>
        <div className='nav-header'>
          <img src={logo} className='nav-logo' alt='' />
          <button className='btn toggle-btn' onClick={openSidebar}>
            <FaBars />
          </button>
        </div>
        <ul className='nav-links'>
          {/* <li>
            <button className='link-btn' onMouseOver={displaySubmenu}>
              products
            </button>
          </li> */}
          <li>
            <button className='link-btn' onMouseOver={displaySubmenu}>
              developers
            </button>
          </li>
          <li>
            <button className='link-btn' onMouseOver={displaySubmenu}>
              about
            </button>
          </li>
        </ul>
        <button className='btn btn-dark signin-btn' onClick={() => setOpenModal(!openModal)}>Sign in</button>
      </div>
      </nav>
      {openModal && <LoginPage onBack={() => setOpenModal(!openModal)} onClose={() => setOpenModal(!openModal)}/>}

    </>
    
  );
};

export default Navbar;
