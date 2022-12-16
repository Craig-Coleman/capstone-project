import React from 'react';

function CourseCard({ course }) {

    const courseRoster = course.students.map(student => {
        return(
            <li key={student.id}>{student.last_name}, {student.first_name}</li>
        );
    });

    return (
            <div>
            <h1>{course.title}</h1>
            <h3>Roster</h3>
            {courseRoster}
        </div>
    );
};

export default CourseCard;