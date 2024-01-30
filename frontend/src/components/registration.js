import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const RegistrationForm = () => {
    const [values, setValues] = useState({
        name: '',
        country: '',
        password: '',
    });
    const [registerSucc, setRegisterSucc] = useState('');
    const [passwordError, setPasswordError] = useState('');
    

    const handleChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        // Password Pattern Validation
        // const passwordPattern = "^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$";

        // if (passwordPattern!==(event.target.password.value)) {
        //     setPasswordError("8 char 1 number, 1 letter, 1 symbol.");
        //     return; 
        // }
        // Password Pattern Validation

        axios.post('http://localhost:8081/register', values)
            .then(res => {
                setRegisterSucc(res.data.message);
            })
            .catch(err => console.log(err));
    };

    return (
        <div className="container mt-5">
            <h2>Registration Form</h2>
            {registerSucc && (
                <div>
                    <p>{registerSucc}</p>
                    <p><Link to="/login">Please login</Link></p>
                </div>
            )}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" name="name" placeholder="Enter your name" onChange={handleChange}  required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="country" className="form-label">Country</label>
                    <input type="text" className="form-control" id="country" name="country" placeholder="Enter your country" onChange={handleChange} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" placeholder="Enter your password" onChange={handleChange} required/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
};

export default RegistrationForm;
