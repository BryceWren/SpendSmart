import React from "react";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <img src="/logoNav.png" width="40" height="40" class="d-inline-block align-top" alt="" />

      <span class="navbar-brand mb-0 h1">
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
          {/* <li className="nav-item">
            <a className="nav-link" href="/calendar">
              Calendar
            </a>
          </li> */}
        </ul>

        <ul class="navbar-nav ms-auto">
            <li className="nav-item">
              <a className="nav-link" href="/settings">
                Settings
              </a>
            </li>            
            <li className="nav-item">
              <a className="nav-link" href="/">
                Sign Out
              </a>
            </li>
          </ul>

      </div>
    </nav>
  );
};

export default Navbar;