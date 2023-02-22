import React, { useState } from 'react';
import styled from "styled-components";
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

function FuelQuoteForm() {
  const [gallonsRequested, setGallonsRequested] = useState(null);
  const [selectedAddress, setAddress] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Gallons Requested: ', gallonsRequested);
    console.log('Address: ', selectedAddress);
    console.log('Selected Date: ', selectedDate);
  };


  return (
    <Wrapper>
    <div><h1 className='profiletest'></h1>
      <form className='fuelinput' onSubmit={handleSubmit}>
      <h2>Fuel Quote Form</h2>
        <div>
          <label className="input" htmlFor='gallonsRequested'>Gallons Requested: </label>
          <input className='input1'
            type='number'
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
    </Wrapper>
      


    
  );
}

const Wrapper = styled.div`
  .fuelinput {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #f2f2f2;
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    width: 50%;
    margin: auto;
  }
  
  .fuelinput h2 {
    margin-bottom: 30px;
  }
  
  .input {
    display: flex;
    margin-top: 10px;
    margin-bottom: 5px;
    align-items: center;
    
  }

  .input1 {
    width: 100%;
    padding: 5px;
    border-radius: 5px;
    border: none;
    margin-bottom: 20px;
  }

  .submit_button {
    margin-top: 20px;
    background-color: #4CAF50;
    color: white;
    padding: 5px 20px;
    border-radius: 5px;
    border: none;
    cursor: pointer;
  }

`;

export default FuelQuoteForm;