// import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export const LandingPage = () => {
  
  // const navigate = useNavigate(); 

    return (
      <div className='container'>
        <h1 className='mt-3'>Welcome to SpendSmart</h1>
        <br />
        <Link to="/login" className="btn btn-success">Login</Link>
        <Link to="/register" className="btn btn-outline-success">Register</Link>
        {/* <button className="btn btn-success" onClick={() => navigate('/login')}>Login</button> */}
        {/* <button className="btn btn-outline-success" onClick={() => navigate('/register')}>Register</button> */}
      </div>
    )
}