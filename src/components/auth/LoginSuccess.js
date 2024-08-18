import React from 'react';
import { useNavigate } from 'react-router-dom';

const LoginSuccess = () => {
    const navigate = useNavigate();
    const loggedUser = JSON.parse(localStorage.getItem('loggedUser'));   

    return (
        <>
            <div className="container mt-5 text-center">
                <h2>Login Successful</h2>
                <p><b>Welcome</b> ! {loggedUser?.email}!</p>          
            </div>
        </>
    );
};

export default LoginSuccess;
