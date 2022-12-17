import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userRemoved } from '../features/users/usersSlice';
import NavBar from './NavBar';

function Header({ setUser }) {

    const history = useHistory();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.users.entities);

    function handleLogout() {
        fetch("/logout", {
            method: "DELETE",
        }).then((res) => {
            if (res.ok) {
            setUser(null);
            (async () => {
                await dispatch(userRemoved());
               })();
            };
        }); 
        history.push("/"); 
    };

    return(
        <div>
            <h1>Welcome {user.first_name} {user.last_name}!</h1>
            <NavBar />
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default Header;