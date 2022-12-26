import React from 'react';
import { useSelector } from 'react-redux';
import CourseNavBar from './CourseNavBar';

function CourseRoster() {

    const courses = useSelector((state) => state.courses.courses)
    const selectedCourseId = useSelector((state) => state.courses.selectedCourse);
    const selectedCourse = courses.filter(course => course.id === selectedCourseId)[0];
    const students = selectedCourse.students 
    const roster = students.map(student => {
        return (
            <li key={student.id}>{student.last_name}, {student.first_name}</li>
        )
    })

    return(
        <div>
            <CourseNavBar />
            <h1>{selectedCourse.title} Roster</h1>
            {roster}
        </div>
    );
};

export default CourseRoster;