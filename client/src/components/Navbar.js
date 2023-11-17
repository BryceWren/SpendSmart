import React from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie';

const Navbar = () => {

  const [, , removeCookie] = useCookies(['userID', 'firstName', 'lastName', 'email', 'password']);

  const navigate = useNavigate();

  const signOut = (() => {
    
    removeCookie('userID',{path:'/'})
    removeCookie('firstName',{path:'/'})
    removeCookie('lastName',{path:'/'})
    removeCookie('email',{path:'/'})
    removeCookie('password',{path:'/'})

    console.log('Successfully signed out')
    navigate('/')

  })

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <img src="/assets/iconNavLogo.png" width="40" height="40" className="d-inline-block align-top" alt="" />

      <span className="navbar-brand mb-0 h1">
        SpendSmart
      </span>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarNavDropdown">
        <ul className="navbar-nav">
          <li className="nav-item active">
            <a className="nav-link" href="/home">
              Home
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/transactions">
              Transactions
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/budget">
              Budget
            </a>
          </li>
        </ul>

        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            <a className="nav-link" href="/settings">
              Account
            </a>
          </li>
          <li className="nav-item">
            <button className="btn btn-success-outline" onClick={signOut}>Sign Out</button>
            {/* <a className="nav-link" href="/">
                Sign Out
              </a> */}
          </li>
        </ul>

      </div>
    </nav>
  );
};

export default Navbar;