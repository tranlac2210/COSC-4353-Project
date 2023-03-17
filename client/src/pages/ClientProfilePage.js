import React, { useState, useEffect } from "react";
import { useLocation ,useNavigate} from "react-router-dom";
import "../styles/ClientProfilePage.css";
import axios from "axios";
import { createAPIEndpoint, ENDPOINTS } from "../API";
import Cookies from "js-cookie";
import logo from "../image/logo.svg";

function ClientProfilePage() {
  const location = useLocation();

  const [fullName, setFullName] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipcode, setZipcode] = useState("");
  
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


  useEffect(() => {
    async function fetchData() {
      let accessToken = Cookies.get("accessToken");
      let webApiUrl = "http://localhost:9000/api/user/authGetUsers";
      const res = await axios.get(webApiUrl, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      setFullName(res.data.FullName);
      setAddress1(res.data.Address1);
      setAddress2(res.data.Address2);
      setCity(res.data.city);
      setState(res.data.State);
      setZipcode(res.data.Zipcode);
    }
    fetchData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Make an API call to update the user information on the backend
    try {
      let accessToken = Cookies.get("accessToken");
      let webApiUrl = "http://localhost:9000/api/user/UserInfoChange";
      const jsonBody = {
        FullName: fullName,
        Address1: address1,
        Address2: address2,
        city: city,
        State: state,
        Zipcode: zipcode,
      };
      const res = await axios.post(webApiUrl, jsonBody, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "content-type": "application/json",
        },
      });

      // const res = await createAPIEndpoint(ENDPOINTS.UserInfoChange).put(id, {
      //   // userName: username,
      //   FullName: fullName,
      //   Address1: address1,
      //   Address2: address2,
      //   city: city,
      //   State: state,
      //   Zipcode: zipcode,
      // });

      alert("Your changes have been successfully saved!");

      console.log(res.data.success);
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
        <div className="cp_login_form">
          <div className="headSignUp"></div>
          <h3>Client information</h3>
          <div className="empty"></div>
          <div>
            <label className="login_username" htmlFor="fullName">
              Full Name:
            </label>
            <input
              className="login_input"
              type="text"
              id="fullName"
              value={fullName}
              onChange={(event) => setFullName(event.target.value)}
              maxLength={50}
              required
            />
          </div>
          <div>
            <label className="login_username" htmlFor="address1">
              Address 1:
            </label>
            <input
              className="login_input"
              type="text"
              id="address1"
              value={address1}
              onChange={(event) => setAddress1(event.target.value)}
              maxLength={100}
              required
            />
          </div>
          <div>
            <label className="login_username" htmlFor="address2">
              Address 2:
            </label>
            <input
              className="login_input"
              type="text"
              id="address2"
              value={address2}
              onChange={(event) => setAddress2(event.target.value)}
              maxLength={100}
            />
          </div>
          <div>
            <label className="login_username" htmlFor="city">
              City:
            </label>
            <input
              className="login_input"
              type="text"
              id="city"
              value={city}
              onChange={(event) => setCity(event.target.value)}
              maxLength={100}
              required
            />
          </div>
          <div className="select_box">
            <label className="login_username" htmlFor="state">
              State:
            </label>
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
            <label className="login_username" htmlFor="zipcode">
              Zipcode:
            </label>
            <input
              className="login_input"
              type="text"
              id="zipcode"
              value={zipcode}
              onChange={(event) => setZipcode(event.target.value)}
              maxLength={9}
              pattern="`\d{5}-\d{4}`"
              required
              onKeyPress={(event) => {
    if (!/[0-9]/.test(event.key)) {
      event.preventDefault();    }
  }}
            />
          </div>
          <button className="login_button" type="submit" onClick={handleSubmit}>
            Save
          </button>
        </div>
      </div>
    </>
  );
}

export default ClientProfilePage;
