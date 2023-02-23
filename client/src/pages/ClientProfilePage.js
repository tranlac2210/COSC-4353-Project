import React, { useState } from 'react';
import "../styles/ClientProfilePage.css";

function ClientProfilePage() {
  const [fullName, setFullName] = useState('Client Name');
  const [address1, setAddress1] = useState('address');
  const [address2, setAddress2] = useState('');
  const [city, setCity] = useState('Houston');
  const [state, setState] = useState('alabama');
  const [zipcode, setZipcode] = useState('77204');

  const handleSubmit = (event) => {
    event.preventDefault();    
    
    alert('Your changes have been successfully saved!');
    console.log('Full Name: ', fullName);
    console.log('Address 1: ', address1);
    console.log('Address 2: ', address2);
    console.log('City: ', city);
    console.log('State: ', state);
    console.log('Zipcode: ', zipcode);
  };

  return (
    <>
      <div><h1 className='profileh1'>Client information</h1>
        <form className="login_form" onSubmit={handleSubmit}>
          <div>
            <label className="login_username" htmlFor="fullName">Full Name:</label>
            <input className='login_input'
              type="text"
              id="fullName"
              value={fullName}
              onChange={(event) => setFullName(event.target.value)}
              maxLength={50}
              required
            />
          </div>
          <div>
            <label className="login_username" htmlFor="address1">Address 1:</label>
            <input className='login_input'
              type="text"
              id="address1"
              value={address1}
              onChange={(event) => setAddress1(event.target.value)}
              maxLength={100}
              required
            />
          </div>
          <div>
            <label className="login_username" htmlFor="address2">Address 2:</label>
            <input className='login_input'
              type="text"
              id="address2"
              value={address2}
              onChange={(event) => setAddress2(event.target.value)}
              maxLength={100}
            />
          </div>
          <div>
            <label className="login_username" htmlFor="city">City:</label>
            <input className='login_input'
              type="text"
              id="city"
              value={city}
              onChange={(event) => setCity(event.target.value)}
              maxLength={100}
              required
            />
          </div>
          <div className='select_box'>
            <label className="login_username" htmlFor="state">State:</label>
            <select
              id="state"
              value={state}
              onChange={(event) => setState(event.target.value)}
              required
            >
              {/* <option value="">Select State</option> */}
              <option value="TX">Texas</option>
              <option value="AL">Alabama</option>
              <option value="AK">Alaska</option>

            </select>
          </div>
          <div>
            <label className="login_username" htmlFor="zipcode">Zipcode:</label>
            <input className='login_input'
              type="text"
              id="zipcode"
              value={zipcode}
              onChange={(event) => setZipcode(event.target.value)}
              maxLength={9}
              pattern="\d{5,9}"
              required
              /> 
          </div>
          <button className="login_button" type="submit">Save</button>
        </form>
      </div>
    </>      
  );
}

export default ClientProfilePage;
