import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import CourseNavBar from './CourseNavBar';

function CourseRoster() {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [gradeLevel, setGradeLevel] = useState("");
    const [classification, setClassification] = useState("");
    const [birthDate, setBirthDate] = useState("");

    const courses = useSelector((state) => state.courses.courses)
    const selectedCourseId = useSelector((state) => state.courses.selectedCourse);
    const selectedCourse = courses.filter(course => course.id === selectedCourseId)[0];
    const students = selectedCourse.students;

    const roster = students.map(student => {
        return (
            <li key={student.id}>{student.last_name}, {student.first_name}</li>
        )
    });

    function handleClickAddStudent() {
        const form = document.getElementById("form");
        form.hidden = false;
    };

    function handleSubmit(event) {
        event.preventDefault();
    }

    //first_name last_name grade_level classification birth_date

    return(
        <div>
            <CourseNavBar />
            <h1>{selectedCourse.title} Roster</h1>
            {roster}
            <button onClick={handleClickAddStudent}>Add Student</button>
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
                <select onChange={(event) => setGradeLevel(event.target.value)}>
                    <option value={null}>Select Grade Level</option>
                    <option value={9}>9th</option>
                    <option value={10}>10th</option>
                    <option value={11}>11th</option>
                    <option value={12}>12th</option>
                </select>
            </form>
        </div>
    );
};

export default CourseRoster;