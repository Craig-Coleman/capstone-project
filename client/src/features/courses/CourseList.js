import React, { useEffect } from 'react';
import CourseCard from './CourseCard';
import { useSelector, useDispatch } from 'react-redux'
import { fetchCourses } from './coursesSlice';

function CourseList() {
    const courses = useSelector((state) => state.courses.entities);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCourses());
    }, [dispatch]);

    return(
        <div>
            <h1>CourseList</h1>
            <CourseCard courses={courses} />
        </div>
    );
};

export default CourseList;