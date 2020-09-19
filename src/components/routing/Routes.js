import React from 'react';
import { Route, Switch } from 'react-router-dom';

const Routes = () => {
  return (
    <section className='container'>
      <Switch>
        {/* examples routes */}
        {/* <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <PrivateRoute exact path="/dashboard" component={Dashboard} /> */}
      </Switch>
    </section>
  );
};

export default Routes;
