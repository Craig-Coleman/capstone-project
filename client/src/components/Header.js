import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/users/usersSlice';
import { fetchCourses } from '../features/courses/coursesSlice';
import { fetchStudents } from '../features/students/studentsSlice';
import { fetchAssignments } from '../features/assignments/assignmentsSlice';
import { fetchCourseGrades } from '../features/courses/coursesSlice';
import NavBar from './NavBar';

function Header() {

    const history = useHistory();
    const dispatch = useDispatch();

    const user = useSelector((state) => state.users.user);
    const selectedCourseId = useSelector((state) => state.courses.selectedCourse[0].id);

    useEffect(() => {
        dispatch(fetchCourses());
        dispatch(fetchStudents(selectedCourseId));
        dispatch(fetchAssignments(selectedCourseId));
        dispatch(fetchCourseGrades(selectedCourseId));
    }, [dispatch, selectedCourseId]);

    function handleLogout() {
        dispatch(logout());
        history.push("/"); 
    };

    return(
        <div>
            <h1>{user.first_name} {user.last_name}'s Teacher Portal</h1>
            <button onClick={handleLogout}>Logout</button>
            <NavBar />
        </div>
    );
};

export default Header;