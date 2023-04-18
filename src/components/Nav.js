import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Nav() {
    const navigate = useNavigate();
    const auth = localStorage.getItem('user');

    const logout = () => {
        localStorage.clear();
        navigate('/login');
    };

    return (
        <div className='App'>
            <ul className='nav-ul'>
                <img src="https://i.pinimg.com/originals/1c/54/f7/1c54f7b06d7723c21afc5035bf88a5ef.png" alt="logo" className='logo' />
                {auth ? (
                    <>
                        <li>
                            <Link to='/'>Products</Link>
                        </li>
                        <li>
                            <Link to='/add'>Add Products</Link>
                        </li>
                        <li>
                            <Link to='/update'>Update Products</Link>
                        </li>
                        <li>
                            <Link to='/profile'>Profile</Link>
                        </li>
                        <li>
                            <Link to='/login' onClick={logout}>
                                Logout ({JSON.parse(auth).name})
                            </Link>
                        </li>
                    </>
                ) : (
                    <ul className='nav-right'>
                        <li>
                            <Link to='/signup'>Signup</Link>
                        </li>
                        <li>
                            <Link to='/login'>Login</Link>
                        </li>
                    </ul>
                )}
            </ul>
        </div>
    );
}
