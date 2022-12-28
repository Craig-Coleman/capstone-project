import React from 'react';
import { Route, NavLink } from "react-router-dom";
import HomePage from './HomePage';
import CourseList from '../features/courses/CourseList';
import CourseHome from '../features/courses/CourseHome';
import CourseRoster from '../features/courses/CourseRoster';
import StudentInfo from '../features/students/StudentInfo';
import CourseGradebook from '../features/courses/CourseGradebook';
import UserInfo from '../features/users/UserInfo';
import StudentList from '../features/students/StudentList';

function NavBar({ setUser }) {

    return(
        <div id="navbar">
            <NavLink
                className="navlink" 
                to="/userinfo"
                exact
                activeStyle={{
                    background: "darkblue",
                }}
            >
                User Profile
            </NavLink>
            <NavLink
                className="navlink" 
                to="/courselist"
                exact
                activeStyle={{
                    background: "darkblue",
                }}
            >
                Course List
            </NavLink>
            <NavLink
                className="navlink"
                to="/studentlist"
                exact
                activeStyle={{
                    background: "darkblue",
                }}
            >
                Student List
            </NavLink>
            <Route exact path="/">
                <HomePage />
            </Route>
            <Route path="/courselist">
                <CourseList />
            </Route>
            <Route path="/coursehome">
                <CourseHome />
            </Route>
            <Route path="/courseroster">
                <CourseRoster />
            </Route>
            <Route path="/studentlist">
                <StudentList />
            </Route>
            <Route path="/studentinfo">
                <StudentInfo />
            </Route>
            <Route path="/coursegradebook">
                <CourseGradebook />
            </Route>
            <Route path="/userinfo">
                <UserInfo setUser={setUser} />
            </Route>
        </div>
    );
};

export default NavBar;