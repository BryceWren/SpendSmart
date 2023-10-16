import React, { useEffect, useState } from "react"
import './CSS/RegisterSet.css'
import { useNavigate } from "react-router-dom";
import Axios from 'axios'

export const Register = (props) => {

    const [first, setFirst] = useState('');
    const [last, setLast] = useState('');
    const [email, setEmail] = useState('');
    const [pass, setPassword] = useState('');

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(first);
        console.log(last);
        console.log(email);
        console.log(pass);
    }

    const register = async () => {
        try {
            const response = await Axios.post("http://localhost:3001/register", {
                backFirst: first,
                backLast: last,
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
            <div className="auth-form-container">
                <h2>Register</h2>
                <form className="register-form" onSubmit={handleSubmit}>
                    <label for="first">First Name</label>
                    <input value={first} onChange={(e) => setFirst(e.target.value)} type="first" placeholder="John" id="first" name="first"/>

                    <label for="last">Last Name</label>
                    <input value={last} onChange={(e) => setLast(e.target.value)} type="last" placeholder="Doe" id="last" name="last"/>

                    <label for="email">Email</label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="john.doe@email.com" id="email" name="email"/>

                    <label for="password">Password</label>
                    <input value={pass} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" id="password" name="password"/>

                    <button onClick={register}type="submit">Register</button> 
                </form>

                <button className="link-btn" onClick={() => navigate('/login')}>Already have an account? Login</button>
            </div>
        </div>
    )
}