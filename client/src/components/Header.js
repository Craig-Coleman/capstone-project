import React from 'react';
import { useHistory } from 'react-router-dom';
import NavBar from './NavBar';

function Header({ setUser }) {

    const history = useHistory();

    function handleLogout() {
        fetch("/logout", {
            method: "DELETE",
        }).then((res) => {
            if (res.ok) {
            setUser(null);
            };
        }); 
        history.push("/"); 
    };

    return(
        <div>
            <h1>Header</h1>
            <NavBar />
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default Header;