import './App.css';
import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';
import Header from './Header';
import Auth from './Auth';
import CourseList from './CourseList';
import CourseHome from './CourseHome';
import CourseRoster from './CourseRoster';
import StudentInfo from './StudentInfo';
import CourseGradebook from './CourseGradebook';
import UserInfo from './UserInfo';
import StudentList from './StudentList';

function App() {

  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("/me").then((res) => {
        if (res.ok) {
          res.json().then((user) => setUser(user));
        };
      });
  }, []);

  if (!user) 
    return (
      <div>
        <Auth setUser={setUser} />
      </div>
    );

  return (
    <div>
      <Header setUser={setUser} />
      <Route exact path="/">
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
        <UserInfo />
      </Route>
    </div>
  );
}

export default App;
