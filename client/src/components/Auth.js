import React, { useState } from 'react';

function Auth({ setUser }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState([]);


    function handleLogin(event) {
        event.preventDefault();
        const userInfo = {
            username,
            password
        };
        login(userInfo);
        setUsername('');
        setPassword('');
    };

    function login(userInfo) {
        fetch("/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userInfo),
        })
          .then(res => {
            if (res.ok) {
                res.json().then((user) => setUser(user));
            } else {
                res.json().then((err) => setError(err.error));          
            };
          });
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