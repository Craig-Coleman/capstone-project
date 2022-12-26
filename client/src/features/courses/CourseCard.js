import React from 'react';

function CourseCard({ course }) {



    return (
            <div>
            <h3>{course.title} - Period: {course.period} </h3>
        </div>
    );
};

export default CourseCard;