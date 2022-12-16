import React from 'react';
import { NavLink } from "react-router-dom";

function CourseNavBar() {
    return (
        <div id="navbar">
        <NavLink
            className="navlink" 
            to="/coursehome"
            exact
            activeStyle={{
                background: "darkblue",
            }}
        >
            Course Home
        </NavLink>
        <NavLink
            className="navlink" 
            to="/coursegradebook"
            exact
            activeStyle={{
                background: "darkblue",
            }}
        >
            Course Gradebook
        </NavLink>
        <NavLink
            className="navlink"
            to="/courseroster"
            exact
            activeStyle={{
                background: "darkblue",
            }}
        >
            Course Roster
        </NavLink>
    </div>
    );
};

export default CourseNavBar;