// import React, { Fragment } from 'react';
// import {useState, useEffect} from 'react'
// // import clients from './clients';
// import axios from 'axios';
// import { useNavigate, useLocation } from 'react-router-dom';
// import "bootstrap/dist/css/bootstrap.min.css"
// import "./ClientEdit.css"
// import logo from "../../image/logo.svg"
// import Cookies from 'js-cookie';
// import "./ClientOrder.css";
import React, { useState, useEffect } from "react";
import { useLocation ,useNavigate} from "react-router-dom";
import "../styles/FuelQuoteHistory.css"
import axios from "axios";
import { createAPIEndpoint, ENDPOINTS } from "../API";
import Cookies from "js-cookie";
import logo from "../image/logo.svg";

function FuelQuoteHistory() {
  const location = useLocation();
  const [clients, setClients] = useState([]);
  const [Name, setName] = useState("");
  const [Volumn, setVolumn] = useState("");
  const [date, setDate] = useState("");

  
  const id = new URLSearchParams(location.search).get("id");
  const navigate = useNavigate();

  const handleClick = (toLink) => {
    navigate(`/${toLink}`);
  };


  const handleClickLogOut = (e) => {
    Cookies.remove("role");
    Cookies.remove("accessToken");
    e.preventDefault();
    navigate("/");
  };

  const handleClickLogo = (e) => {
    e.preventDefault();
    navigate("/ClientPage");
  };

  useEffect(() => {
    async function fetchData() {
      let accessToken = Cookies.get("accessToken");
      let webApiUrl = "http://localhost:9000/api/user/getUsersorder";
      const res = await axios.get(webApiUrl, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      setClients(res.data);
      
    }
    fetchData();
  }, [clients]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const res = await createAPIEndpoint(ENDPOINTS.GetUsersorder).fetch();
  //     setClients(res.data);
      
  //   };

  //   fetchData();
  // }, [clients]);
  
  const handleSubmit = async (event) => {
    // Make an API call to update the user information on the backend
    try {
      event.preventDefault();

      const jsonBody = {
        name: Name,
        volumn: Volumn,
        date: date,
      
      };
      
      const res = await createAPIEndpoint(ENDPOINTS.modifyClientInfo).get(id, jsonBody);

      alert("Your changes have been successfully saved!");

    } catch (error) {
      console.error(error);
    }
 

  };

  return (
    <><nav className="navbar nav-pad navbar-light bg-light">
    <a className="navbar-brand" href="/ClientPage" onClick={handleClickLogo}> 
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
      <div>
        <div className="empty"></div>
        <div className="his-cp_login_form">
          <div className="headSignUp"></div>
          <h3>Client Orders</h3>
          {/* <div className="empty"></div> */}
          <div>
          
          <table className="his-orders-table">
        <thead>
        <tr>
            <th>ID</th>
            <th>Gallons</th>
            <th>Delivery Address</th>
            <th>Date</th>
            <th>Sugguest Price</th>
            <th>Total Amount</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((clients,index) => (
            <tr key={index}>
              <td>{index+1}</td>
              <td>{clients.gallon}</td>
              <td>{clients.address}</td>
              <td>{clients.date}</td>
              <td>{`$${clients.suggestPrice}`}</td>
              <td>{`$${clients.totalCost}`}</td>
            </tr>
          ))}
        </tbody>
      </table>
          
      </div> 
            
      </div> 
          
      </div>
    </>
  );
}

export default FuelQuoteHistory;
