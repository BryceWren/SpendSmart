import React, { useState } from "react"
import './auth.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";
import Axios from 'axios'

const API = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3001'

export const VerifyEmail = () => {

    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault()
        sendVerifyLink();
    };

    const sendVerifyLink = async () => {
        console.log(email)
        try {
            await Axios.post(API + "/resendVerify", {
                email: email
            });
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
                    <h2>One Last Step...</h2>
                    <p>Before you can access your account, we need to verify your email. Check your inbox for a verification email from SpendSmart.</p>
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
                        <button className='btn btn-success btn-block'>Resend Verification Email</button>
                    </div>
                </form>

                <div className="text-center">
                    <button className="btn btn-link" onClick={() => navigate('/login')}>Already verified? <span>Log In Here</span></button>
                </div>
            </div>
        </div>
    );
};
