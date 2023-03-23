import React, { useEffect, useState } from "react";
import "../styles/FuelQuoteForm.css";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../image/logo.svg";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Cookies from "js-cookie";
import axios from "axios";

import { createAPIEndpoint, ENDPOINTS } from "../API";

function FuelQuoteForm() {
  const location = useLocation();
  const [gallonsRequested, setGallonsRequested] = useState("");
  const [selectedAddress, setAddress] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [addressString, setAddressString] = useState("");
  const [suggestedPrice, setPrice] = useState("");
  const [totalAmountDue, setAmountDue] = useState("");

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
      let webApiUrl = "http://localhost:9000/api/user/authGetUsers";
      const res = await axios.get(webApiUrl, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      var Address1 = res.data.Address1;
      var Address2 = res.data.Address2;
      var city = res.data.city;
      var state = res.data.State;
      var Zipcode = res.data.Zipcode;

      var stringAddress = `${Address1} ${Address2} ${city}, ${state} ${Zipcode}`;

      console.log(stringAddress);
      setAddressString(stringAddress);

      console.log(addressString);
      // setAddress1(res.data.Address1);
      // setAddress2(res.data.Address2);
    }
    fetchData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Send a POST request to the login API endpoint
      let accessToken = Cookies.get("accessToken");

      let webApiUrl = "http://localhost:9000/api/user/getFuelInfo";

      const jsonBody = {
        gallonsRequested: gallonsRequested,
        selectedAddress: selectedAddress,
        selectedDate: selectedDate,
      };

      const res = await axios.post(webApiUrl, jsonBody, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "content-type": "application/json",
        },
      });

      console.log(res.data);
    } catch (er) {
      // If there's an error, set the error label
      //setErrorLabel(`${er.response.data.error}`);
    }
  };

  return (
    <>
      <nav className="navbar nav-pad navbar-light bg-light">
        <a
          className="navbar-brand"
          href="/ClientPage"
          onClick={handleClickLogo}
        >
          <img
            src={logo}
            width="40"
            height="40"
            className="d-inline-block align-top"
            alt=""
          ></img>
        </a>
        <a
          className="nav-item nav-link click"
          href="#"
          onClick={handleClickLogOut}
        >
          Log Out
        </a>
      </nav>
      <div>
        <h1 className="profiletest"></h1>
        <div className="empty"></div>
        <form className="fuelinput" onSubmit={handleSubmit}>
          <div className="cp_headSignUp"></div>
          <h2>Fuel Quote Form</h2>
          <div className="outdiv">
            <label className="input" htmlFor="gallonsRequested">
              Gallons Requested:{" "}
            </label>
            <input
              className="input1"
              type="number"
              value={gallonsRequested}
              onChange={(event) => setGallonsRequested(event.target.value)}
              required
            />
          </div>
          <div className="outdiv">
            <label className="input" htmlFor="address">
              Delivery Address:{" "}
            </label>
            <textarea
              className="input1"
              type="string"
              value={addressString}
              readOnly={true}
            />
          </div>
          <div className="outdiv">
            <label className="input" htmlFor="deliveryDate">
              Select Delivery Date:{" "}
            </label>
            <DatePicker
              className="input1"
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              minDate={new Date()}
              showYearDropdown
              required
            />
          </div>
          <div className="outdiv">
            <label className="input" htmlFor="suggestedPrice">
              Suggested Price / Gallon:{" "}
            </label>
            <input
              className="input1"
              type="number"
              value={suggestedPrice}
              onChange={(event) => setPrice(event.target.value)}
              readOnly={true}
            />
          </div>
          <div className="outdiv">
            <label className="input" htmlFor="totalAmountDue">
              Total Amount Due:{" "}
            </label>
            <input
              className="input1"
              type="number"
              value={totalAmountDue}
              onChange={(event) => setAmountDue(event.target.value)}
              readOnly={true}
            />
          </div>
          <button className="submit_button" type="submit">
            Request Quote
          </button>
        </form>
      </div>
    </>
  );
}

export default FuelQuoteForm;
