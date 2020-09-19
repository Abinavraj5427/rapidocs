import React, { Fragment, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { useHistory } from "react-router-dom";
import "./styles/App.css";
import Routes from "./components/routing/Routes";
import Landing from "./components/layout/Landing";
import Navbar from "./components/layout/Navbar";
import firebase from "firebase";
import MenuProvider from "react-flexible-sliding-menu";
import Menu from "./components/layout/Menu";

const App = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      //true if user is an object, false otherwise
      setIsSignedIn(!!user);
    });
  }, []);

  // tests whether isSignedIn changed
  // useEffect(() => {
  //   console.log(isSignedIn);
  //   if (isSignedIn) console.log(firebase.auth().currentUser.displayName);
  // }, [isSignedIn]);

  return (
    <Router>
      <Fragment>
        <MenuProvider MenuComponent={Menu} animation="push">
          <Navbar />
          <Switch>
            <Route exact path="/" component={Landing}>
              {isSignedIn && <Redirect to="/records" />}
            </Route>
            <Route component={Routes} />
          </Switch>
        </MenuProvider>
      </Fragment>
    </Router>
  );
};

export default App;
