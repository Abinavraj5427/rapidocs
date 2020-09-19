import React, { useState } from 'react';
import Test from '../forms/Test';
import Procedure from '../forms/Procedure';
import Medication from '../forms/Medication';
import Allergy from '../forms/Allergy';
import Diagnosis from '../forms/Diagnosis';
import Appointment from '../forms/Appointment';
import SpeedDialToolTip from '../layout/SpeedDial';
import ReactDOM from 'react-dom';
import { Link, useLocation, BrowserRouter as Router } from 'react-router-dom';

const Records = () => {
  const [currentForm, setCurrentForm] = useState('Test');

  return (
    <div>
      <SpeedDialToolTip setCurrentForm={setCurrentForm} />
      {/* <p className='M'>Medical Records</p> */}
      {currentForm === 'Test' && <Test />}
      {currentForm === 'Procedure' && <Procedure />}
      {currentForm === 'Medication' && <Medication />}
      {currentForm === 'Allergy' && <Allergy />}
      {currentForm === 'Diagnosis' && <Diagnosis />}
      {currentForm === 'Appointment' && <Appointment />}
    </div>
  );
};

export default Records;
