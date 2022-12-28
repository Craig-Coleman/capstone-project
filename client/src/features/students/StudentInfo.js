import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateStudent } from '../courses/dataSlice';

function StudentInfo() {

    const dispatch = useDispatch();

    const selectedStudentId = useSelector((state) => state.courses.selectedStudent)
    const selectedCourseId = useSelector((state) => state.courses.selectedCourse)
    const selectedCourse = useSelector((state) => state.courses.courses.filter(course => course.id === selectedCourseId))
    // const selectedStudent = selectedCourse[0].students.filter(student => student.id === selectedStudentId)[0]

    const students = useSelector((state) => state.courses.students)
    console.log(students)

    const selectedStudent = useSelector((state) => state.courses.students.filter(student => student.id === selectedStudentId)[0])

    const year = selectedStudent.birth_date.toString().substr(0, 4);
    const month = selectedStudent.birth_date.toString().substr(5, 2);
    const day = selectedStudent.birth_date.toString().substr(8, 2);
    const formattedBirthday = `${year} - ${month} - ${day}`

    const [firstName, setFirstName] = useState(selectedStudent.first_name);
    const [lastName, setLastName] = useState(selectedStudent.last_name);
    const [gradeLevel, setGradeLevel] = useState(selectedStudent.grade_level);
    const [classification, setClassification] = useState(selectedStudent.classification);
    const [birthDate, setBirthDate] = useState(formattedBirthday);


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
            id: selectedStudent.id,
            first_name: firstName,
            last_name: lastName,
            birth_date: birthDate,
            grade_level: gradeLevel,
            classification: classification,
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
    } 

    function handleDeleteStudent(id) {
        console.log(id);
    }

    if (selectedStudent) 

    return(
        <div>
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
                <label>Student Birthdate: {month}/{day}/{year}</label>
                    <input
                        id="date"
                        hidden={true}
                        type="date"
                        onChange={(event) => setBirthDate(event.target.value)}
                        value={birthDate}
                    ></input>
                <select 
                    className="input"
                    value={selectedStudent.grade_level} 
                    onChange={(event) => setGradeLevel(event.target.value)}>
                        <option value={null}>Select Grade Level</option>
                        <option value={9}>9th</option>
                        <option value={10}>10th</option>
                        <option value={11}>11th</option>
                        <option value={12}>12th</option>
                </select>
                <select 
                    className="input"
                    value={selectedStudent.classification} 
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
            <button onClick={function() {handleDeleteStudent(selectedStudent.id)}}>Delete Student</button>
        </div>
    );
};

export default StudentInfo;