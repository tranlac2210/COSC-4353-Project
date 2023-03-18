import React, { Fragment } from 'react';
import {useState, useEffect} from 'react'
// import clients from './clients';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css"
import "./ClientEdit.css"
import logo from "../../image/logo.svg"
import Cookies from 'js-cookie';



function ClientEdit(props) {
    const [first, setFirst] = useState("");
    const [last, setLast] = useState("");
    const [address, setAddress] = useState("");
    const [id, setId] = useState("");
    const [clients, setclients] = useState([]);

    let navigate = useNavigate();
    const location = useLocation();
    const cid = new URLSearchParams(location.search).get('id');
    useEffect(() => {
        async function fetchData() {
          const res = await axios.get(`http://localhost:9000/api/admin/getClients`);
          setFirst(res.data[cid].first);
          setLast(res.data[cid].last);
          setAddress(res.data[cid].address);
          setId(res.data[cid].id);
          setclients(res.data);
        }  fetchData();
      }, []);
    //   alert('hello',id);
    //   var index = clients.map((client) => {
    //     return clients.id
    // }).indexOf(id);

    const handleSubmit = async () => {
        // e.preventDefault()
        try {
            const resf = await axios.put('http://localhost:9000/api/admin/modifyClientInfo', {
              id: id,
              first:first,
              last:last,
              address:address
            });
            
        
            console.log(resf.data.success);
            navigate("/admin/ClientList");
            
          } catch (error) {
            console.error(error);
          }
        // console.log(index);
        // console.log(id);
        // console.log(first);
        // console.log(localStorage.getItem("ID"));
        // console.log(id);
        // var a = clients[id];

        // // // console.log(a);

        // a.first = first;
        // a.last = last;
        // a.address = address;

    };

    // useEffect(() => {
    //     setFirst(localStorage.getItem("First"));
    //     setLast(localStorage.getItem("Last"));
    //     setAddress(localStorage.getItem("Address"));
    //     setId(localStorage.getItem("ID"));
    // }, [])

    const handleClickLogo = (e) => {
      e.preventDefault();
      navigate("/admin/ClientList");
    }

    const handleClickLogOut = (e) => {
      Cookies.remove("role");
      e.preventDefault();
      navigate("/");
    }
     
    return (
        <Fragment>
          <nav className="navbar nav-pad navbar-light bg-light">
        <a className="navbar-brand" href="#" onClick={handleClickLogo}>
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
            <div className='border border-dark b-spacing-2'>
                <div className="input-group mb-3">
                    <span className="input-group-text">First</span>
                    <input type="text" className="form-control" placeholder="First" value={first} aria-label="Username" required onChange={(e) => setFirst(e.target.value)}/>
                    <span className="input-group-text">Last</span>
                    <input type="text" className="form-control" placeholder="Last" value={last} aria-label="Server" required onChange={(e) => setLast(e.target.value)}/>
                </div>
                <div className="input-group mb-3">
                <span className="input-group-text" id="inputGroup-sizing-default">Address</span>
                    <input type="text" className="form-control" value={address} aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" required onChange={(e) => setAddress(e.target.value)}/>
                </div>
                <button type="submit" className="btn btn-success btn-outline-dark bn-color" onClick={() => handleSubmit()}><b>Save</b></button>
            </div>
        </Fragment>
        
    );
}

export default ClientEdit;