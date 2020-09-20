import React, { Fragment, useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import './styles/App.css';
import Routes from './components/routing/Routes';
import Landing from './components/layout/Landing';
import Navbar from './components/layout/Navbar';
import firebase from 'firebase';
import MenuProvider from 'react-flexible-sliding-menu';
import Menu from './components/layout/Menu';

const App = () => {
  const [userType, setUser] = useState(null);
  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      //true if user is an object, false otherwise
      // setIsSignedIn(!!user);
      if (!!user) {
        if (user.email === 'admin@admin.com') setUser('admin');
        else setUser('patient');
      }
    });
  }, []);

  return (
    <Router>
      <Fragment>
        <MenuProvider MenuComponent={Menu} animation='push'>
          <Navbar />
          <Switch>
            <Route exact path='/' component={Landing}>
              {userType ? (
                userType === 'patient' ? (
                  <Redirect to='/profile' />
                ) : (
                  <Redirect to='/admin' />
                )
              ) : (
                console.log('home')
              )}
            </Route>
            <Route component={Routes} />
          </Switch>
        </MenuProvider>
      </Fragment>
    </Router>
  );
};

export default App;
