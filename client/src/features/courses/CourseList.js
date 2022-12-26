import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import CourseCard from './CourseCard';
import { courseSelected, addCourse } from './coursesSlice';

function CourseList() {

    const dispatch = useDispatch();
    const history = useHistory();

    const [courseName, setCourseName] = useState("");
    const [gradeLevel, setGradeLevel] = useState("");
    const [period, setPeriod] = useState("");

    const courses = useSelector((state) => state.courses.courses);

    function handleClick(id) {
        dispatch(courseSelected(id));
        history.push('/coursehome')
    };

    const courseList = courses.map(course => {
        return(
            <div key={course.id}>
            <CourseCard course={course}></CourseCard>
            <button onClick={function() {handleClick(course.id)}}>To Course</button>
            </div>
        );
    });

    function showAddForm() {
        const form = document.getElementById('addform');
        form.hidden = false;
    };

    function handleChangeCourseName(courseName) {
        setCourseName(courseName);
    };

    function handleChangeGradeLevel(gradeLevel) {
        setGradeLevel(gradeLevel);
    };

    function handleChangePeriod(period) {
        setPeriod(period);
    };
    
    function handleSubmit(event) {
        const newCourse = {
            title: courseName,
            period: period,
            grade_level: gradeLevel
        }
        event.preventDefault();
        dispatch(addCourse(newCourse));
        const form = document.getElementById('addform');
        form.hidden = true;
        setCourseName("");
        setGradeLevel("");
        setPeriod("");
    };

    return(
        <div>
            <h1>CourseList</h1>
            {courseList}
            <button onClick={showAddForm}>Add Course</button>
            <form id="addform" onSubmit={event => handleSubmit(event)} hidden={true} >
                <label>Course Name  </label>
                    <input 
                        className="input" 
                        type="text" 
                        onChange={event => handleChangeCourseName(event.target.value)}
                        value={courseName}
                    ></input>
                <label>Grade Level </label>
                    <select 
                        onChange={event => handleChangeGradeLevel(event.target.value)} 
                        value={gradeLevel}>
                            <option value={9}>9</option>
                            <option value={10}>10</option>
                            <option value={11}>11</option>
                            <option value={12}>12</option>
                    </select>
                    <label>Period </label>
                    <select 
                        onChange={event => handleChangePeriod(event.target.value)} 
                        value={period}>
                            <option value={1}>1st</option>
                            <option value={2}>2nd</option>
                            <option value={3}>3rd</option>
                            <option value={4}>4th</option>
                            <option value={5}>5th</option>
                            <option value={6}>6th</option>
                            <option value={7}>7th</option>
                    </select>
                    <input type="submit" value="save course" ></input>
            </form>
        </div>
    );
};

export default CourseList;