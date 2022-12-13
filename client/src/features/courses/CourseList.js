import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import {selectAllCourses, fetchCourses } from './coursesSlice';

function CourseList() {

    const dispatch = useDispatch();
    // const courses = useSelector(selectAllCourses)

    // const courseStatus = useSelector(state => state.courses.staus)

    // useEffect(() => {
    //     if (courseStatus === 'idle') {
    //         dispatch(fetchCourses())
    //     }
    // }, [courseStatus, dispatch])

    return(
        <h1>Course List</h1>
    );
};

export default CourseList;