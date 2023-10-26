import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from 'axios';
import './CSS/LogRegisterSet.css';

export const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email); // Do something with the email, like sending a reset password link
    };

    const sendResetLink = async () => {
        try {
            const response = await Axios.post("http://localhost:3001/forgotpassword", {
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
        <div className="forgot-password">
            <div className='container'>
                <h1 className='mt-3 text-center'>Welcome to SpendSmart</h1>
            </div>
            <div className="auth-form-container-forgot">
                <div className="text-center">
                    <img src="logowname.png" style={{ width: '150px' }} alt="logoTitle"></img>
                </div>
                <h2>Forgot Password</h2>
                <form className="forgot-form" onSubmit={handleSubmit}>
                    <label htmlFor="email">Email</label>
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        placeholder="Enter email address"
                        id="email"
                        name="email"
                    />
                    <button className='forgot-btn' onClick={sendResetLink}>Send Reset Link</button>
                </form>
                <button className="link-btn" onClick={() => navigate('/login')}>Remembered your password? <span>Log In Here</span></button>
            </div>
        </div>
    );
};
