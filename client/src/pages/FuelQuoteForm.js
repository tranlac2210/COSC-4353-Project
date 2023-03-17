import React, { useState } from 'react';
import "../styles/FuelQuoteForm.css";
import { useLocation ,useNavigate} from "react-router-dom";
import logo from "../image/logo.svg";
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import Cookies from "js-cookie";

function FuelQuoteForm() {
  const location = useLocation();
  const [gallonsRequested, setGallonsRequested] = useState(null);
  const [selectedAddress, setAddress] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
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

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Gallons Requested: ', gallonsRequested);
    console.log('Address: ', selectedAddress);
    console.log('Selected Date: ', selectedDate);
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
          <select value = {selectedAddress} onChange = {handleSubmit} className='input1'>
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
        <div>
          <label className="input" htmlFor='suggestedPrice'>Suggested Price / Gallon: </label>
          <input className='input1'
            type='number'
            readOnly={true}
          />
        </div>
        <div>
          <label className="input" htmlFor='totalAmountDue'>Total Amount Due: </label>
          <input className='input1'
            type='number'
            readOnly={true}
          />
        </div>
        <button className="submit_button" type="submit">Request Quote</button>
      </form>
    </div>
    </>
      


    
  );
}

export default FuelQuoteForm;