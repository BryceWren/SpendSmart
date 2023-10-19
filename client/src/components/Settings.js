import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";

// using bootstrap to create a button to which will navigate to login screen

const Profile = () => {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  return (
    // handling button click to go to login page
    <>

      {/* // handling button click to go to login page */}
      {/* <div className="ms-auto">
        <Link
          className="btn btn-secondary"
          role="button"
          to="/login"
        >
          Logout
        </Link>
      </div> */}

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
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            {/* <Button variant="danger" onClick={to="/"}>Permenantly Delete Account</Button> */}
            <Link
              className="btn btn-danger"
              role="button"
              to="/"
            >
              Yes, Delete Account
            </Link>
          </Modal.Footer>
        </Modal>
      </div>

      </>
    
  )


}

export default Profile
