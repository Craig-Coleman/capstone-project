import React from 'react';
import CourseNavBar from './CourseNavBar';
import { useSelector } from 'react-redux';

function CourseGradebook() {

    const studentAssignments = useSelector((state) => state.students.assignments);
    const courseAssignments = useSelector((state) => state.courses.assignments);

    console.log(studentAssignments)
    console.log(courseAssignments)

    return(
        <div>
            <CourseNavBar />
            <h1>CourseGradeBook</h1>
        </div>
    );
};

export default CourseGradebook;