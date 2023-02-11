import React, { Fragment } from 'react';
import {useState, useEffect} from 'react'
import clients from './clients';
import { useNavigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css"
import "./ClientEdit.css"



function ClientEdit(props) {
    const [first, setFirst] = useState("");
    const [last, setLast] = useState("");
    const [address, setAddress] = useState("");
    const [id, setId] = useState("");

    let history = useNavigate()

    var index = clients.map(client => {
        return clients.id
    }).indexOf(id)

    const handleSubmit = () => {
        // e.preventDefault()
        // console.log(index);
        // console.log(id);
        // console.log(first);
        // console.log(localStorage.getItem("ID"));
        var a = clients[id];

        console.log(a);

        a.first = first;
        a.last = last;
        a.address = address;

        history("/admin/ClientList");
    }

    useEffect(() => {
        setFirst(localStorage.getItem("First"));
        setLast(localStorage.getItem("Last"));
        setAddress(localStorage.getItem("Address"));
        setId(localStorage.getItem("ID"));
    }, [])
     
    return (
        <Fragment>
            <div className='border boder-dark b-spacing'>
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
                <button type="submit" className="btn btn-success" onClick={() => handleSubmit()}>MODIFY</button>
            </div>
        </Fragment>
        
    );
}

export default ClientEdit;