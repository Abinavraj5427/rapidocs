import React, { Profiler } from 'react';
import { Route, Switch } from 'react-router-dom';
import Records from '../records/Records';
import Profile from '../profile/Profile';

const Routes = () => {
  return (
    <section className='container'>
      <Switch>
        <Route exact path='/records' component={Records} />
        <Route exact path='/profile' component={Profile} />
      </Switch>
    </section>
  );
};

export default Routes;
