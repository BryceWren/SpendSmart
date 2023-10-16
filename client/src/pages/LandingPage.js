import { Link } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css';

export const LandingPage = () => {
    return (
        <div className='text-center'>
          <h1 className='mt-3'>Welcome to SpendSmart!</h1>
          <p className="mt-3">A comfortable platform to see all your transactions and financial presentations through one place.</p>
          
          <div className="ms-auto">
            <Link to="/login" className="btn btn-success">Login</Link>
            <Link to="/register" className="btn btn-outline-success">Register</Link>
          </div>
        </div>
    )
}
