import { Link } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css';

export const LandingPage = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <img src="/assets/iconNavLogo.png" width="40" height="40" class="d-inline-block align-top" alt="" />

        <span class="navbar-brand mb-0 h1">
          SpendSmart
        </span>

        <ul class="navbar-nav ms-auto">
          <li className="nav-item">
            <Link to="/login" className="btn btn-success">Login</Link>
          </li>
          <li className="nav-item">
            <Link to="/register" className="btn btn-outline-success">Register</Link>
          </li>
        </ul>
      </nav>

      <div className='text-center'>
        <img src="/assets/horizontalLogo.png" width="60%" alt="SpendSmart Logo"/>
        <h1 className="mt-3">Making budgeting simple, so you can spend smarter!</h1>

        <div style={{"background-color": "#00BF63"}}>
          <h5 className="mt-3" style={{"color": "white"}}><img height="150" src="/assets/cards.png" alt="credit cards"/>Track all your accounts into one place.</h5>
        </div>

        <div style={{"background-color": "#541388"}}>
          <h5 className="mt-3" style={{"color": "white"}}>View your spending at a glance. <img height="150" src="/assets/chart.png" alt="pie chart"/></h5>
        </div>

        <div style={{"background-color": "#FF3369"}}>
          <h5 className="mt-3" style={{"color": "white"}}><img height="150" src="/assets/calendar.png" alt="calendar"/>Track recurring expenses and plan ahead.</h5>
        </div>

        
      </div>
    </div>


  )
}
