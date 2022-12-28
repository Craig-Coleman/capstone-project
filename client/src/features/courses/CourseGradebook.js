import React from 'react';
import CourseNavBar from './CourseNavBar';
import { useSelector } from 'react-redux';

function CourseGradebook() {

    const selectedCourse = useSelector((state) => state.courses.selectedCourse)[0];
    const courseStudents = useSelector((state) => state.courses.courseStudents);
    

    const assignmentTitles = selectedCourse.assignments.map((assignment) => {
        return (
            <th key={assignment.id}>{assignment.title}</th>
        );
    });

    const studentAssignments = courseStudents.map((student) => {
        const assignments = student.assignments.map((assignment) => {
            return (
                <td key={assignment.id}>{assignment.score}</td>
            )
        })
        return(
            <tr key={student.id}>
                <td>{student.last_name}, {student.first_name}</td>
                {assignments}
            </tr>
        )
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
                {studentAssignments}
               </tbody>
            </table> 
         </div>
    );
};

export default CourseGradebook;