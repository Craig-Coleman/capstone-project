import React from 'react';
import CourseNavBar from './CourseNavBar';
import { useSelector } from 'react-redux';

function CourseGradebook() {

    const courses = useSelector((state) => state.courses.courses);
    const selectedCourseId = useSelector((state) => state.courses.selectedCourse);
    const selectedCourse = courses.filter(course => course.id === selectedCourseId)[0];
    const assignments = useSelector((state) => state.courses.courseAssignments);


    const assignmentTitles = assignments.map((assignment) => {
        return (
            <th key={assignment.id}>{assignment.title}</th>
        );
    });

    return(
        <div>
            <CourseNavBar />
            <h1>{selectedCourse.title} Gradebook</h1>
            <table>
                <thead>
                    <tr>
                        <th>Student</th>
                        {assignmentTitles}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Student Name</td>
                        <td>100</td>
                        <td>100</td>
                        <td>100</td>
                    </tr>
                    <tr>
                        <td>Student Name</td>
                        <td>90</td>
                        <td>90</td>
                        <td>90</td>
                    </tr>
                    <tr>
                        <td>Student Name</td>
                        <td>80</td>
                        <td>80</td>
                        <td>80</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default CourseGradebook;