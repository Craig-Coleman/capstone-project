import React, { useEffect } from 'react';
import CourseCard from './CourseCard';
import { useSelector, useDispatch } from 'react-redux'
import { fetchCourses } from './coursesSlice';
import { fetchStudents } from '../students/studentsSlice';

function CourseList() {
    const courses = useSelector((state) => state.courses.courses);
    const courseAssignments = useSelector((state) => state.courses.assignments)
    const students = useSelector((state) => state.students.students)
    const studentAssignments = useSelector((state) => state.students.assignments)
    console.log(studentAssignments)


    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCourses());
    }, [dispatch]);

    useEffect(() => {
        dispatch(fetchStudents());
    }, [dispatch]);

    return(
        <div>
            <h1>CourseList</h1>
            <CourseCard courses={courses} assignments={courseAssignments} students={students} sAssignments={studentAssignments} />
        </div>
    );
};

export default CourseList;