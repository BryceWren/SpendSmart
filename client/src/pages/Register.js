import React, { useState } from "react"
// import './CSS/RegisterSet.css'
import './CSS/LogRegisterSet.css';

import { useNavigate } from "react-router-dom";
import Axios from 'axios'

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
            const response = await Axios.post("http://localhost:3001/register", {
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
        <div className="register">
            <div className='container'>
                <h1 className='mt-3 text-center'>Welcome to SpendSmart</h1>
            </div>
            <div className="auth-form-container-register">
                <div className="text-center">
                    <img src="logoNav.png" style={{width: '150px'}} alt="logo"></img>
                </div>
                <h2>Register</h2>
                <form className="register-form" onSubmit={handleSubmit}>
                    <label>First Name</label>
                    <input value={firstname} onChange={(e) => setFirstName(e.target.value)}name="firstname" id="firstname" placeholder="First Name"/>
                    <label>Last Name</label>
                    <input value={lastname} onChange={(e) => setLastName(e.target.value)}name="lastname" id="lastname" placeholder="Last Name"/>
                    <label for="email">Email</label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Enter email address" id="email" name="Email"/>
                    <label for="password">Password</label>
                    <input value={pass} onChange={(e) => setPassword(e.target.value)} type="pass" placeholder="Enter password" id="password" name="Password"/>

                    <button className='register-btn' onClick={register}>Register Account</button>
                </form>
                <button className="link-btn" onClick={() => navigate('/login')}>Already have an account? <span>Log In Here</span></button>
            </div>
        </div>
    )
}