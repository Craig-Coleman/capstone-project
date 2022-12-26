import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import CourseNavBar from './CourseNavBar';
import { updateCourse } from './coursesSlice';

function CourseHome() {

    const dispatch = useDispatch();

    const courses = useSelector((state) => state.courses.courses)
    const selectedCourseId = useSelector((state) => state.courses.selectedCourse);
    const selectedCourse = courses.filter(course => course.id === selectedCourseId)[0];

    const [courseName, setCourseName] = useState(selectedCourse.title);
    const [gradeLevel, setGradeLevel] = useState(selectedCourse.grade_level);
    const [period, setPeriod] = useState(selectedCourse.period);

    function handleClick() {
        const form = document.getElementById('form');
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
        event.preventDefault();
        const form = document.getElementById('form');
        const newCourseData = {
            id: selectedCourse.id,
            title: courseName,
            grade_level: gradeLevel,
            period: period
        };
        dispatch(updateCourse(newCourseData));
        form.hidden = true;
    };

    return(
        <div>
            <CourseNavBar />
            <h1>{selectedCourse.title}</h1>
            <h2>Period: {selectedCourse.period}</h2>
            <button onClick={handleClick}>Edit Course Information</button>
            <form id="form" onSubmit={event => handleSubmit(event)} hidden={true} >
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

export default CourseHome;