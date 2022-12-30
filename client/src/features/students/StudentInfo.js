import React, { useState } from 'react';
import CourseNavBar from '../courses/CourseNavBar';
import { useDispatch, useSelector } from 'react-redux';
import { updateStudent } from './studentsSlice';

function StudentInfo() {

    const dispatch = useDispatch();

    const student = useSelector((state) => state.students.selectedStudent[0]);
    console.log(student)


    const [firstName, setFirstName] = useState(student.first_name);
    const [lastName, setLastName] = useState(student.last_name);
    const [gradeLevel, setGradeLevel] = useState(student.grade_level);
    const [classification, setClassification] = useState(student.classification);
    const [birthDate, setBirthDate] = useState(student.birth_date);


    function handleEditForm() {
        const inputs = Array.from(document.getElementsByClassName("input"));
        inputs.forEach(input => {
            input.readOnly = false;
        });
        const saveButton = document.getElementById("save");
        saveButton.hidden = false;
        const date = document.getElementById("date");
        date.hidden = false;
    };

    function handleSubmit(event) {
        event.preventDefault();
        const updatedStudentInfo = {
            id: student.id,
            first_name: firstName,
            last_name: lastName,
            birth_date: birthDate,
            grade_level: gradeLevel,
            classification: classification,
            assignments: student.assignments,
            periods: student.periods
        };
        dispatch(updateStudent(updatedStudentInfo));
        const inputs = Array.from(document.getElementsByClassName("input"));
        inputs.forEach(input => {
            input.readOnly = true;
        });
        const saveButton = document.getElementById("save");
        saveButton.hidden = true;
        const date = document.getElementById("date");
        date.hidden = true;
    }; 

    return(
        <div>
            <CourseNavBar />
            <img alt='pic'></img>
             <form onSubmit={event => handleSubmit(event)}>
                <label>First Name  </label>
                    <input 
                        className="input" 
                        type="text" 
                        readOnly={true}
                        onChange={event => setFirstName(event.target.value)} 
                        value={firstName}
                    ></input>
                <label>Last Name  </label>
                    <input 
                        className="input" 
                        type="text" 
                        readOnly={true}
                        onChange={event => setLastName(event.target.value)}
                        value={lastName}
                    ></input>
                <label>Student Birthdate: {birthDate}</label>
                    <input
                        id="date"
                        hidden={true}
                        type="date"
                        onChange={(event) => setBirthDate(event.target.value)}
                        value={birthDate}
                    ></input>
                <select 
                    className="input"
                    value={student.grade_level} 
                    onChange={(event) => setGradeLevel(event.target.value)}>
                        <option value={null}>Select Grade Level</option>
                        <option value={9}>9th</option>
                        <option value={10}>10th</option>
                        <option value={11}>11th</option>
                        <option value={12}>12th</option>
                </select>
                <select 
                    className="input"
                    value={student.classification} 
                    onChange={(event) => setClassification(event.target.value)}>
                        <option value={null}>Select Student Classification</option>
                        <option value="freshman">Freshman</option>
                        <option value="sophomore">Sophomore</option>
                        <option value="junior">Junior</option>
                        <option value="senior">Senior</option>
                </select>
                    <input 
                        id="save" 
                        type="submit" 
                        value="Save Changes" 
                        hidden={true}
                    ></input>
            </form>
            <button onClick={handleEditForm}>edit</button>
        </div>
    );
};

export default StudentInfo;