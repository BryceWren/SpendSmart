import React, { useEffect, useState } from "react"
import './CSS/RegisterSet.css'
import Axios from 'axios'

export const Register = (props) => {


    const [email, setEmail] = useState('');
    const [pass, setPassword] = useState('');


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email);
        console.log(pass);
    }

    const register = async () => {
        try {
            const response = await Axios.post("http://localhost:3001/register", {
                backEmail: email,
                backPassword: pass
            });
            console.log(response); // Assuming that you want to log the response data
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
                    {/* <label>Name</label>
                    <input value={name} onChange={(e) => setName(e.target.value)}name="name" id="name" placeholder="Type your name here"/> */}
                    <label for="email">Email</label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email Address" id="email" name="email"/>
                    <label for="password">Password</label>
                    <input value={pass} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" id="password" name="password"/>
                    <button onClick={register}type="submit">Register</button> 
                   {/*added on click={register to get the register function to talk to the backend line 62 }*/}
                </form>
                <button className="link-btn" onClick={() => props.onFormSwitch('login')}>Already have an account? Log-in here</button>
            </div>
        </div>
    )
}