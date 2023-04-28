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
  const [pregallonsRequested, setpreGallonsRequested] = useState("");
  const [preaddressString, setpreAddressString] = useState("");
  const [preselectedDate, setpreSelectedDate] = useState("");
  const [selectedAddress, setAddress] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [addressString, setAddressString] = useState("");
  const [suggestedPrice, setPrice] = useState("");
  const [totalAmountDue, setAmountDue] = useState("");
  const [LocationFactor, setLocationFactor] = useState("");
  const [RateHistoryFactor, setRateHistoryFactor] = useState("");
  const [GallonsRequestedFactor, setGallonsRequestedFactor] = useState("");
  const [clients, setClients] = useState([]);
  const [orderId, setOrderId] = useState("")
  const currentPrice = 1.5;

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

      var Address1 = res.data.address1;
      var Address2 = res.data.address2;
      var city = res.data.city;
      var state = res.data.state;
      var Zipcode = res.data.zipcode;

      var stringAddress = `${Address1} ${Address2} ${city}, ${state} ${Zipcode}`;

      console.log(stringAddress);
      setAddressString(stringAddress);

      console.log(addressString);
      // setAddress1(res.data.Address1);
      // setAddress2(res.data.Address2);
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      let accessToken = Cookies.get("accessToken");
      let webApiUrl = "http://localhost:9000/api/user/getUsersorder";
      const res = await axios.get(webApiUrl, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      if (res.data == "") {
        setRateHistoryFactor(0);
      } else {
        setRateHistoryFactor(0.01);
      }

      setClients(res.data);
    }
    fetchData();
  }, [clients]);

  const handleRequestQuote = async (event) => {
    event.preventDefault();
    if (!gallonsRequested || !selectedDate) {
      return;
    }
    if (pregallonsRequested==gallonsRequested && preaddressString==addressString && preselectedDate == selectedDate){
      return
    }

    try {
      // Send a POST request to the login API endpoint

      const currentPrice = 1.5; // constant price for simplicity
      const LocationFactor = addressString.includes("TX") ? 0.02 : 0.04;
      // if (selectedAddress.includes('TX')){
      //       setLocationFactor(0.02)
      //     }
      // const rateHistoryFactor = 0.01;
      const gallonsRequestedFactor = gallonsRequested > 1000 ? 0.02 : 0.03;
      const companyProfitFactor = 0.1;
      const margin =
        currentPrice *
        (LocationFactor -
          RateHistoryFactor +
          gallonsRequestedFactor +
          companyProfitFactor);
      const suggestedPrice = currentPrice + margin;
      const totalAmountDue = suggestedPrice * gallonsRequested;
      setPrice(suggestedPrice.toFixed(3));
      setAmountDue(totalAmountDue.toFixed(2));
      setpreGallonsRequested(gallonsRequested);
      setpreAddressString(addressString);
      setpreSelectedDate(selectedDate);
      let accessToken = Cookies.get("accessToken");

      let webApiUrl = "http://localhost:9000/api/user/fuelQuote";

      const jsonBody = {
        Gallons: gallonsRequested,
        DeliveryAddress: addressString,
        date: selectedDate.toISOString().substr(0, 10),
        Sugguestprice: suggestedPrice,
        TotalAmount: totalAmountDue,
      };

      const res = await axios.post(webApiUrl, jsonBody, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "content-type": "application/json",
        },
      });

      console.log(res.data);
      setOrderId(res.data);

    } catch (er) {
      // If there's an error, set the error label
      //setErrorLabel(`${er.response.data.error}`);
      console.log(er.error);
    }
  };

  // const handleSubmit = async (event) => {
  //   // event.preventDefault();

  //   try {
  //     // Send a POST request to the login API endpoint
  //     let accessToken = Cookies.get("accessToken");

  //     let webApiUrl = "http://localhost:9000/api/user/Userpostfuel";

  //     const jsonBody = {
  //       Gallons: gallonsRequested,
  //       DeliveryAddress: addressString,
  //       date: selectedDate.toISOString().substr(0, 10),
  //       Sugguestprice: suggestedPrice,
  //       TotalAmount: totalAmountDue,
  //     };

  //     const res = await axios.post(webApiUrl, jsonBody, {
  //       headers: {
  //         Authorization: `Bearer ${accessToken}`,
  //         "content-type": "application/json",
  //       },
  //     });
  //     alert("Successful Submit quote!!");
  //     setGallonsRequested("");
  //     setSelectedDate("");
  //     setPrice("");
  //     setAmountDue("");
  //     console.log(res.data);
  //   } catch (er) {
  //     // If there's an error, set the error label
  //     //setErrorLabel(`${er.response.data.error}`);
  //   }
  // };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();

      if (!suggestedPrice || !totalAmountDue) {
        alert("Please request quote first!")
        return;
      }

      let accessToken = Cookies.get("accessToken");

      let webApiUrl = "http://localhost:9000/api/user/Userpostfuel";

      const jsonBody = {
        orderId: orderId
      };

      const res = await axios.post(webApiUrl, jsonBody, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "content-type": "application/json",
        },
      });

      if (res.status === 200) {
        setGallonsRequested("");
        setSelectedDate("");
        setPrice("");
        setAmountDue("");
        alert("Ordered successfully");
      }
      else {
        throw(Error(res.error))
      }
    } catch (error) {
      alert(error)
    }
  }

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

        <form className="fuelinput" onSubmit={handleRequestQuote}>
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
              min={0}
              required
              onKeyPress={(event) => {
    if (!/[0-9,'.']/.test(event.key)) {
      event.preventDefault();    }
  }}
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
          <button
            className="submit_button"
            type="submit"
            onClick={handleRequestQuote}
          >
            Request Quote
          </button>
          <button
            className="submit_button"
            type="submit"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default FuelQuoteForm;
