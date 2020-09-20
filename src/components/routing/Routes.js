import React, { Profiler } from "react";
import { Route, Switch } from "react-router-dom";
import Records from "../records/Records";
import Profile from "../profile/Profile";
import VerifyPhone from "../profile/VerifyPhone";
import MyDoctor from "../forms/MyDoctor";
import Login from "../layout/Login";
import AdminRegister from "../admin/AdminRegister";
import AdminDashboard from "../admin/Dashboard";
// import ViewTimeline from "../timeline/ViewTimeline";

const Routes = () => {
  return (
    <section>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/adminregister" component={AdminRegister} />
        <Route exact path="/admin" component={AdminDashboard} />
        <Route exact path="/records" component={Records} />
        <Route exact path="/doctors" component={MyDoctor} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/verifyphone" component={VerifyPhone} />
        <Route path="/profile" component={Profile} />
        {/* <Route path="/timeline" component={ViewTimeline} /> */}
      </Switch>
    </section>
  );
};

export default Routes;
