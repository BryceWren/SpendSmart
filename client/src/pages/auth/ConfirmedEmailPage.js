import React, { useEffect } from "react"
import '../../style/auth.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate, useParams } from "react-router-dom";
import Axios from 'axios'

const API = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3001'

export const Confirmation = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    var called = false;

    const confirmEmail = async () => {
        
        try {
            if (!called) {
                called = true;
                console.log("calling api")
                await Axios.put(API + "/confirmation/" + token)
                console.log("email successfully confirmed")
            }
        } catch (error) {
            console.error('An error occurred during email verification:', error)
        }
    };

    useEffect(() => { 
        confirmEmail()
    })
    

    return (
        <div className="auth-page">
            <div className="auth-form">
                <div className="text-center">
                    <img style={{ width: 200 }} src="/assets/horizontalLogo.png" alt="logoTitle"></img>
                    <h2>Email Verified</h2>
                    <p> Thanks for verifing your email. You are now ready to use SpendSmart!</p>
                
                    <button className='btn btn-success btn-block' onClick={() => navigate('/login')}>Log In Now</button>
                </div>
            </div>
        </div>
    );
};
