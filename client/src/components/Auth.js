import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signUp, login } from '../features/users/usersSlice';

function Auth() {

    const dispatch = useDispatch();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState([]);
    const [newUsername, setNewUsername] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [newEmail, setNewEmail] = useState("");
    const [newFirstName, setNewFirstName] = useState("");
    const [newLastName, setNewLastName] = useState("");

    function handleLogin(event) {
        event.preventDefault();
        const userInfo = {
            username,
            password
        };
        dispatch(login(userInfo));
    };

    function handleClickSignUp() {
        const form = document.getElementById('signUpForm');
        form.hidden = false;
    }

    function handleSignUp(event) {
        event.preventDefault();
        const newUserInfo = {
            username: newUsername,
            password: newPassword,
            password_confirmation: confirmNewPassword,
            first_name: newFirstName,
            last_name: newLastName,
            email: newEmail
        };
        dispatch(signUp(newUserInfo));
        setNewUsername("");
        setNewPassword("");
        setConfirmNewPassword("");
        setNewFirstName("");
        setNewLastName("");
        setNewEmail("");
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
            <button onClick={handleClickSignUp}>Sign Up</button>
            <form 
                id="signUpForm" 
                onSubmit={(event) => handleSignUp(event)} 
                hidden={true}>
                    <input 
                        type="text"
                        placeholder="First Name"
                        onChange={(event) => setNewFirstName(event.target.value)}
                        value={newFirstName} 
                    ></input>
                    <input 
                        type="text"
                        placeholder="Last Name"
                        onChange={(event) => setNewLastName(event.target.value)}
                        value={newLastName}
                       ></input> 
                    <input 
                        type="text"
                        placeholder="Email Address"
                        onChange={(event) => setNewEmail(event.target.value)}
                    ></input>
                    <input
                        type="text"
                        placeholder="New Username"
                        onChange={(event) => setNewUsername(event.target.value)}
                        value={newUsername}
                    ></input>
                    <input 
                        type="password"
                        placeholder="New Password"
                        onChange={(event) => setNewPassword(event.target.value)}
                        value={newPassword}
                    ></input>
                    <input 
                        type="password"
                        placeholder="Confirm New Password"
                        onChange={(event) => setConfirmNewPassword(event.target.value)}
                        value={confirmNewPassword}
                    ></input>
                    <input type="submit" value="Sign Up"></input>
            </form>
        </div>
    );
};

export default Auth;