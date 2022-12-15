import React, { useState, useEffect } from 'react';
import { login } from './authSlice';
import { useDispatch, useSelector } from 'react-redux';

function Auth({ setUser }) {

    const dispatch = useDispatch();
    console.log(useSelector(state => state.auth))

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState([]);

    const userInfo = {
        username,
        password
    };

    function handleLogin(event) {
        event.preventDefault();
        dispatch(login(userInfo))
    };

    return(
        <div>
            <h1>Login</h1>
            <h3>Enter Username and Password</h3>
            <form id="loginForm" onSubmit={(event) => handleLogin(event)} >
                <input
                    type="text"
                    placeholder="Username"
                    onChange={(event) => setUsername(event.target.value)}
                    value={username}
                ></input>
                <input 
                    type="password"
                    placeholder="Password"
                    onChange={(event) => setPassword(event.target.value)}
                    value={password}
                ></input>
                <input type="submit" value="Login"></input>
            </form>
            <h4 className="error" >{error}</h4>
        </div>
    );
};

export default Auth;