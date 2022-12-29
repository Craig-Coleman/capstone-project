import React, { useState } from 'react';
import CourseNavBar from './CourseNavBar';
import { useDispatch, useSelector } from 'react-redux';
import { addAssignment } from './dataSlice';

function CourseGradebook() {

    const dispatch = useDispatch();

    const selectedCourse = useSelector((state) => state.courses.selectedCourse)[0];
    const courseStudents = useSelector((state) => state.courses.courseStudents);
    const assignments = useSelector((state) => state.courses.selectedCourse[0].assignments);

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

    const studentAssignments = courseStudents.map((student) => {
        const assignments = student.assignments.map((assignment) => {
            return (
                <td key={assignment.id}>{assignment.score}</td>
            )
        })
        return(
            <tr key={student.id}>
                <td>{student.last_name}, {student.first_name}</td>
                {assignments}
            </tr>
        )
    });

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
        courseStudents.map(student => dispatch(addAssignment({...newAssignment, student_id: student.id})))
    }

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
                {studentAssignments}
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