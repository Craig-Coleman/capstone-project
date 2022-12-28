import React from 'react';
import { NavLink } from "react-router-dom";

function NavBar() {

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
        </div>
    );
};

export default NavBar;