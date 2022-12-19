import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userRemoved } from '../features/users/usersSlice';
import { fetchCourses } from '../features/courses/coursesSlice';
import { fetchStudents } from '../features/students/studentsSlice';
import NavBar from './NavBar';

function Header({ setUser }) {

    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCourses());
        dispatch(fetchStudents());
    }, [dispatch])

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
            <h1>{user.first_name} {user.last_name}'s Teacher Portal</h1>
            <NavBar />
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default Header;