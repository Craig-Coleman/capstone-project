import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import CourseNavBar from './CourseNavBar';
import { studentSelected } from './coursesSlice';
import { addStudent } from '../students/studentsSlice';

function CourseRoster() {

    const dispatch = useDispatch();
    const history = useHistory();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [gradeLevel, setGradeLevel] = useState("");
    const [classification, setClassification] = useState("");
    const [birthDate, setBirthDate] = useState("");

    const courses = useSelector((state) => state.courses.courses)
    const selectedCourseId = useSelector((state) => state.courses.selectedCourse);
    const selectedCourse = courses.filter(course => course.id === selectedCourseId)[0];
    const students = selectedCourse.students;
    const successMessage = useSelector((state) => state.students.success)

    const roster = students.map(student => {
        return (
            <div key={student.id}>
                <li>{student.last_name}, {student.first_name}</li>
                <button id={student.id} onClick={function() {handleStudentClick(student.id)}}>Student Info</button>
            </div>
        )
    });

    function handleStudentClick(id) {
        dispatch(studentSelected(id));
        history.push("/studentinfo");
    }

    function handleClickAddStudent() {
        const form = document.getElementById("form");
        form.hidden = false;
        const button = document.getElementById("addButton");
        button.hidden = true;
    };

    function handleSubmit(event) {
        event.preventDefault();
        const newStudentInfo = {
            first_name: firstName,
            last_name: lastName,
            grade_level: gradeLevel,
            classification: classification,
            birth_date: birthDate,
            periods_attributes: [
                { number: selectedCourse.period, 
                  course_id: selectedCourse.id,
                  start_time: '08:50',
                  end_time: '09:40'
                }]
        };
        dispatch(addStudent(newStudentInfo));
        const form = document.getElementById("form");
        form.hidden = true;
        const button = document.getElementById("addButton");
        button.hidden = false;
        setFirstName("");
        setLastName("");
        setGradeLevel("");
        setClassification("");
        setBirthDate("");
    };

    return(
        <div>
            <CourseNavBar />
            <h1>{selectedCourse.title} Roster</h1>
            {roster}
            <button 
                id="addButton" 
                onClick={handleClickAddStudent} 
                hidden={false}
            >Add Student</button>
            <form 
                id="form" 
                onSubmit={event => handleSubmit(event)} 
                hidden={true} >
                <input 
                    type="text"
                    onChange={(event) => setFirstName(event.target.value)}
                    value={firstName}
                    placeholder="Student First Name"
                ></input>
                <input
                    type="text"
                    onChange={(event) => setLastName(event.target.value)}
                    value={lastName}
                    placeholder="Student Last Name"
                ></input>
                <label>Student Birthdate</label>
                <input
                    type="date"
                    onChange={(event) => setBirthDate(event.target.value)}
                    value={birthDate}
                ></input>
                <select onChange={(event) => setGradeLevel(event.target.value)}>
                    <option value={null}>Select Grade Level</option>
                    <option value={9}>9th</option>
                    <option value={10}>10th</option>
                    <option value={11}>11th</option>
                    <option value={12}>12th</option>
                </select>
                <select onChange={(event) => setClassification(event.target.value)}>
                    <option value={null}>Select Student Classification</option>
                    <option value="freshman">Freshman</option>
                    <option value="sophomore">Sophomore</option>
                    <option value="junior">Junior</option>
                    <option value="senior">Senior</option>
                </select>
                <input type="submit" value="Save Student"></input>
            </form>
            <h3>{successMessage}</h3>
        </div>
    );
};

export default CourseRoster;