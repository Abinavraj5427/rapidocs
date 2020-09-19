import React, { Profiler } from 'react';
import { Route, Switch } from 'react-router-dom';
import Records from '../records/Records';
import Profile from '../profile/Profile';
import VerifyPhone from '../profile/VerifyPhone';
import MyDoctor from '../forms/MyDoctor';

const Routes = () => {
  return (
    <section className='container'>
      <Switch>
        <Route exact path='/records' component={Records} />
        <Route exact path='/doctors' component={MyDoctor} />
        <Route exact path='/profile' component={Profile} />
        <Route exact path='/verifyphone' component={VerifyPhone} />
      </Switch>
    </section>
  );
};

export default Routes;
