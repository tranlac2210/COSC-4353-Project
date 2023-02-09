import React, { useState } from 'react';
// import './ClientProfilePage.css';
import styled from "styled-components";

function ClientProfilePage() {
  const [fullName, setFullName] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipcode, setZipcode] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Full Name: ', fullName);
    console.log('Address 1: ', address1);
    console.log('Address 2: ', address2);
    console.log('City: ', city);
    console.log('State: ', state);
    console.log('Zipcode: ', zipcode);
  };

  return (
    <Wrapper>
      <div><h1 className='profileh1'>Edit information</h1>
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
              <option value="">Select State</option>
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
    </Wrapper>      
  );
}

const Wrapper = styled.div`
  .select_box{
    margin-bottom: 20px;
  }

  .profileh1{
    text-align: center;
    margin-bottom: 15px;
  }
  .login_form {
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
  
  h1 {
    text-align: center;
    margin-top: 10px;
    margin-bottom: 30px;
  } 


  .login_form h2 {
    font-size: 40px;
    margin-bottom: 30px;
  }

  .login_username,.login_pass {
    font-size: 24px;
    margin-bottom: 10px;
    margin-right: 20px;
  }
  
  .login_input {
    width: 300px;
    height: 40px;
    padding: 10px;
    margin-bottom: 20px;
    border-radius: 5px;
    border: none;
    font-size: 16px;
  }
  
  .login_button {
    margin-top: 20px;
    width: 300px;
    height: 40px;
    padding: 10px;
    border-radius: 5px;
    border: none;
    font-size: 16px;
    background-color: #4CAF50;
    color: white;
    cursor: pointer;
  }

  .demo{
    margin-top: 20px;

    padding: 10px;
    border-radius: 5px;
    border: none;
    font-size: 16px;
    background-color: #4CAF50;
    color: white;
    cursor: pointer;
  }
  .demo:hover {
    background-color: #3e8e41;
  }
  
  .login_button:hover {
    background-color: #3e8e41;
  }
  
`;

export default ClientProfilePage;
