import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function SignUp() {


    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('');
    const navigate = useNavigate()

    useEffect(() => {
        const auth = localStorage.getItem('user')
        if (auth) {
            navigate('/')
        }
    })

    const collectData = async () => {
        console.log(name, email, password);
        if (!password) {
            setError('Password field cannot be empty.');
            return;
        }
        try {
            const response = await axios.post('https://sujit-e-comm-dashboard-backend.onrender.com/signup', {
                name,
                email,
                password,
            });
            console.log(response.data);
            localStorage.setItem('user', JSON.stringify(response))
            if (response.status === 201) {
                navigate('/');
            }
        } catch (err) {
            if (err.response && err.response.data && err.response.data.message) {
                setError(err.response.data.message);
            } else {
                setError('An error occurred. Please try again later.');
            }
        }
    }


    return (
        <div className='register'>
            <h1>Register</h1>
            <input
                className='inputBox'
                type="text"
                placeholder='Enter Name'
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />

            <input
                className='inputBox'
                type="email"
                placeholder='Enter Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />

            <input
                className='inputBox'
                type="password"
                placeholder='Enter Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            {error && <div>{error}</div>}
            <button
                className="appButton"
                type="button"
                onClick={collectData}
            >
                Sign Up
            </button>
        </div>
    )
}
