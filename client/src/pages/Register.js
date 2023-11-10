import React, { useState } from "react"
import './CSS/LogRegisterSet.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'

import { useNavigate } from "react-router-dom";
import Axios from 'axios'

export const Register = () => {

    const [email, setEmail] = useState('');
    const [pass, setPassword] = useState('');
    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError]=useState(null);

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
       if (!email || !pass || !firstname || !lastname) {
        console.error("Please fill out all fields.");
       } else {
        register();
       }
    };

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
        };
    };

    return (
        <div className="register">
            <div className='container'>
                <h1 className='mt-3 text-center'>Welcome to SpendSmart</h1>
            </div>
            <div className="auth-form-container-register">
                <div className="text-center">
                    <img className='wideImg' src="logowname.png" alt="logoTitle"></img>
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
                  
                    <input type={showPassword ? "text" : "password"}
                        name="password"
                        id='password'
                        placeholder="Password"
                        value={pass}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                     <FontAwesomeIcon
                            icon={showPassword ? faEyeSlash : faEye}
                            style={{
                                position: "absolute",
                                left: "1165px",
                                top: "55%",
                                transform: "translateY(1575%)",
                                cursor: "pointer"
                            }}
                            onClick={() => setShowPassword(!showPassword)}
                        />

                    <button className='register-btn' onClick={register}>Register Account</button>
                </form>
                <button className="link-btn" onClick={() => navigate('/login')}>Already have an account? <span>Log In Here</span></button>
            </div>
        </div>
    )
}