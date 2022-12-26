import './App.css';
import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';
import { userAdded } from './features/users/usersSlice';
import { useDispatch } from 'react-redux';
import Header from './components/Header';
import Auth from './components/Auth';
import HomePage from './components/HomePage';
import CourseList from './features/courses/CourseList';
import CourseHome from './features/courses/CourseHome';
import CourseRoster from './features/courses/CourseRoster';
import StudentInfo from './features/students/StudentInfo';
import CourseGradebook from './features/courses/CourseGradebook';
import UserInfo from './features/users/UserInfo';
import StudentList from './features/students/StudentList';

function App() {

  const dispatch = useDispatch();

  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("/me").then((res) => {
        if (res.ok) {
          res.json().then((user) => 
            {setUser(user);
            dispatch(userAdded(user));
          });
        };
    });
  }, [dispatch]);

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
}

export default App;
