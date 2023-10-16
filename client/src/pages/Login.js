import React, { useState } from "react"
import './CSS/LogRegisterSet.css';
import { useNavigate } from "react-router-dom";
import Axios from 'axios'

export const Login = () => {

    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [pass, setPassword] = useState('');
    
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email);
        navigate('/home');
    }

    const login = async () => {
        try {
            const response = await Axios.post("http://localhost:3001/login", {
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

    return (
        <div className="login">
            <div className='container'>
                <h1 className='mt-3 text-center'>Welcome to SpendSmart</h1>
            </div>
            <div className="auth-form-container">
                <div className="text-center">
                    <img src="logoNav.png" style={{width: '150px'}} alt="logo"></img>
                </div>
                <h2>Log in</h2>
                <form className="login-form" onSubmit={handleSubmit}>
                    <label for="email">Email</label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email Address" id="email" name="email"/>
                    <label for="password">Password</label>
                    {/* hiding the password */}
                    {/* <input value={pass} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" id="password" name="password"/> */}
                    <input type={pass? 'password' : 'text'}
                        name="password"
                        id='password'
                        placeholder="Password"
                        value={pass}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button className='login-btn' onClick={login}>Login</button>
                </form>
                <button className='link-btn' onClick={() => navigate('/register')}>Don't have an account? Register Here</button>
            </div>
        </div>
    )
}