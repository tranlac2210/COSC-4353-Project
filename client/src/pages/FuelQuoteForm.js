import React, { useState } from 'react';
import "../styles/FuelQuoteForm.css";
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
    <>
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
    </>
      


    
  );
}

export default FuelQuoteForm;