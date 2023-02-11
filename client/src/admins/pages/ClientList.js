import React, { Fragment } from 'react';
import "./ClientList.css"
import "bootstrap/dist/css/bootstrap.min.css"
import clients from './clients';
import {Link, useNavigate} from 'react-router-dom'
 


function ClientList() {

    let history = useNavigate();

    const handleDelete = (id) => {
        var index = clients.map(client => {
            return client.id;
        }).indexOf(id);

        console.log(index);

    
        clients[index].active = 0;

        history("/admin/ClientList")
    }

    const handleModify = (id, first, last, address) => {
        localStorage.setItem("ID", id);
        localStorage.setItem("First", first);
        localStorage.setItem("Last", last);
        localStorage.setItem("Address", address);
    }

    return (
        <Fragment>
            <div className="border border-dark b-spacing">
                <h1>Client List</h1>
                <table className='table table-striped table-bordered table-responsive table-hover table-med align-middle' >
                    <thead>
                        <tr>
                            <th>#</th>
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
                                        <td>{client.first}</td>
                                        <td>{client.last}</td>
                                        <td>{client.address}</td>
                                        <td>
                                            <Link to={"/admin/ClientList/edit"}>
                                                <button type="button" className="btn btn-primary" onClick={() => handleModify(client.id, client.first, client.last, client.address)}>MODIFY</button>
                                            </Link>
                                            &nbsp;
                                            <button type="button" className="btn btn-success" onClick={() => alert(client.active)}>ORDERS</button>
                                            &nbsp;
                                            <button type="button" className="btn btn-danger" onClick={() => handleDelete(client.id)}>DELETE</button>

                                        </td>
                                    </tr>
                                ))
                            })
                            :
                            "No data available"
                        }
                    </tbody>
                </table>
                <br></br>
                <Link ></Link>
            </div>
        </Fragment>
        
    );
}


export default ClientList;