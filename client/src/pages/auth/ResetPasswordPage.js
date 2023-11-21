import React, { useState } from "react"
import '../../style/auth.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate, useParams } from "react-router-dom";
import Axios from 'axios'

const API = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3001'

export const Reset = () => {
    const { email } = useParams(); //TODO: pull from url or something
    const [pass, setPass] = useState('');
    const [confPass, setConfPass] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        resetPassword();

        //TO DO
    };

    const resetPassword = async () => {
        try {
            console.log("im in resetPassword front end")
            const response = await Axios.put(API + "/resetpassword", {
                email: email,
                pass: pass
            });
            console.log(response); // Log the response data
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
                    <h2>Reset Password</h2>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="form-group row">
                        <label htmlFor="email">Email: </label>
                        <input id="email" type="email" value={email}
                            className="form-control-plaintext text-center"
                        />
                    </div>

                    <br/>

                    <div className="form-group row">
                        <label htmlFor="pass">New Password</label>
                        <input id='pass' type={pass ? 'password' : 'text'} value={pass}
                            onChange={(e) => setPass(e.target.value)}
                            placeholder="Enter New Password"
                            className="form-control"
                        />
                    </div>

                    <br/>

                    <div className="form-group row">
                        <label htmlFor="conf">Confirm Password</label>
                        <input id='conf' type={pass ? 'password' : 'text'} value={confPass}
                            onChange={(e) => setConfPass(e.target.value)}
                            placeholder="Reenter New Password"
                            className="form-control"
                        />
                    </div>

                    <br/>

                    <div className="form-group row">
                        <button className='btn btn-success btn-block' onClick={resetPassword}>Reset Password</button>
                    </div>
                </form>
            </div>
        </div>
    );
};
