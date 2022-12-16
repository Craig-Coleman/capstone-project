import React, { useEffect } from 'react';
import CourseList from '../features/courses/CourseList'
import { useDispatch } from 'react-redux';
import { fetchCourses } from '../features/courses/coursesSlice';
import { fetchStudents } from '../features/students/studentsSlice';

function HomePage({ user }) {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCourses());
        dispatch(fetchStudents());
    }, [dispatch])

    return (
        <div>
            <h1>HomePage</h1>
            <CourseList />
        </div>
    );
};

export default HomePage;