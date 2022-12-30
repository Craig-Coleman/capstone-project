import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CourseNavBar from './CourseNavBar';
import StudentCard from '../students/StudentCard';
import { addStudent } from '../students/studentsSlice';

function CourseRoster() {

    const dispatch = useDispatch();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [gradeLevel, setGradeLevel] = useState("");
    const [classification, setClassification] = useState("");
    const [birthDate, setBirthDate] = useState("");

    const course = useSelector((state) => state.courses.selectedCourse)[0];
    const students = useSelector((state) => state.students.students);
    console.log(students)

    const roster = students.map(student => {
        return (
            <StudentCard key={student.id} student={student} />
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
        const newStudentAssignments = [];
        course.assignments.map(assignment => newStudentAssignments.push({
            course_id: course.id,
            title: assignment.title,
            description: assignment.description,
            assign_date: assignment.assign_date,
            due_date: assignment.due_date,
            score: null
        }));
        const newStudentInfo = {
            first_name: firstName,
            last_name: lastName,
            grade_level: gradeLevel,
            classification: classification,
            birth_date: birthDate,
            periods_attributes: [
                { number: course.period, 
                  course_id: course.id,
                  start_time: '08:50',
                  end_time: '09:40'
                }],
             assignments_attributes: newStudentAssignments
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
            <h1>{course.title} Roster</h1>
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
        </div>
    );
};

export default CourseRoster;