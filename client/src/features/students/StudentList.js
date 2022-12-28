import React from 'react';
import { useSelector } from 'react-redux';

function StudentList() {

    const students = useSelector((state) => state.courses.students)

    const studentList = students.map((student) => {
        return(
            <li key={student.id}>{student.last_name}, {student.first_name}</li>
        )
    })

    return(
        <h1>{studentList}</h1>
    );
};

export default StudentList;