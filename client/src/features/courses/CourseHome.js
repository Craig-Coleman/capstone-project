import React from 'react';
import { useSelector } from 'react-redux'
import CourseNavBar from './CourseNavBar';

function CourseHome() {

    const courses = useSelector((state) => state.courses.courses)
    const selectedCourseId = useSelector((state) => state.courses.selectedCourse);
    const selectedCourse = courses.filter(course => course.id === selectedCourseId)[0];

    function handleSubmit(event) {
        event.preventDefault();
        console.log('submitted!');
    };

    return(
        <div>
            <CourseNavBar />
            <h1>{selectedCourse.title}</h1>
            <h2>Period: {selectedCourse.period}</h2>
            <button>Edit Course Information</button>
            <form hidden={true} onSubmit={event => handleSubmit(event)}>

            </form>
        </div>
    );
};

export default CourseHome;