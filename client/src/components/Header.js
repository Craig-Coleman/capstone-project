import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userRemoved } from '../features/users/usersSlice';
import { fetchCourses } from '../features/courses/dataSlice';
import { fetchStudents } from '../features/courses/dataSlice';
import NavBar from './NavBar';

function Header({ setUser }) {

    const history = useHistory();
    const dispatch = useDispatch();

    const user = useSelector((state) => state.users.entities);

    useEffect(() => {
        dispatch(fetchCourses());
        dispatch(fetchStudents());
    }, [dispatch]);

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
            <h1>{user.first_name} {user.last_name}'s Teacher Portal</h1>
            <button onClick={handleLogout}>Logout</button>
            <NavBar setUser={setUser} />
        </div>
    );
};

export default Header;