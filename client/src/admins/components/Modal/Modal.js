import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import './Modal.css'

function Modal({onClose, onDelete}) {
    return (
        <div onClick={onClose} className='overlay'>
            <div onClick={(e) => {
                e.stopPropagation()
            }} className='modalContainer border border-dark'>
                <div className='head'></div>
                <div className='modal-title'>
                    <h4>Deactivate Account</h4>
                </div>
                <div className='content'>
                    <p>Are you sure you want to deactive this account? This action cannot be undone</p>
                </div>
                <div className='btnContainer'>
                    <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
                    <button type="button" className="btn btn-danger" onClick={onDelete}>Deactivate</button>
                </div>
            </div>
        </div>
    );
}

export default Modal;