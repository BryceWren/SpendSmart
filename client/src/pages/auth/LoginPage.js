import React, { useState } from "react"
import '../../style/auth.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";
import Axios from 'axios'
import { useCookies } from 'react-cookie';

const API = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3001'

export const Login = () => {

    const [, setCookie] = useCookies(['userID', 'firstName', 'lastName', 'email', 'password']);

    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [pass, setPassword] = useState('');

    //handle individual and combined submission fails
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email && !pass) {
            alert('Please enter your email and password.');
        } else if (!pass) {
            alert('Please enter your password.');
        } else if (!email) {
            alert('Please enter your email.');
        } else {
            await login();            
        }
    }

    const login = async () => {
        let response = null
        console.log("start login")
        try {
            response = await Axios.post(API + "/login", {
                backEmail: email,
                backPassword: pass
            })
        } catch (error) {
            response = error.response
            if (response.status !== 401 && response.status !== 423) {
                console.error('An error occurred:', error);
            }
        }

            if (response.status === 200) {
                setCookie('userID', response.data['id'], { path: '/' });
                setCookie('firstName', response.data['firstName'], { path: '/' });
                setCookie('lastName', response.data['lastName'], { path: '/' });
                setCookie('email', response.data['email'], { path: '/' });
                setCookie('password', response.data['password'], { path: '/' });

                console.log('Successfully logged in ' + email);
                navigate('/home');
            } else if (response.status === 423) {
                setCookie('email', email, { path: '/' });
                navigate('/verify');
            } else {
                alert("Account not found. Double check your credentials and try again.")
            }
    };

    return (
        <div className="auth-page">
            <div className="auth-form">
                <div className="text-center">
                    <img style={{ width: 200 }} src="/assets/horizontalLogo.png" alt="logoTitle"></img>
                    <h2>Log In</h2>
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

                    <br />

                    <div className="form-group row">
                        <label htmlFor="password">Password</label>
                        <input id='password' type={pass ? 'password' : 'text'} value={pass}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            className="form-control"
                        />
                    </div>

                    <br />

                    <div className="form-group row">
                        <button className='btn btn-success btn-block'>Login</button>
                    </div>
                </form>

                <div className="text-center">
                    <button className='btn btn-link' onClick={() => navigate('/forgotpassword')}>Forgot Password?</button>
                    <button className='btn btn-link' onClick={() => navigate('/register')}>Don't have an account? Register Here</button>
                </div>
            </div>
        </div>
    )
}