import React, { useState } from "react"
import './auth.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";
import Axios from 'axios'


const API = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3001'

export const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email); // Do something with the email, like sending a reset password link
        sendResetLink();
    };

    const sendResetLink = async () => {
        try {
            const response = await Axios.post(API + "/forgotpassword", {
                email: email
            });
            console.log(response); // Log the response data
            navigate('/login'); // Redirect to the login page after submitting the form
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
                    <h2>Forgot Password</h2>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="form-group row">
                        <label htmlFor="email">Email</label>
                        <input id="email" type="email" value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email Address"
                            className="form-control"
                        />
                    </div>

                    <br/>

                    <div className="form-group row">
                        <button className='btn btn-success btn-block' onClick={sendResetLink}>Send Reset Link</button>
                    </div>
                </form>

                <div className="text-center">
                    <button className="btn btn-link" onClick={() => navigate('/login')}>Remembered your password? <span>Log In Here</span></button>
                </div>
            </div>
        </div>
    );
};
