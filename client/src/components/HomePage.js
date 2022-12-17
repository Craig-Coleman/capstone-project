import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchCourses } from '../features/courses/coursesSlice';
import { fetchStudents } from '../features/students/studentsSlice';

function HomePage() {

    const dispatch = useDispatch();

        useEffect(() => {
            dispatch(fetchCourses());
            dispatch(fetchStudents());
        }, [dispatch])

    return (
        <div>
            <h1>What's New</h1>
            <p>Nothing yet, but update information will go here!</p>
        </div>
    );
};

export default HomePage;