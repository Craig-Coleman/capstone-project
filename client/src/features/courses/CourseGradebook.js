import React, { useState } from 'react';
import CourseNavBar from './CourseNavBar';
import { useDispatch, useSelector } from 'react-redux';
import { updateAssignment } from '../assignments/assignmentsSlice';
import { addAssignment } from '../students/studentsSlice';

function CourseGradebook() {

    const dispatch = useDispatch();

    const course = useSelector((state) => state.courses.selectedCourse)[0];
    const assignments = useSelector((state) => state.assignments.assignments);
    const students = useSelector((state) => state.students.students);

    const courseGrades = [];
    students.map(student => {
        const studentArr = [];
        studentArr.push(`${student.last_name}, ${student.first_name}`)
        const studentGrades = {}
        student.assignments.map(assignment => {
            studentGrades[assignment.title] = assignment.score;
        });
        studentArr.push(studentGrades);
        courseGrades.push(studentArr);
    });

    const assignmentTitles = [];
    students[0].assignments.map(assignment => {
        assignmentTitles.push(assignment.title);
    });

    console.log(assignmentTitles)









    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [assignDate, setAssignDate] = useState("");
    const [dueDate, setDueDate] = useState("");

    const assignmentHeaders = assignmentTitles.map((title) => {
        return (
            <th key={title}>{title}</th>
        );
    });

    // const rows = courseGrades.map(student => {
    //     const assignments = student[1].map(assignment => {
    //         return (
    //                 <td 
    //                     width="70px"
    //                     className="scoreTd"
    //                     onKeyDown={(event) => handleKeyDown(event)}
    //                     onClick={(event) => enableEditing(event.target)} 
    //                     key={assignment.id}
    //                     id={assignment.id}
    //                 >{assignment.score ? assignment.score : "/"}</td>
    //         )
    //     })
    //     return (
    //         <tr key={student.id}>
    //             <td width="150px" >{student[0]}</td>
    //             {assignments}
    //         </tr>
    //     )
    // })

    function enableEditing(element){
        element.contentEditable = true;
        element.focus()
      };

      function handleKeyDown(event) {
        if (event.key === 'Enter') {
            event.target.contentEditable = false;
            const score = event.target.innerText
            const assignment = assignments.filter(assignment => assignment.id === parseInt(event.target.id))[0];
            const updatedAssignment = {
                assign_date: assignment.assign_date,
                course_id: assignment.course_id,
                description: assignment.description,
                due_date: assignment.due_date,
                id: assignment.id,
                title: assignment.title,
                student_id: assignment.student_id,
                score: score
            }
            dispatch(updateAssignment(updatedAssignment));
          };
      };

    // const studentAssignments = students.map(student => {
    //     const studentAssignments = student.assignments.map(assignment => {
    //         return (
    //             <td 
    //             className="score"
    //             onKeyDown={(event) => handleKeyDown(event)}
    //             onClick={(event) => enableEditing(event.target)} 
    //             key={assignment.id}
    //             id={assignment.id}
    //             >{assignment.score}</td>
    //         )
    //     })
    //     return (
    //         <tr key={student.id}>
    //             <td>{student.last_name}, {student.first_name}</td>
    //             {studentAssignments}
    //         </tr>
    //     )
    // })

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

    return(
        <div>
            <CourseNavBar />
           <h1>{course.title} Gradebook</h1> 
            <table>
                <thead>
                    <tr>
                        <th>Student</th>
                       {assignmentHeaders}
                    </tr>
               </thead>
               <tbody>
                {/* {rows} */}
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