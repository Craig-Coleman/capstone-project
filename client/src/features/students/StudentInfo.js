import React, { useState } from 'react';
import { useSelector } from 'react-redux';

function StudentInfo() {

    const selectedStudentId = useSelector((state) => state.courses.selectedStudent)
    const selectedCourseId = useSelector((state) => state.courses.selectedCourse)
    const course = useSelector((state) => state.courses.courses.filter(course => course.id === selectedCourseId))
    const selectedStudent = course[0].students.filter(student => student.id === selectedStudentId)[0]

    const [firstName, setFirstName] = useState(selectedStudent.first_name);
    const [lastName, setLastName] = useState(selectedStudent.last_name);
    const [gradeLevel, setGradeLevel] = useState("");
    const [classification, setClassification] = useState("");
    const [birthDate, setBirthDate] = useState("");

    const year = selectedStudent.birth_date.toString().substr(0, 4);
    const month = selectedStudent.birth_date.toString().substr(4, 2);
    const day = selectedStudent.birth_date.toString().substr(6, 2);


    function handleEditForm() {
        const inputs = Array.from(document.getElementsByClassName("input"));
        inputs.forEach(input => {
            input.readOnly = false;
        });
        const saveButton = document.getElementById("save");
        saveButton.hidden = false;
    };

    function handleSubmit(event) {
        event.preventDefault();
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
                        type="date"
                        onChange={(event) => setBirthDate(event.target.value)}
                        value={birthDate}
                    ></input>
                <select value={selectedStudent.grade_level} onChange={(event) => setGradeLevel(event.target.value)}>
                    <option value={null}>Select Grade Level</option>
                    <option value={9}>9th</option>
                    <option value={10}>10th</option>
                    <option value={11}>11th</option>
                    <option value={12}>12th</option>
                </select>
                <select value={selectedStudent.classification} onChange={(event) => setClassification(event.target.value)}>
                    <option value={null}>Select Student Classification</option>
                    <option value="freshman">Freshman</option>
                    <option value="sophomore">Sophomore</option>
                    <option value="junior">Junior</option>
                    <option value="senior">Senior</option>
                </select>
                <input type="submit" value="Save Student"></input>
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