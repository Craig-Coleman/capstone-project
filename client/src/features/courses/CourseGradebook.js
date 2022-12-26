import React from 'react';
import CourseNavBar from './CourseNavBar';
import { useSelector } from 'react-redux';

function CourseGradebook() {

    const courses = useSelector((state) => state.courses.courses)
    const selectedCourseId = useSelector((state) => state.courses.selectedCourse);
    const selectedCourse = courses.filter(course => course.id === selectedCourseId)[0];

    return(
        <div>
            <CourseNavBar />
            <h1>CourseGradeBook</h1>
        </div>
    );
};

export default CourseGradebook;