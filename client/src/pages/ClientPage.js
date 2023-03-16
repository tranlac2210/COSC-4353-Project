import React from "react";
import { Link, useHistory, useLocation, useNavigate } from "react-router-dom";
import "../styles/ClientPage.css";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../image/logo.svg";
import Cookies from "js-cookie"

function ClientPage() {
  const location = useLocation();
  const id = new URLSearchParams(location.search).get("id");
  const navigate = useNavigate();

  const handleClick = (toLink) => {
    navigate(`/${toLink}`);
  };

  const handleClickLogOut = (e) => {
    e.preventDefault();
    navigate('/')
  }

  const handleClickLogo = (e) => {
    e.preventDefault();
  }

  return (
    <>
      <nav className="navbar nav-pad navbar-light bg-light">
        <a className="navbar-brand" href="#" onClick={handleClickLogo}> 
          <img
            src={logo}
            width="40"
            height="40"
            className="d-inline-block align-top"
            alt=""
          ></img>
        </a>
        <a className="nav-item nav-link click" href="#" onClick={handleClickLogOut}>
          Log Out
        </a>
      </nav>
      <div className="div_clientpage">
        {/* <h2 className='c_h2'>Welcome, {username}!</h2> */}
        <p className="welcome">Welcome back</p>
        <div className="headClientPage"></div>
        {/* <p className='c_p'>Here you can access your account information, Create Fuel Quote Form, and manage your personal information.</p> */}

        <div className="outside">
          <div
            className="container"
            style={{ backgroundColor: "#ff8177" }}
            onClick={() => handleClick(`ClientProfilePage`)}
          >
            <p>Manage Personal Information</p>
          </div>

          <div
            className="container"
            style={{ backgroundColor: "#cf556c" }}
            onClick={() => handleClick("FuelQuoteForm")}
          >
            <p>Fuel Quote Form</p>
          </div>

          <div
            className="container"
            style={{ backgroundColor: "#a00533" }}
            onClick={() => handleClick("ChangePassPage")}
          >
            <p>Change Password</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default ClientPage;
