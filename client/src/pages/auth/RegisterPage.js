import React, { useState } from "react"
import '../../style/auth.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";
import Axios from 'axios'

const API = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3001'

export const Register = () => {

    const [email, setEmail] = useState('');
    const [pass, setPassword] = useState('');
    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email);
    }

    const register = async () => {
        try {
            const response = await Axios.post(API + "/register", {
                backFirst: firstname,
                backLast: lastname,
                backEmail: email,
                backPassword: pass
            });
            console.log(response); // Assuming that you want to log the response data
            navigate('/login');
        } catch (error) {
            // Handle any errors that might occur during the request
            console.error('An error occurred:', error);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-form">
                <div className="text-center">
                    <img style={{ width: 200 }} src="/assets/horizontalLogo.png" alt="logoTitle"></img>
                    <h2>Register</h2>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="form-group row">
                        <label for="firstName">First Name</label>
                        <input id="firstName" value={firstname} 
                            placeholder="First Name"
                            onChange={(e) => setFirstName(e.target.value)}
                            className="form-control"
                        />
                    </div>

                    <br/>

                    <div className="form-group row">
                        <label for="lastName">Last Name</label>
                        <input id="lastName" value={lastname} 
                            placeholder="Last Name"
                            onChange={(e) => setLastName(e.target.value)}
                            className="form-control"
                        />
                    </div>

                    <br/>

                    <div className="form-group row">
                        <label for="email">Email</label>
                        <input id="email" type="email" value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email Address"
                            className="form-control"
                        />
                    </div>

                    <br/>

                    <div className="form-group row">
                        <label for="password">Password</label>
                        <input id='password' type={pass ? 'password' : 'text'} value={pass}
                            name="password"
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            className="form-control"
                        />
                    </div>

                    <br/>

                    <div className="form-group row">
                        <button className='btn btn-success btn-block' onClick={register}>Register</button>
                    </div>
                </form>

                <div className="text-center">
                    <button className="btn btn-link" onClick={() => navigate('/login')}>Already have an account? <span>Log In Here</span></button>
                </div>
            </div>
        </div>
    )
}