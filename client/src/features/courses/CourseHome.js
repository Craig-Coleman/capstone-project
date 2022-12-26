import React from 'react';
import { useSelector } from 'react-redux'
import CourseNavBar from './CourseNavBar';

function CourseHome() {

    const courses = useSelector((state) => state.courses.courses)
    const selectedCourseId = useSelector((state) => state.courses.selectedCourse);
    const selectedCourse = courses.filter(course => course.id === selectedCourseId)[0];

    console.log(selectedCourse)

    return(
        <div>
            <CourseNavBar />
            <h1>CourseHome</h1>
        </div>
    );
};

export default CourseHome;