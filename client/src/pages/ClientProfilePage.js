import React, { useState,useEffect  } from 'react';
import { useLocation } from 'react-router-dom';
import "../styles/ClientProfilePage.css";
import axios from 'axios';
import { createAPIEndpoint, ENDPOINTS } from '../API';
import Cookies from 'js-cookie'

function ClientProfilePage() {
  const location = useLocation();
  // const id = new URLSearchParams(location.search).get('id');

  const [fullName, setFullName] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipcode, setZipcode] = useState('');
  

  // useEffect(() => {
  //   async function fetchData() {
  //     // const res = await axios.get(`http://localhost:9000/user/getUserinfo/${username}`);
  //     const res = await createAPIEndpoint(ENDPOINTS.GetUser).fetchById(id);
  //     setFullName(res.data.FullName);
  //     setAddress1(res.data.Address1);
  //     setAddress2(res.data.Address2);
  //     setCity(res.data.city);
  //     setState(res.data.State);
  //     setZipcode(res.data.Zipcode);
  //   }  fetchData();
  // }, [id]);

  useEffect(() => {
    async function fetchData() {
      let accessToken = Cookies.get('accessToken');
      let webApiUrl = 'http://localhost:9000/api/user/authGetUsers';
      const res = await axios.get(webApiUrl, { headers: {"Authorization" : `Bearer ${accessToken}`} });
      // const res = await createAPIEndpoint(ENDPOINTS.GetUserAuth).get({Headers: {"Authorization": `Bearer ${accessToken}`}});
      setFullName(res.data.FullName);
      setAddress1(res.data.Address1);
      setAddress2(res.data.Address2);
      setCity(res.data.city);
      setState(res.data.State);
      setZipcode(res.data.Zipcode);

    }  
    fetchData();
  });

  

  // const handleSubmit = async  (event) => {
  //   event.preventDefault();    
   
  //   // Make an API call to update the user information on the backend
  //   try {
  //     // const res = await axios.put('http://localhost:9000/user/UserInfoChange', {
  //     //   // userName: username,
  //     //   info: [{
  //     //     FullName: fullName,
  //     //     Address1: address1,
  //     //     Address2: address2,
  //     //     city: city,
  //     //     State: state,
  //     //     Zipcode: zipcode
  //     //   }]
  //     // });

  //     const res = await createAPIEndpoint(ENDPOINTS.UserInfoChange).put(id, {
  //       // userName: username,
  //         FullName: fullName,
  //         Address1: address1,
  //         Address2: address2,
  //         city: city,
  //         State: state,
  //         Zipcode: zipcode
  //     });

  //     alert('Your changes have been successfully saved!');
  
  //     console.log(res.data.success);
  //   } catch (error) {
  //     console.error(error);
  //   }

  const handleSubmit = () => {

  }

    // const handleSubmit = async  (event) => {
    //   event.preventDefault();    
    
    //   // Make an API call to update the user information on the backend
    //   try {
    //     // const res = await axios.put('http://localhost:9000/user/UserInfoChange', {
    //     //   // userName: username,
    //     //   info: [{
    //     //     FullName: fullName,
    //     //     Address1: address1,
    //     //     Address2: address2,
    //     //     city: city,
    //     //     State: state,
    //     //     Zipcode: zipcode
    //     //   }]
    //     // });

    //     const res = await createAPIEndpoint(ENDPOINTS.UserInfoChange).put(id, {
    //       // userName: username,
    //         FullName: fullName,
    //         Address1: address1,
    //         Address2: address2,
    //         city: city,
    //         State: state,
    //         Zipcode: zipcode
    //     });

    //     alert('Your changes have been successfully saved!');
    
    //     console.log(res.data.success);
    //   } catch (error) {
    //     console.error(error);
    //   }
    // };

  return (
    <>
      <div>
        <div className='empty'></div>
        <div className="cp_login_form">
          <div className='headSignUp'></div>
          <h3>Client information</h3>
          <div className='empty'></div>
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
            <button className="login_button" type="submit" onClick={handleSubmit}>Save</button>
          </div>
        
      </div>
    </>      
  );
}

export default ClientProfilePage;
