import React, { useState } from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import { Link } from "react-router-dom"
import { Button, Modal } from "react-bootstrap"
import Navbar from "../components/Navbar"
import { useCookies } from "react-cookie"
import Axios from 'axios'

//needs testing for functionality
const API = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3001'

export const SettingsPage = () => {

  // cookies (global)
  const [cookies, setCookie, removeCookie] = useCookies(['userID', 'firstName', 'lastName', 'email', 'password'])
  const userID = cookies.userID
  const fName = cookies.firstName
  const lName = cookies.lastName
  const userEmail = cookies.email

  // variable (local)
  const [email, setNewEmail] = useState('')
  const [currPass, setCurrPass] = useState('')
  const [pass1, setNewPass1] = useState('')
  const [pass2, setNewPass2] = useState('')

  //showing modals once interacted with
  const [showEmailEdit, setEmailEditShow] = useState(false)
  const handleEmailClose = () => setEmailEditShow(false)
  const handleEmailShow = () => setEmailEditShow(true)

  const [showPassEdit, setPassEditShow] = useState(false)
  const handlePassClose = () => setPassEditShow(false)
  const handlePassShow = () => setPassEditShow(true)

  const [showDeleteAcc, setShowDeleteAcc] = useState(false)
  const handleDeleteClose = () => setShowDeleteAcc(false)
  const handleDeleteShow = () => setShowDeleteAcc(true)

  // backend API
  const editEmail = async () => {
    try {
      const response = await Axios.put(API + "/user/email", {
        userID: userID,
        email: email
      })
      console.log(response)
      setCookie("email", email)
      window.location.reload(true)
    } catch (error) {
      console.error('An error occurred:', error)
    }
  }

  const editPassword = async () => {
    console.log("edit password start")
    if (pass1 !== pass2) {
      console.log("no match")
      alert("Passwords do not match. Please try again.")
    } else {
      console.log("match")
      try {
        const response = await Axios.put(API + '/user/pass', {
          userID: userID,
          pass: currPass,
          new: pass1
        })
        console.log(response)
        setCookie("password", response.data)
        window.location.reload(true)
      } catch (error) {
        console.error('An error occurred:', error)
      }
    }
    console.log("password changed.")
  }

  const deleteUser = async () => {
    try {
      const response = await Axios.delete(API + "/delete", {
        data: { userID: userID }
      })
      console.log(response)
      removeCookie('userID', { path: '/' })
      removeCookie('firstName', { path: '/' })
      removeCookie('lastName', { path: '/' })
      removeCookie('email', { path: '/' })
      removeCookie('password', { path: '/' })
      window.location.reload(true)

    } catch (error) {
      console.error('An error occurred:', error)
    }
  }

  return (
    <div>
      <Navbar />

      <div className="container">
        <h3 className='mt-3'>Account Settings</h3>

        <b>Full Name</b>
        <p>{fName} {lName}</p>

        <b>Email</b>
        <p>{userEmail}</p>

        <button className='btn btn-outline-primary btn-block' onClick={handleEmailShow}>Change Email</button>
        <br />
        <br />
        <button className='btn btn-outline-primary btn-block' onClick={handlePassShow}>Change Password</button>
        <br />
        <br />
        <button className='btn btn-danger btn-block' onClick={handleDeleteShow}>Delete Account</button>

        {/* Pop Up to Change Email */}
        <Modal show={showEmailEdit} onHide={handleEmailClose} backdrop="static" keyboard={true} >
          <Modal.Header closeButton>
            <Modal.Title>Change Email</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <p>
              Use the below text field to insert your new email address that you would like to use for your account. To successfully complete changes, click "Save Changes."
            </p>

            <form>
              <label htmlFor="email">Email</label>
              <input required='required'
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setNewEmail(e.target.value)} id="email"></input>
            </form>
          </Modal.Body>

          <Modal.Footer>
            <button className="btn btn-warning-outline" onClick={handleEmailClose}>No, Cancel</button>
            <Button variant="outline-success" onClick={editEmail}>Save Changes</Button>
          </Modal.Footer>
        </Modal>

        {/* Pop Up to Change Password */}
        <Modal show={showPassEdit} onHide={handlePassClose} backdrop="static" keyboard={true} >
          <Modal.Header closeButton>
            <Modal.Title>Change Password</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <p>
              Use the below text fields to insert your new password that you would like to use for your account. To successfully complete changes, click "Save Changes."
            </p>

            <form>
              <label htmlFor="curr">Current Password</label>
              <input id='curr' type={currPass ? 'password' : 'text'} value={currPass}
                onChange={(e) => setCurrPass(e.target.value)}
                placeholder="Enter Current Password"
                className="form-control"
              />

              <label htmlFor="new1">New Password</label>
              <input id='new1' type={pass1 ? 'password' : 'text'} value={pass1}
                onChange={(e) => setNewPass1(e.target.value)}
                placeholder="New Password"
                className="form-control"
              />

              <label htmlFor="new2">Confirm New Password</label>
              <input id='new2' type={pass2 ? 'password' : 'text'} value={pass2}
                onChange={(e) => setNewPass2(e.target.value)}
                placeholder="Confirm New Password"
                className="form-control"
              />
            </form>
          </Modal.Body>

          <Modal.Footer>
            <button className="btn btn-warning-outline" onClick={handlePassClose}>No, Cancel</button>
            <Button variant="outline-success" onClick={editPassword}>Save Changes</Button>
          </Modal.Footer>
        </Modal>

        {/* Pop Up to Delete Account */}
        <Modal show={showDeleteAcc} onHide={handleDeleteClose} backdrop="static" keyboard={false} >
          <Modal.Header closeButton>
            <Modal.Title>Deleting Account</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            Deleting your account will delete your access and all your information on this site. This action can not be undone.
          </Modal.Body>

          <Modal.Footer>
            <Link className="btn btn-outline-danger" role="button" onClick={deleteUser} to="/" >
              Yes, Delete Account
            </Link>
            <Button variant="secondary" onClick={handleDeleteClose}>
              Cancel Account Deletion
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  )
}

export default SettingsPage
