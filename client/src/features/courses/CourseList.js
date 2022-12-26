import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import CourseCard from './CourseCard';
import { courseSelected } from './coursesSlice';

function CourseList() {

    const dispatch = useDispatch();
    const history = useHistory();

    const courses = useSelector((state) => state.courses.courses);

    function handleClick(id) {
        dispatch(courseSelected(id));
        history.push('/coursehome')
    }

    const courseList = courses.map(course => {
        return(
            <div key={course.id}>
            <CourseCard course={course}></CourseCard>
            <button onClick={function() {handleClick(course.id)}}>To Course</button>
            </div>
        )
    }) 

    return(
        <div>
            <h1>CourseList</h1>
            {courseList}
        </div>
    );
};

export default CourseList;