import React from 'react';

function CourseCard( { courses, assignments, students, sAssignments } ) {

    const courseList =  courses.map((course) => { return ( <li key={course.id}>{course.title}</li>)});
    const assignmentList =  assignments.map((assignment) => { return ( <li key={assignment.id}>{assignment.title}</li>)})
    const studentList = students.map((student) => { return ( <li key={student.id}>{student.first_name}</li>)});
    const sAssignmentList = students.map(student => student.assignments.map(assignment => { return( <li key={assignment.id}>{assignment.title}</li>)}))

    return (
            <div>
            <h1>CourseCard</h1>
            {courseList}
            {assignmentList}
            {studentList}
            {sAssignmentList}
        </div>
    );
};

export default CourseCard;