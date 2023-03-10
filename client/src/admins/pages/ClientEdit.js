import React, { Fragment } from 'react';
import {useState, useEffect} from 'react'
// import clients from './clients';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css"
import "./ClientEdit.css"



function ClientEdit(props) {
    const [first, setFirst] = useState("");
    const [last, setLast] = useState("");
    const [address, setAddress] = useState("");
    const [id, setId] = useState("");
    const [clients, setclients] = useState([]);

    let historyf = useNavigate();
    const location = useLocation();
    const cid = new URLSearchParams(location.search).get('id');
    useEffect(() => {
        async function fetchData() {
          const res = await axios.get(`http://localhost:9000/admin/getClients`);
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
            const resf = await axios.put('http://localhost:9000/admin/modifyClientInfo', {
              id: id,
              first:first,
              last:last,
              address:address
            });
            
        
            console.log(resf.data.success);
            historyf("/admin/ClientList");
            
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
     
    return (
        <Fragment>
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