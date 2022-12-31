import React, { useState } from 'react';
import CourseNavBar from './CourseNavBar';
import { useDispatch, useSelector } from 'react-redux';
import { addAssignment, updateAssignment, fetchStudents } from '../students/studentsSlice';

function CourseGradebook() {

    const dispatch = useDispatch();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [assignDate, setAssignDate] = useState("");
    const [dueDate, setDueDate] = useState("");

    const course = useSelector((state) => state.courses.selectedCourse)[0];
    const assignments = useSelector((state) => state.assignments.assignments);
    const students = useSelector((state) => state.students.students);

    // console.log(students)

    const assignmentTitles = [];
    students[0].assignments.map(assignment => {
        assignmentTitles.push(assignment.title);
    });

    const tdStyle = {
        border: "1px solid black",
      };

    const assignmentHeaders = assignmentTitles.map((title) => {
        return (
            <th style={tdStyle} key={title}>{title}</th>
        );
    });

    const sortedStudents = [...students].sort((s1, s2) => (s1.last_name > s2.last_name) ? 1 : (s1.last_name < s2.last_name) ? -1 : 0);
    console.log(sortedStudents)

    const courseGrades = [];
    sortedStudents.map(student => {
        const studentArr = [];
        studentArr.push(`${student.last_name}, ${student.first_name}`)
        student.assignments.map(assignment => {
            const assignArr = [];
            assignArr.push(assignment.id)
            assignArr.push(assignment.score)
            assignArr.push(student.id)
            studentArr.push(assignArr);
        });
        courseGrades.push(studentArr);
    });


    const rows = courseGrades.map(student => {
        const scores = student.slice(1).map(assignment => {
            return (
                <td 
                    data-student={assignment[2]}
                    onKeyDown={(event) => handleKeyDown(event)}
                    onClick={(event) => enableEditing(event.target)} 
                    key={assignment[0]} 
                    id={assignment[0]}
                    style={tdStyle}
                >{assignment[1]}</td>
            );
        });
        return(
            <tr key={student.id}>
                <td style={tdStyle}>{student[0]}</td>
                {scores}
            </tr>
        );
    });

    function enableEditing(element){
        element.contentEditable = true;
        element.focus()
      };

      function handleKeyDown(event) {
        if (event.key === 'Enter') {
            event.target.contentEditable = false;
            const score = event.target.innerText
            const student = students.filter(student => student.id === parseInt(event.target.dataset.student))
            const assignment = student[0].assignments.filter(assignment => assignment.id === parseInt(event.target.id))[0];
            const updatedAssignment = {
                id: event.target.id,
                title: assignment.title,
                description: assignment.description,
                assign_date: assignment.assign_date,
                due_date: assignment.due_date,
                score: score,
                course_id: assignment.course_id,
                student_id: assignment.student_id
            }
            dispatch(updateAssignment(updatedAssignment));
          };
      };

    function handleClickAddAssignment() {
        const form = document.getElementById('form');
        form.hidden = false;
    };

    function handleSubmitAdd(event) {
        event.preventDefault();
        const newAssignment = {
            course_id: course.id,
            title: title,
            description: description,
            assign_date: assignDate,
            due_date: dueDate,
            score: null,
        };
        dispatch(addAssignment(newAssignment));
        const form = document.getElementById("form");
        form.hidden = true;
        setTitle("");
        setDescription("");
        setAssignDate("");
        setDueDate("");
    };

    const tableStyle = {
        border: "1px solid black",
        borderCollapse: "collapse",
      };

    return(
        <div>
            <CourseNavBar />
           <h1>{course.title} Gradebook</h1> 
            <table style={tableStyle}>
                <thead>
                    <tr>
                        <th>Student</th>
                       {assignmentHeaders}
                    </tr>
               </thead>
               <tbody>
                {rows}
               </tbody>
            </table>
            <button onClick={handleClickAddAssignment}>Add assignment</button>
            <form id="form" hidden={true} onSubmit={(event) => handleSubmitAdd(event)}>
                <label>Title</label>
                <input
                    className="input"
                    type="text"
                    onChange={(event) => setTitle(event.target.value)}
                    value={title}
                ></input>
                <label>Description</label>
                <input
                    className="input"
                    type="field"
                    onChange={(event) => setDescription(event.target.value)}
                    value={description}
                ></input>
                <label>Date Assigned</label>
                    <input
                        className="input"
                        type="date"
                        onChange={(event) => setAssignDate(event.target.value)}
                        value={assignDate}
                    ></input>
                <label>Due Date</label>
                    <input
                        className="input"
                        type="date"
                        onChange={(event) => setDueDate(event.target.value)}
                        value={dueDate}
                    ></input>
                    <input type="submit" value="Save Assignment"></input>
            </form>
         </div>
    );
};

export default CourseGradebook;