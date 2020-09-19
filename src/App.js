import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './styles/App.css';
import Routes from "./components/routing/Routes";
import Landing from "./components/layout/Landing";
import Navbar from "./components/layout/Navbar";
import Profile from "./components/profile/Profile";
import db from "./firebase";

const App = () => {
  useEffect(() => {
    db.ref("patients/7139923350")
      .once("value")
      .then(function (snapshot) {
        console.log(snapshot.val());
      });
  }, []);
  return (
    <Router>
      <Fragment>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route path="/profile" component={Profile} />
          <Route component={Routes} />
        </Switch>
      </Fragment>
    </Router>
  );
};

export default App;
