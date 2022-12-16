import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import CourseNavBar from './CourseNavBar';

function CourseHome() {

    const dispatch = useDispatch();

    return(
        <div>
            <CourseNavBar />
            <h1>CourseHome</h1>
        </div>
    );
};

export default CourseHome;