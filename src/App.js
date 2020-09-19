import React, { Fragment, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./styles/App.css";
import Routes from "./components/routing/Routes";
import Landing from "./components/layout/Landing";
import Navbar from "./components/layout/Navbar";
import Profile from "./components/profile/Profile";
import firebase from "firebase";
import db from "./firebase";
import MyDoctor from "./components/forms/MyDoctor";

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
        <Navbar />

        <Switch>
          <Route exact path="/" component={Landing} />
          <Route path="/profile" component={Profile} />
          <Route path="/docs" component={MyDoctor} />
          <Route component={Routes} />
        </Switch>
      </Fragment>
    </Router>
  );
};

export default App;
