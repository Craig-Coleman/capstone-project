import React from 'react';
import CourseCard from './CourseCard';
import { useSelector } from 'react-redux'

function CourseList() {

    const courses = useSelector((state) => state.courses.courses);

    const courseList = courses.map(course => {
        return(
            <CourseCard key={course.id} course={course}></CourseCard>
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