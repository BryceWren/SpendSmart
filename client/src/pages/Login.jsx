import React, { useState } from "react"
import './CSS/LoginSet.css'
import { useNavigate } from "react-router-dom";
import Axios from 'axios'

export const Login = (props) => {

    const [email, setEmail] = useState('');
    const [pass, setPassword] = useState('');
    //const [loginStatus, setLoginStatus] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email);
    }
    const login = async () => {
        try {
            const response = await Axios.post("http://localhost:3001/", {
                backEmail: email,
                backPassword: pass
            });
            console.log(response);
            //setLoginStatus(response.data); // Assuming that you want to log the response data
        } catch (error) {
            // Handle any errors that might occur during the request
            console.error('An error occurred:', error);
        }
    };

    const navigate = useNavigate();

    return (
        <div className="login">
            <div className="auth-form-container">
                <h2>Log in</h2>
                <form className="login-form" onSubmit={handleSubmit}>
                    <label for="email">Emaail</label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email Address" id="email" name="email"/>
                    <label for="password">Password</label>
                    <input value={pass} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" id="password" name="password"/>
                    <button onClick={login}type="submit">Log in</button>
                </form>
                <button className="link-btn" onClick={() => navigate('/register')}>Don't have an account? Register here</button>
            </div>


            
        </div>
    )
}