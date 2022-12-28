import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { deleteStudent, studentSelected } from '../courses/dataSlice';

function StudentCard({ student }) {

    const dispatch = useDispatch();
    const history = useHistory();

    function handleDeleteStudent(id) {
        dispatch(deleteStudent(id));
    }; 

    function handleStudentClick(id) {
        dispatch(studentSelected(id));
        history.push("/studentinfo");
    };

    return(
        <div key={student.id}>
            <li>{student.last_name}, {student.first_name}</li>
            <button id={student.id} onClick={function() {handleStudentClick(student.id)}}>Student Info</button>
            <button onClick={function() {handleDeleteStudent(student.id)}}>Delete Student</button>
        </div>
    );
};

export default StudentCard;