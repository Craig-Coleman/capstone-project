import React, { useEffect } from 'react';
import CourseCard from './CourseCard';
import { useSelector, useDispatch } from 'react-redux'
import { fetchCourses, fetchRoster } from './coursesSlice';
import { fetchStudents, fetchStudentAssignments } from '../students/studentsSlice';

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