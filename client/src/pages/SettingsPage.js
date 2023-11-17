import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import Navbar from "../components/Navbar";
import { useCookies } from "react-cookie";
import Axios from 'axios';

//needs testing for functionality
const API = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3001'

export const SettingsPage = () => {

   // cookies inputting
   const [cookies] = useCookies(['userID, firstName, lastName, email, password']);

   const userID = cookies.userID;
   const [data, setData] = useState([]);
 
   // just showing user information
   const fName = cookies.firstName;
   const lName = cookies.lastName;
   const userEmail = cookies.email;
   const userPass = cookies.password;

  const [id, setId] = useState('');
  const [email, setNewEmail] = useState('');
  const [pass, setNewPass] = useState('');
  // const [passConf, setNewPassConf] = useState('');

  //showing modals once interacted with
  const [showEmailEdit, setEmailEditShow] = useState(false);
  const handleEmailClose = () => setEmailEditShow(false);
  const handleEmailShow = (editEmailID, editOrigEmail) => {
    setId(editEmailID)
    setNewEmail(editOrigEmail)
    setEmailEditShow(true)
  }
  
  const [showPassEdit, setPassEditShow] = useState(false);
  const handlePassClose = () => setPassEditShow(false);
  const handlePassShow = (editPassID, editOrigPass) => {
    setId(editPassID)
    setNewPass(editOrigPass)
    setPassEditShow(true)
  }

  const [showDeleteAcc, setShowDeleteAcc] = useState(false);
  const handleDeleteClose = () => setShowDeleteAcc (false);
  const handleDeleteShow = (deleteUser) => {
    setId(deleteUser)
    setShowDeleteAcc(true)
  }

  useEffect(() => {
    Axios.get(API + "/users/" + userID).then(json => setData(json.data))
  }, [userID])

  const editEmail = async () => {
    try {
      const response = await Axios.put(API + "/email", {
        userID: userID,
        email: email
      })
      console.log(response)
      window.location.reload(true)
    } catch (error) {
      console.error('An error occurred: ', error)
    }
  }

  const editPassword = async () => {
    try {
      const response = await Axios.put(API + '/password', {
        userID: userID,
        pass: pass
      })
      console.log(response)
      window.location.reload(true)
    } catch (error) {
      console.error('An error occurred:', error)
    }
  }

  const deleteUser = async () => {
    try {
        const response = await Axios.delete(API + "/delete", {
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
              <label htmlFor="">Full Name:</label>
                  <p className="form-control border-secondary .bg-secondary">{fName} {lName}</p>
            </div>
            <p></p>
            <p></p>
            <div className="form-group">
              <label htmlFor="">Email:</label>
                <p className="form-control border-secondary fw-light">{userEmail}</p>
            </div>
            <div className="form-group">
                  <Button variant="outline-primary" onClick={handleEmailShow}>
                    Change Email
                  </Button>

                  <Modal
                    show={showEmailEdit}
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
                      <form onSubmit={editEmail}>
                        <label htmlFor="email">Email</label>
                        <input required='required'
                          type="email"
                          className="form-control"
                          value={email}
                          onChange={(e) => setNewEmail(e.target.value)} id="email"></input>
                      </form>
                      {/* <p className="label">Email</p>
                      <input 
                        value={newEmail}
                        onChange={(e) => setNewEmail(e.target.value)}
                        type="email"
                        name="newEmail"
                        placeholder="New Email Address"
                        className="form-control border-secondary fw-light"
                      /> */}
                    </Modal.Body>

                  <Modal.Footer>
                    {/* Needs to save changes */}
                    <button className="btn btn-warning-outline" onClick={handleEmailClose}>No, Cancel</button>
                    <Button variant="outline-success" onClick={() => editEmail}>Save Changes</Button>
                  </Modal.Footer>
                </Modal>
            </div>
            <p></p>
            <p></p>
            <div className="form-group">
              <label htmlFor="">Password:</label>
                <p className="form-control border-dark fw-light">{userPass}</p>
            </div>
            <div className="form-group">
                  <Button variant="outline-primary" onClick={handlePassShow}>
                    Change Password
                  </Button>

                  <Modal
                    show={showPassEdit}
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
                      <form onSubmit={editPassword}>
                        <label htmlFor="password">Password</label>
                        <input required='required'
                          type="password"
                          className="form-control"
                          value={pass}
                          onChange={(e) => setNewPass(e.target.value)} id="pass"
                        />
                      </form>
            
                      {/* <p className="label">Password</p>
                      <input 
                        type={newPass? 'password':'text'}
                        name="password"
                        placeholder="New Password"
                        value={newPass}
                        onChange={(e) => setNewPass(e.target.value)}
                        className="form-control border-secondary fw-light"
                      /> */}
                    </Modal.Body>

                    {/* <Modal.Body>
                    <p className="label">Confirm Password</p>
                      <input 
                        type={newPassConf? 'password':'text'}
                        name="password"
                        placeholder="Re-Enter New Password"
                        value={newPassConf}
                        onChange={(e) => setNewPassConf(e.target.value)}
                        className="form-control border-secondary fw-light"
                      />
                    </Modal.Body> */}
                  <Modal.Footer>

                    {/* Needs to save changes */}
                    <Button variant="outline-success" onClick={() => editPassword}>
                      Save Changes
                    </Button>
                  </Modal.Footer>
                </Modal>
            </div>
          </form>
            

          {/* // dealing with pop up to delete account */}
          <div className="mt-5">
            <Button variant="danger" onClick={handleDeleteShow}>
              Delete Account
            </Button>

            <Modal
              show={showDeleteAcc}
              onHide={handleDeleteClose}
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
                  onClick={() => deleteUser(id)} //***********added this line to see if it would work* ***********
                  to="/"
                >
                  Yes, Delete Account
                </Link>
                <Button variant="secondary" onClick={handleDeleteClose}>
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
