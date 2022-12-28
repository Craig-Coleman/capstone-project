import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { courseSelected, fetchCourseStudents, deleteCourse } from './dataSlice';

function CourseCard({ course }) {

    const dispatch = useDispatch();
    const history = useHistory();

    function handleToCourseClick(id) {
        dispatch(courseSelected(id));
        dispatch(fetchCourseStudents(id));
        history.push('/coursehome')
    };

    function handleDeleteCourse(id) {
        dispatch(deleteCourse(id));
    }

    return (
            <div>
            <h3>{course.title} - Period: {course.period} </h3>
            <button onClick={function() {handleToCourseClick(course.id)}}>To Course</button>
            <button onClick={function() {handleDeleteCourse(course.id)}}>Delete Course</button>
        </div>
    );
};

export default CourseCard;