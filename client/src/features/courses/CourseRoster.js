import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CourseNavBar from './CourseNavBar';
import { addStudent } from '../students/studentsSlice';

function CourseRoster() {

    const dispatch = useDispatch();

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
        const button = document.getElementById("addButton");
        button.hidden = true;
    };

    function handleSubmit(event) {
        event.preventDefault();
        const newStudentInfo = {
            course_id: selectedCourse.id,
            first_name: firstName,
            last_name: lastName,
            grade_level: gradeLevel,
            classification: classification,
            birth_date: birthDate
        };
        dispatch(addStudent(newStudentInfo));
        const form = document.getElementById("form");
        form.hidden = true;
        const button = document.getElementById("addButton");
        button.hidden = false;
    }

    const newStudentInfo = {
        course_id: selectedCourse.id,
        first_name: firstName,
        last_name: lastName,
        grade_level: gradeLevel,
        classification: classification,
        birth_date: birthDate
    };

    function testAdd(student) {
        console.log(student)
        fetch(`/courses/${student.course_id}/students`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(student)
        })
        .then(res => res.json())
        .then(data => console.log(data));
    }
    

    //first_name last_name grade_level classification birth_date

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
            <button onClick={function() {testAdd(newStudentInfo)}}>Test</button>
        </div>
    );
};

export default CourseRoster;