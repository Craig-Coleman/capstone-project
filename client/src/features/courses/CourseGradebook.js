import React, { useState } from 'react';
import CourseNavBar from './CourseNavBar';
import { useDispatch, useSelector } from 'react-redux';
import { addAssignment, updateAssignment } from '../assignments/assignmentsSlice';

function CourseGradebook() {

    const dispatch = useDispatch();

    const selectedCourse = useSelector((state) => state.courses.selectedCourse)[0];
    const students = useSelector((state) => state.students.students);
    const assignments = useSelector((state) => state.assignments.assignments);
    console.log(assignments)
    

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [assignDate, setAssignDate] = useState("");
    const [dueDate, setDueDate] = useState("");

    const uniqueTitles = [...new Set(assignments.map(assignment => assignment.title))];
    
    const assignmentTitles = uniqueTitles.map((title) => {
        return (
            <th key={title}>{title}</th>
        );
    });

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
      }

      function enableEditing(element){
        element.contentEditable = true;
        element.focus()
      }

    // const studentAssignments = students.map((student) => {
    //     const lassignments = student.assignments.map((assignment) => {
    //         return (
    //             <td 
    //                 className="cell"
    //                 onKeyDown={(event) => handleKeyDown(event)}
    //                 onClick={(event) => enableEditing(event.target)} 
    //                 key={assignment.id}
    //                 id={assignment.id}
    //                 >{assignment.score}</td>)
    //     })
    //     return(
    //         <tr key={student.id}>
    //             <td>{student.last_name}, {student.first_name}</td>
    //             {lassignments}
    //         </tr>
    //     )
    // });

    function handleClickAddAssignment() {
        const form = document.getElementById('form');
        form.hidden = false;
    };

    function handleSubmitAdd(event) {
        event.preventDefault();
        const newAssignment = {
            title: title,
            description: description,
            assign_date: assignDate,
            due_date: dueDate,
            score: null,
            course_id: selectedCourse.id
        };
        students.map(student => dispatch(addAssignment({...newAssignment, student_id: student.id})));
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
           <h1>{selectedCourse.title} Gradebook</h1> 
            <table>
                <thead>
                    <tr>
                        <th>Student</th>
                       {assignmentTitles}
                    </tr>
               </thead>
               <tbody>
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