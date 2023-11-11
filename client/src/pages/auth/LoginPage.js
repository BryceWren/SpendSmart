import React, { useState } from "react"
import '../../style/auth.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";
import Axios from 'axios'
import { useCookies } from 'react-cookie';


export const Login = () => {

    const [, setCookie] = useCookies(['userID', 'firstName', 'lastName', 'email', 'password']);

    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [pass, setPassword] = useState('');
    
    //handle individual and combined submission fails
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email && !pass) {
            alert('Please enter your email and password.');
        } else if (!pass) {
            alert('Please enter your password.');
        }  else if (!email) {
            alert('Please enter your email.');
        } else {
            login();
        }
    }

    const login = async () => {
        try {
            const response = await Axios.post("http://localhost:3001/login", {
                backEmail: email,
                backPassword: pass
            });

            if (response.status === 200)
            {
                setCookie('userID', response.data['id'], { path: '/' });
                setCookie('firstName', response.data['firstName'], { path: '/' });
                setCookie('lastName', response.data['lastName'], { path: '/' });
                setCookie('email', response.data['email'], { path: '/' });
                setCookie('password', response.data['password'], { path: '/' });

                console.log('Successfully logged in ' + email);
                navigate('/home');
            } else {
                // TODO : incorrect login
            }
        } catch (error) {
            console.error('An error occurred:', error);
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
                        <label for="email">Email</label>
                        <input id="email" type="email" value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email Address"
                            className="form-control"
                        />
                    </div>

                    <br/>

                    <div className="form-group row">
                        <label for="password">Password</label>
                        <input id='password' type={pass ? 'password' : 'text'} value={pass}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            className="form-control"
                        />
                    </div>

                    <br/>

                    <div className="form-group row">
                        <button className='btn btn-success btn-block' onClick={login}>Login</button>
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