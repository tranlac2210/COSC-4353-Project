import React, { useState } from 'react';
import "../styles/FuelQuoteForm.css";
import { useLocation ,useNavigate} from "react-router-dom";
import logo from "../image/logo.svg";
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import Cookies from "js-cookie";

import { createAPIEndpoint, ENDPOINTS } from "../API";


function FuelQuoteForm() {
  const location = useLocation();
  const [gallonsRequested, setGallonsRequested] = useState('');
  const [selectedAddress, setAddress] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [username, setusername] = useState('');

  const [suggestedPrice, setPrice] = useState(''); 
  const [totalAmountDue, setAmountDue] = useState(''); 

  const id = new URLSearchParams(location.search).get("id");
  const navigate = useNavigate();

  const handleClick = (toLink) => {
    navigate(`/${toLink}`);
  };

  const handleClickLogOut = (e) => {
    Cookies.remove('role');
    Cookies.remove('accessToken');
    e.preventDefault();
    navigate('/')
  }

  const handleClickLogo = (e) => {
    e.preventDefault();
    navigate('/ClientPage')
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    //console.log('Gallons Requested: ', gallonsRequested);
    //console.log('Address: ', selectedAddress);
    //console.log('Selected Date: ', selectedDate);

    try {
      // Send a POST request to the login API endpoint
      const response = await createAPIEndpoint(ENDPOINTS.UserQuoteForm).post({
        username: username,
        gallonsRequested: gallonsRequested,
        selectedAddress: selectedAddress,
        selectedDate: selectedDate,
        //suggestedPrice: suggestedPrice,
        //totalAmountDue: totalAmountDue

      });

      console.log(response.data);

    } 

     catch (er) {
      // If there's an error, set the error label
        //setErrorLabel(`${er.response.data.error}`);
      
    }
  };


  return (
    <>
    <nav className="navbar nav-pad navbar-light bg-light">
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
    <div><h1 className='profiletest'></h1>
    <div className='empty'></div>
      <form className='fuelinput' onSubmit={handleSubmit}>
      <div className="cp_headSignUp"></div>
      <h2>Fuel Quote Form</h2>
        <div>
          <label className="input" htmlFor='username'>Username: </label>
          <input className='input1'
            id="username"
            value={username}
            onChange={(event)=> setusername(event.target.value)}
            required
          />
        </div>
         <div>
          <label className="input" htmlFor='gallonsRequested'>Gallons Requested: </label>
          <input className='input1'
            type='number'
            min="0"
            id="gallonsRequested"
            value={gallonsRequested}
            onChange={(event)=> setGallonsRequested(event.target.value)}
            required
          />
        </div>
         <div>
           <label className="input" htmlFor='address'>Delivery Address: </label>
          <select value = {selectedAddress} onChange = {(event)=>setAddress(event.target.value)} className='input1'>
            <option value="Address 1">Address 1</option>
            <option value="Address 2">Address 2</option>
           </select>
         </div> 
        <div>
          <label className="input" htmlFor='deliveryDate'>Select Delivery Date: </label>
            <DatePicker className='input1'
              selected={selectedDate} 
              onChange={(date) => setSelectedDate(date)} 
              minDate={new Date()}
              showYearDropdown
              required
            />
        </div>
        {/* { /*<div>
          <label className="input" htmlFor='suggestedPrice'>Suggested Price / Gallon: </label>
          <input className='input1'
            type='number'
            value={suggestedPrice}
            onChange={(event)=> setPrice(event.target.value)}
            readOnly={true}
          />
        </div>
        <div>
          <label className="input" htmlFor='totalAmountDue'>Total Amount Due: </label>
          <input className='input1'
            type='number'
            value={totalAmountDue}
            onChange={(event)=> setAmountDue(event.target.value)}
            readOnly={true}
          />
        </div>*/ } 
        <button className="submit_button" type="submit">Request Quote</button>
      </form>
    </div>
    </>
      


    
  );
}

export default FuelQuoteForm;