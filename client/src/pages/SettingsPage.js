import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import Navbar from "../components/Navbar";

export const SettingsPage = () => {
  
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div className="nav-bar">
        <Navbar/>
        <div className="container">
          <h1 className="mt-3">Check out your account!</h1>
          <div className="col-sm">
          <div className="text-left fw-bold">
            Full Name:
          </div>
            <p className="font-weight-normal">John Doe</p>
          <div className="text-left fw-bold">
            Email:
          </div>
            <p className="font-weight-normal">test@email.com</p>
          <div className="text-left fw-bold">
            Password: 
          </div>
            <p className="font-weight-normal">********</p>

          {/* // dealing with pop up to delete account */}
          <div className="mt-auto">
            <Button variant="danger" onClick={handleShow}>
              Delete Account
            </Button>

            <Modal
              show={show}
              onHide={handleClose}
              backdrop="static"
              keyboard={false}
            >
              <Modal.Header closeButton>
                <Modal.Title>Deleting Account</Modal.Title>
              </Modal.Header>

              <Modal.Body>
                Deleting your account will delete your access and all your information on this site. This action can not be undone.
              </Modal.Body>

              <Modal.Footer>
                {/* <Button variant="danger" onClick={to="/"}>Permenantly Delete Account</Button> */}
                <Link
                  className="btn btn-danger"
                  role="button"
                  to="/"
                >
                  Yes, Delete Account
                </Link>
                <Button variant="secondary" onClick={handleClose}>
                  Cancel Account Deletion
                </Button>
              </Modal.Footer>
            </Modal>
          </div>

        </div>
        </div>
      </div>
    </>
  )
}

export default SettingsPage
