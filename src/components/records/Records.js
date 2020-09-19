import React, { useState } from 'react';
import Test from '../forms/Test';
import Procedure from '../forms/Procedure';
import Medication from '../forms/Medication';
import Allergy from '../forms/Allergy';
import Diagnosis from '../forms/Diagnosis';
import Appointment from '../forms/Appointment';
import SpeedDial from '../layout/SpeedDial'; 
import ReactDOM from "react-dom";
import { Link, useLocation, BrowserRouter as Router } from "react-router-dom";

function useQuery() {
    return new URLSearchParams(useLocation().search); 
}

const Records = () => {
    let query = useQuery(); 
    const currentForm = query.get("form"); 
    //const [currentForm, setCurrentForm] = useState('Test');
  

  return (
    <div>
      <SpeedDial />
      <p className='M'>Medical Records</p>
      {currentForm == 'Test' && <Test />}
      {currentForm == 'Procedure' && <Procedure />}
      {currentForm == 'Medication' && <Medication />}
      {currentForm == 'Allergy' && <Allergy />}
      {currentForm == 'Diagnosis' && <Diagnosis />}
      {currentForm == 'Appointment' && <Appointment />}
    </div>
  );
};

export default Records;
