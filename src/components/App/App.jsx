import React, { useEffect } from 'react';
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import AboutPage from '../AboutPage/AboutPage';
import UserPage from '../UserPage/UserPage';
import InfoPage from '../InfoPage/InfoPage';
import LandingPage from '../LandingPage/LandingPage';
import LoginPage from '../LoginPage/LoginPage';
// import RegisterPage from '../RegisterPage/RegisterPage';
//import components 
import HomePage from '../HomePage/HomePage';
import Profile from '../Profile/Profile';
import CareTeam from '../CareTeam/CareTeam'
import CareTeamForm from '../CareTeamForm/CareTeamForm'
import CareVault from '../CareVault/CareVault'
import LovedOneForm from '../LovedOneForm/LovedOneForm'
import Messages from '../Messages/Messages'
import NewUserForm from '../NewUserForm/NewUserForm'

// Step components for registration process
import RegisterPage from '../RegisterPage/RegisterPage';
import RegisterPage1 from '../RegisterPage/RegisterPage1';
import RegisterPage2 from '../RegisterPage/RegisterPage2';
import RegisterPage3 from '../RegisterPage/RegisterPage3';
// import RegisterPage4 from '../RegisterPage/RegisterPage4';


import './App.css';

function App() {
  const dispatch = useDispatch();

  const user = useSelector(store => store.user);

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
  }, [dispatch]);

  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          {/* Visiting localhost:5173 will redirect to localhost:5173/home */}
          <Redirect exact from="/" to="/home" />

          {/* Visiting localhost:5173/about will show the about page. */}
          <Route
            // shows AboutPage at all times (logged in or not)
            exact
            path="/about"
          >
            <AboutPage />
          </Route>

          {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:5173/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:5173/user */}
          <ProtectedRoute
            // logged in shows UserPage else shows LoginPage
            exact
            path="/user"
          >
            <UserPage />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows HomePage
            exact
            path="/homepage"
          >
            <HomePage />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows HomePage
            exact
            path="/profile"
          >
            <Profile />
          </ProtectedRoute>

          {/* CareTeam component */}
          <ProtectedRoute
            // logged in shows HomePage
            exact
            path="/careteam"
          >
            <CareTeam />
          </ProtectedRoute>

          {/* CareVault component */}
          <ProtectedRoute
            // logged in shows HomePage
            exact
            path="/carevault"
          >
            <CareVault />
          </ProtectedRoute>

          {/* messages component */}
          <ProtectedRoute
            // logged in shows HomePage
            exact
            path="/messages"
          >
            <Messages />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows InfoPage else shows LoginPage
            exact
            path="/info"
          >
            <InfoPage />
          </ProtectedRoute>

          <ProtectedRoute
            exact
            path="/careteamform"
          >
            <CareTeamForm />
          </ProtectedRoute>

          <ProtectedRoute
            exact
            path="/lovedoneform"
          >
            <LovedOneForm />
          </ProtectedRoute>

          <ProtectedRoute
            exact
            path="/newuserform"
          >
            <NewUserForm />
          </ProtectedRoute>

          <Route
            exact
            path="/login"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect to the /user page
              <Redirect to="/user" />
              :
              // Otherwise, show the login page
              <LoginPage />
            }
          </Route>

          <Route
            exact
            path="/registration"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect them to the /user page
              <Redirect to="/user" />
              :
              // Otherwise, show the registration page
              <RegisterPage />
            }
          </Route>

          <Route
            exact
            path="/home"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect them to the /user page
              <Redirect to="/user" />
              :
              // Otherwise, show the Landing page
              <LandingPage />
            }
          </Route>

             {/* New registration steps */}


             <Route exact path="/registerpage/registerpage1">
            <RegisterPage1 />
          </Route>

          <Route exact path="/registerpage/registerpage2">
            <RegisterPage2 />
          </Route>

          <Route exact path="/registerpage/registerpage3">
            <RegisterPage3 />
          </Route>

          {/* <Route exact path="/registerpage/registerpage4">
            <RegisterPage4 />
          </Route> */}

        
          
          {/* If none of the other routes matched, we will show a 404. */}
          <Route>
            <h1>404</h1>
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
