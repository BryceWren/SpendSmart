import React, { useState } from "react"
import './CSS/LogRegisterSet.css';
import { useNavigate } from "react-router-dom";
import Axios from 'axios'
import { useCookies } from 'react-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'


export const Login = () => {

    const [, setCookie] = useCookies(['userID', 'firstName', 'lastName', 'email', 'password']);

    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [pass, setPassword] = useState('');
    const[showPassword, setShowPassword] = useState(false);
    const [error, setError]=useState(null);
    
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
        <div className="login">
            <div className='container'>
                <h1 className='mt-3 text-center'>Welcome to SpendSmart</h1>
            </div>
            <div className="auth-form-container">
                <div className="text-center">
                    <img className='wideImg' src="logowname.png" alt="logoTitle"></img>
                </div>
                <h2>Login</h2>
                <form className="login-form" onSubmit={handleSubmit}>
                    <label for="email">Email</label>
                    <input value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        type="email" 
                        placeholder="Email Address" 
                        id="email" 
                        name="email"
                    />
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
                                left: "1175px",
                                top: "55%",
                                transform: "translateY(105%)",
                                cursor: "pointer"
                            }}
                            onClick={() => setShowPassword(!showPassword)}
                        />
                        
                    


                    <button className='login-btn' onClick={login}>Login</button>
                </form>
                <button className='link-btn' onClick={() => navigate('/forgotpassword')}>Forgot Password?</button>
                <button className='link-btn' onClick={() => navigate('/register')}>Don't have an account? Register Here</button>
            </div>
        </div>
    )
}