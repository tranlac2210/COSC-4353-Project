import React, { Fragment, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ClientList.css";
// import clients from './clients';
import { Link, useNavigate } from "react-router-dom";
import Modal from "../components/Modal/Modal";
import logo from "../../image/logo.svg";
import Cookies from "js-cookie";

import { createAPIEndpoint, ENDPOINTS } from "../../API";
import axios from "axios";

function ClientList() {
  const [openModal, setOpenModal] = useState(false);
  const [deletedID, setdeletedId] = useState(-1);
  const [clients, setClients] = useState([]);
  const navigate = useNavigate();

  let history = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const res = await createAPIEndpoint(ENDPOINTS.AdminGetClients).fetch();
      setClients(res.data);
    };

    fetchData();
  }, [clients]);

  const handleDeactivate = async (id) => {
    try {
      const res = await createAPIEndpoint(
        ENDPOINTS.AdminDeactivateClient
      ).fetchById(id);

      if (res.status != 200) {
        throw Error(res.error);
      }

      setOpenModal(false);
    } catch (err) {
      console.log(err);
    }
    // console.log(id);
  };

  const handleOpenDeactivate = (id) => {
    setdeletedId(id);
    setOpenModal(true);
  };

  const handleModify = (id, first, last, address) => {
    localStorage.setItem("ID", id);
    localStorage.setItem("First", first);
    localStorage.setItem("Last", last);
    localStorage.setItem("Address", address);
  };

  useEffect(() => {
    if (openModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [openModal]);

  const handleClickLogo = (e) => {
    e.preventDefault();
  };

  const handleClickLogOut = (e) => {
    Cookies.remove("role");
    e.preventDefault();
    navigate("/");
  };

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
      <div className="border border-dark b-spacing">
        <h2>Clients</h2>
        <div className="line"></div>
        <table className="table table-striped table-bordered table-responsive table-hover table-med align-middle">
          <thead>
            <tr>
              <th>#</th>
              <th>Username</th>
              <th>Fullname</th>
              <th>Location</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {clients && clients.length > 0
              ? clients.map((client) => {
                  return (
                    client.active === 1 && (
                      <tr key={client.id}>
                        <td>{client.id}</td>
                        <td>{client.userName}</td>
                        <td>{client.info.FullName}</td>
                        {client.info.city && client.info.State ? (
                          <td>
                            {client.info.city}, {client.info.State}
                          </td>
                        ) : (
                          <td></td>
                        )}

                        <td>
                          <Link
                            to={`/admin/ClientList/edit?id=` + `${client.id}`}
                          >
                            <button
                              type="button"
                              className="btn btn-primary"
                              onClick={() =>
                                handleModify(
                                  client.id,
                                  client.first,
                                  client.last,
                                  client.address
                                )
                              }
                            >
                              DETAILS
                            </button>
                          </Link>
                          
                          &nbsp;
                          <Link
                            to={`/admin/ClientList/Order?id=` + `${client.id}`}
                          >
                            <button
                              type="button"
                              className="btn btn-success"
                              onClick={() =>
                                handleModify(
                                  client.id,
                                  client.first,
                                  client.last,
                                  client.address
                                )
                              }
                            >
                              ORDERS
                            </button>
                          </Link>    

                          
                          &nbsp;
                          <button
                            type="button"
                            className="btn btn-danger"
                            onClick={() => handleOpenDeactivate(client.id)}
                          >
                            DEACTIVATE
                          </button>
                        </td>
                      </tr>
                    )
                  );
                })
              : "No data available"}
          </tbody>
        </table>
      </div>
      {openModal && (
        <Modal
          onClose={() => setOpenModal(false)}
          onDelete={() => handleDeactivate(deletedID)}
        />
      )}
    </Fragment>
  );
}

export default ClientList;
