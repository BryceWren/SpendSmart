import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import Navbar from "../components/Navbar";
import { useCookies } from "react-cookie";
import Axios from 'axios';
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

  const [newEmail, setNewEmail] = useState('');
  const [newPass, setNewPass] = useState('');
  const [newPassConf, setNewPassConf] = useState('');

  const [cookies, setCookie] = useCookies(['userID, firstName, lastName, email, password']);

  const fName = cookies.firstName;
  const lName = cookies.lastName;
  const userEmail = cookies.email;
  const userPass = cookies.password;
  const userID = cookies.userID


  const deleteUser = async () => {
    try {
        const response = await Axios.delete("http://localhost:3001/delete", {
          data: { userID: userID }
        })
        console.log(response)
        
    } catch (error) {
        console.error('An error occurred:', error)
    }
}

  return (
    <>
      <div className="nav-bar">
        <Navbar/>
        <div className="container">
          <h1 className="mt-5">Check out your account, {fName}!</h1>
          <form>
            <p></p>
            <div className="form-group">
              <label for="">Full Name:</label>
                  <p className="form-control border-secondary .bg-secondary">{fName} {lName}</p>
            </div>
            <p></p>
            <p></p>
            <div className="form-group">
              <label for="">Email:</label>
                <p className="form-control border-secondary fw-light">{userEmail}</p>
            </div>
            <div className="form-group">
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
                      Use the below text field to insert your new email address that you would like to use for your account. To successfully complete
                      changes click "Save Changes."
                    </Modal.Body>

                    <Modal.Body>
                      <p className="label">Email</p>
                      <input 
                        value={newEmail}
                        onChange={(e) => setNewEmail(e.target.value)}
                        type="email"
                        name="newEmail"
                        placeholder="New Email Address"
                        className="form-control border-secondary fw-light"
                      />
                    </Modal.Body>

                  <Modal.Footer>
                    {/* Needs to save changes */}
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
                <p className="form-control border-dark fw-light">{userPass}</p>
            </div>
            <div className="form-group">
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
                      <p className="label">Password</p>
                      <input 
                        type={newPass? 'password':'text'}
                        name="password"
                        placeholder="New Password"
                        value={newPass}
                        onChange={(e) => setNewPass(e.target.value)}
                        className="form-control border-secondary fw-light"
                      />
                    </Modal.Body>

                    <Modal.Body>
                    <p className="label">Confirm Password</p>
                      <input 
                        type={newPassConf? 'password':'text'}
                        name="password"
                        placeholder="Re-Enter New Password"
                        value={newPassConf}
                        onChange={(e) => setNewPassConf(e.target.value)}
                        className="form-control border-secondary fw-light"
                      />
                    </Modal.Body>
                  <Modal.Footer>

                    {/* Needs to save changes */}
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
                  onClick={deleteUser} //***********added this line to see if it would work* ***********
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
