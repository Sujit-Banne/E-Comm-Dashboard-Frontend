import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function Login() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [token, setToken] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate()

    useEffect(() => {
        const auth = localStorage.getItem('user')
        if (auth) {
            navigate('/')
        }
    })

    const handleLogin = (event) => {
        event.preventDefault(); // add this line to prevent page refresh

        if (
            email.trim() !== '' &&
            password.trim() !== '' &&
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)
        ) {
            axios
                .post('https://sujit-e-comm-dashboard-backend.onrender.com/login', {
                    email: email,
                    password: password,
                })
                .then((res) => {
                    console.log(res);
                    setToken(res.data.token);
                    const data = {
                        token: res.data.token, // update the token here
                    };
                    localStorage.setItem('user', JSON.stringify(res.data));
                    localStorage.setItem('token', JSON.stringify(data));
                    navigate('/');
                })
                .catch((err) => {
                    console.log(err);
                    if (err.response.status === 404) {
                        setError('User not found');
                    } else {
                        setError('Invalid credentials. Please try again.');
                    }
                });
        } else {
            setError('Please enter valid details');
        }
    }

    return (
        <div className='login'>
            <h1>Login</h1>

            <input
                className='inputBox'
                type="email"
                placeholder='Enter Email'
                required
                onChange={(e) => setEmail(e.target.value)}
                value={email}
            />

            <input
                className='inputBox'
                type="password"
                placeholder='Enter Password'
                required
                onChange={(e) => setPassword(e.target.value)}
                value={password}
            />
            {error && <div>{error}</div>}
            <button
                className="appButton"
                type="button"
                onClick={handleLogin}
            >
                Login
            </button>
        </div>
    )
}
