import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import Navbar from "../components/Navbar";
import { useCookies } from "react-cookie";

// need to be able to save new password, email changes to acccount
// deletion???

// work more on password field and recognition of the same password being entered

export const SettingsPage = () => {
  
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showPass, setPassShow] = useState(false);

  const handlePassClose = () => setPassShow(false);
  const handlePassShow = () => setPassShow(true);

  const [showEmail, setEmailShow] = useState(false);

  const handleEmailClose = () => setEmailShow(false);
  const handleEmailShow = () => setEmailShow(true);

  const [cookies, setCookie] = useCookies(['firstName, lastName, email, password']);
  const fName = cookies.firstName;
  const lName = cookies.lastName;
  const userEmail = cookies.email;
  const userPass = cookies.password;

  return (
    <>
      <div className="nav-bar">
        <Navbar/>
        <div className="container">
          <h1 className="mt-5">Check out your account, {fName}!</h1>
          
          {/* <div className="col-sm"> */}
          {/* <p className="text-left fw-medium">
            Full Name:
            <p className="fw-light">{fName} {lName}</p>
          </p>
          <div className="text-left fw-medium">
            Email:
          </div>
            <p className="fw-light">{userEmail}</p>
          <div className="text-left fw-medium">
            Password: 
          </div> */}

          <form>
            <p></p>
            <div className="form-group">
              <label for="">Full Name:</label>
                <p className="fw-light">{fName} {lName}</p>
            </div>
            <p></p>
            <p></p>
            <div className="form-group">
              <label for="">Email:</label>
                <p className="fw-light">{userEmail}</p>
            </div>
            <div className="form-group">
              {/* <button className="btn btn-outline-primary float-right"
                  type="submit">
                    Change Email
                  </button> */}
                  <Button variant="outline-primary" onClick={handleEmailShow}>
                    Change Email
                  </Button>

                  <Modal
                    show={showEmail}
                    onHide={handleEmailClose}
                    backdrop="static"
                    keyboard={true}
                  >
                    <Modal.Header closeButton>
                      <Modal.Title>Email Change</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                      Use the below text fields to insert your new email address that you would like to use for your account. To successfully complete
                      changes click "Save Changes."
                    </Modal.Body>

                    <Modal.Body>
                      <label for="">Enter Your Email Address:</label>
                      <input className="form-control"
                        type="text"
                        placeholder="New Email Address"
                      >

                      </input>
                    </Modal.Body>

                  <Modal.Footer>
                    {/* <Button variant="danger" onClick={to="/"}>Permenantly Delete Account</Button> */}
                    <Button variant="outline-success" onClick={handleEmailClose}>
                      Save Changes
                    </Button>
                  </Modal.Footer>
                </Modal>
            </div>
            <p></p>
            <p></p>
            <div className="form-group">
              <label for="">Password:</label>
                <p className="fw-light">{userPass}</p>
            </div>
            <div className="form-group">
              {/* <button className="btn btn-outline-primary float-right"
                  type="submit">
                    Change Password
                  </button> */}
                  <Button variant="outline-primary" onClick={handlePassShow}>
                    Change Password
                  </Button>

                  <Modal
                    show={showPass}
                    onHide={handlePassClose}
                    backdrop="static"
                    keyboard={true}
                  >
                    <Modal.Header closeButton>
                      <Modal.Title>Password Change</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                      Use the below text fields to insert your new password that you would like to use for your account. To successfully complete
                      changes click "Save Changes."
                    </Modal.Body>

                    <Modal.Body>
                      <label for="">Enter Your Password:</label>
                      <input className="form-control"
                        type="text"
                        placeholder="New Password"
                      >

                      </input>
                    </Modal.Body>

                    <Modal.Body>
                      <label for="">Re-Enter New Password:</label>
                      <input className="form-control"
                        type="text"
                        placeholder="Re-Enter Password"
                      >

                      </input>
                    </Modal.Body>

                  <Modal.Footer>
                    {/* <Button variant="danger" onClick={to="/"}>Permenantly Delete Account</Button> */}
                    <Button variant="outline-success" onClick={handlePassClose}>
                      Save Changes
                    </Button>
                  </Modal.Footer>
                </Modal>
            </div>
          </form>
            

          {/* // dealing with pop up to delete account */}
          <div className="mt-5">
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
                  className="btn btn-outline-danger"
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
    </>
  )
}

export default SettingsPage
