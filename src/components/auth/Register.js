import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirm_password: '',
    });

    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    
    const validateEmail = (email) => {
        return email.match(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          );
    };

    const validateForm = () => {
        let formErrors = {};

        if (!formData.name) {
            formErrors.name = 'Please Enter username.';
        }

        if (!formData.email) {
            formErrors.email = 'Please Enter email.';
        } else if (!validateEmail(formData.email)) {
            formErrors.email = 'Please enter a valid email address';
        }

        if (formData.password.length < 8) {
            formErrors.password = 'Password must be 8 characters in length';
        }

        if (!formData.confirm_password) {
            formErrors.confirm_password = 'Please Enter confirm password.';
        } else if (formData.password !== formData.confirm_password) {
            formErrors.confirm_password = 'Use same password.';
        }

        setErrors(formErrors);
        return Object.keys(formErrors).length === 0;
    };

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            let users = JSON.parse(localStorage.getItem('users')) || [];
            const userExists = users.some(user => user.email === formData.email);
            if (userExists) {
                setErrors({...errors, email: 'Email already exists'});
            }else{
                let { name, email, password } = formData;
                let user = {
                    id: Number(new Date()),
                    name: name,
                    email: email,
                    password: password
                }
                users.push(user);               
                localStorage.setItem('users', JSON.stringify(users));

                setFormData({
                    name: '',
                    email: '',
                    password: '',
                    confirm_password: '',
                });
                setErrors({});

                navigate('/register-success');
                
            }
        }
    };

    return (
        <>
        <div className="container mt-5">
            <h2>Register</h2>
            <form onSubmit={handleSubmit} noValidate>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Full Name</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="name" 
                        value={formData.name}
                        onChange={handleInputChange}
                    />
                    {errors.name && <div className="text-danger">{errors.name}</div>}
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input 
                        type="email" 
                        className="form-control" 
                        id="email" 
                        value={formData.email}
                        onChange={handleInputChange}
                    />
                    {errors.email && <div className="text-danger">{errors.email}</div>}
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control"  id="password" value={formData.password} onChange={handleInputChange} />
                    {errors.password && <div className="text-danger">{errors.password}</div>}
                </div>
                <div className="mb-3">
                    <label htmlFor="confirm_password" className="form-label">Confirm Password</label>
                    <input  type="password" className="form-control"  id="confirm_password"  value={formData.confirm_password}   onChange={handleInputChange}  />
                    {errors.confirm_password && <div className="text-danger">{errors.confirm_password}</div>}
                </div>
                <button type="submit" className="btn btn-primary">Register</button>
            </form>
        </div>
        </>
    );
};

export default Register;
