import React, { Fragment, useEffect, useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import "./ClientList.css"
// import clients from './clients';
import {Link, useNavigate} from 'react-router-dom'
import Modal from '../components/Modal/Modal';

import { createAPIEndpoint, ENDPOINTS } from '../../API';
 

import axios from 'axios';



function ClientList() {
    const [openModal, setOpenModal] = useState(false);

    const [deletedID, setdeletedId] = useState(-1);
    const [clients, setClients] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            // const res = await axios.get(`http://localhost:9000/user/getUserinfo/${username}`);
            const res = await createAPIEndpoint(ENDPOINTS.AdminGetClients).fetch();
            setClients(res.data);
        } ; 
          
        fetchData();
    }, [clients])



    let history = useNavigate();

    useEffect(() => {
        async function fetchData() {
          const res = await axios.get(`http://localhost:9000/admin/getClients`);
          setFirst(res.data.first);
          setLast(res.data.last);
          setAddress(res.data.address);
          setId(res.data.id);
          setactive(res.data.active);
          setclients(res.data);
          
        }  fetchData();
      }, []);

    const handleDeactivate = (id) => {
        var index = clients.map(client => {
            return client.id;
        }).indexOf(id);

        console.log(index);

    
        clients[index].active = 0;

        setOpenModal(false);

        // history("/admin/ClientList")
    }

    const handleOpenDeactivate = (id) => {
        setdeletedId(id);
        setOpenModal(true);
    }

    const handleModify = (id, first, last, address) => {
        localStorage.setItem("ID", id);
        localStorage.setItem("First", first);
        localStorage.setItem("Last", last);
        localStorage.setItem("Address", address);
    }

    useEffect(() => {
        if (openModal) {
            document.body.style.overflow = 'hidden';
        }
        else {
            document.body.style.overflow = 'unset';
        }
    }, [openModal])

    return (
        <Fragment>
            <div className="border border-dark b-spacing">
                <h2>Clients</h2>
                <div className='line'></div>
                <table className='table table-striped table-bordered table-responsive table-hover table-med align-middle' >
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Username</th>
                            <th>First</th>
                            <th>Last</th>
                            <th>Address</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            clients && clients.length > 0
                            ?
                            clients.map((client) => {
                                return (
                                    client.active === 1 && (
                                    <tr key={client.id}>
                                        <td>{client.id}</td>
                                        <td>Username</td>
                                        <td>{client.first}</td>
                                        <td>{client.last}</td>
                                        <td>{client.address}</td>
                                        <td>
                                            <Link to={`/admin/ClientList/edit?id=`+`${client.id}`}>
                                                <button type="button" className="btn btn-primary" onClick={() => handleModify(client.id, client.first, client.last, client.address)}>MODIFY</button>
                                            </Link>
                                            &nbsp;
                                            <button type="button" className="btn btn-success" onClick={() => alert(client.active)}>ORDERS</button>
                                            &nbsp;
                                            <button type="button" className="btn btn-danger" onClick={() => handleOpenDeactivate(client.id)}>DEACTIVATE</button>

                                        </td>
                                    </tr>
                                ))
                            })
                            :
                            "No data available"
                        }
                    </tbody>
                </table>
            </div>
            {openModal && <Modal onClose={() => setOpenModal(false)} onDelete={() => handleDeactivate(deletedID)}/>}
            
        </Fragment>
        
    );
}


export default ClientList;