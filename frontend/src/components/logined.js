import React, { useState,useEffect} from 'react';
import axios from 'axios';

const LoginForm = () => {
    const [values, setValues] = useState({
        name: '',
        password: '',
    });
    const [loginSucc, setLoginSucc] = useState('');
    const [loginFailed, setLoginFailed] = useState('');

    const handleChange = (event) => {
        setValues(prev => ({...prev, [event.target.name]: event.target.value}));
    };


    useEffect(() => {
        if (loginFailed) {
            const timeout = setTimeout(() => {
                setLoginFailed(prev => prev.slice(0, -1));
            }, 200);
            return () => clearTimeout(timeout);
        }
    }, [loginFailed]);

    const handleSubmit = (event) => {
      event.preventDefault();
      axios.post('http://localhost:8081/login', values)
          .then(res => {
            setLoginSucc(res.data.message);
          })
          .catch(error => {
            console.log(error.response);
            setLoginFailed(error.response.data.error);
            // setTimeout(() => {
            //     setLoginFailed('');
            // }, 5000);
          });
  };


    return (
        <div className="container mt-5">
            <h2 className="loginHeader">login Form</h2>
            <p>{loginSucc}</p>
            <p>{loginFailed}</p>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" name="name" placeholder="Enter your name" onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" placeholder="Enter your password" onChange={handleChange} />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
};

export default LoginForm;

