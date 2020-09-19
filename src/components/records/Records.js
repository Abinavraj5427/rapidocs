import React, { useState } from 'react';
import Test from '../forms/Test';
import Procedure from '../forms/Procedure';
import Medication from '../forms/Medication';
import Allergy from '../forms/Allergy';
import Diagnosis from '../forms/Diagnosis';
import Appointment from '../forms/Appointment';
import SpeedDial from '../layout/SpeedDial'; 

const Records = () => {
  const [currentForm, setCurrentForm] = useState('Test');

  const onChange = e => setCurrentForm(e.target.value);

  return (
    <div>
      <p className='M'>Medical Records</p>
      <select value={currentForm} onChange={onChange}>
        <option value='Test'>Test</option>
        <option value='Procedure'>Procedure</option>
        <option value='Medication'>Medication</option>
        <option value='Allergy'>Allergy</option>
        <option value='Diagnosis'>Diagnosis</option>
        <option value='Appointment'>Appointment</option>
      </select>
      {currentForm == 'Test' && <Test />}
      {currentForm == 'Procedure' && <Procedure />}
      {currentForm == 'Medication' && <Medication />}
      {currentForm == 'Allergy' && <Allergy />}
      {currentForm == 'Diagnosis' && <Diagnosis />}
      {currentForm == 'Appointment' && <Appointment />}
      <SpeedDial />
    </div>
  );
};

export default Records;
