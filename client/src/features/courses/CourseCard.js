import React from 'react';

function CourseCard( courses={courses} ) {

    const courseList = (courses) ? "Courses Loading" : courses.map((course) => { return ( <li key={course.id}>{course.title}</li>)})

    return (
            <div>
            <h1>CourseCard</h1>
            {courseList}
        </div>
    );
};

export default CourseCard;