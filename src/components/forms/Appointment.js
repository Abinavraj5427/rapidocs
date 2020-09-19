import React, { useState, Fragment } from 'react';
import firebase from 'firebase';

const Appointment = () => {
  const [formData, setFormData] = useState({
    practice: '',
    doctor: '',
    date: '',
    time: '',
    reason: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const { practice, doctor, date, time, reason } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    let user = firebase.auth().currentUser;
    if (user) {
      const id = user.uid;
      const key = firebase
        .database()
        .ref()
        .child('patients/' + id + '/appointments')
        .push().key;
      let updates = {};
      updates['patients/' + id + '/appointments/' + key] = {
        ...formData,
      };
      firebase.database().ref().update(updates);
    }

    // clear form
    setFormData({
      practice: '',
      doctor: '',
      date: '',
      time: '',
      reason: '',
    });

    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <Fragment>
      {submitted && <p className='saved S'>Procedure Saved</p>}
      <form className='form' onSubmit={onSubmit}>
        <div className='center'>
          <div className='verticalAlign'>
            <div className='tile'>
              <h1>Appointment</h1>
              <label>Practice</label>
              <input
                type='text'
                name='practice'
                value={practice}
                onChange={onChange}
              />
              <label>Doctor</label>
              <input
                type='text'
                name='doctor'
                value={doctor}
                onChange={onChange}
              />
              <label>Date</label>
              <input type='date' name='date' value={date} onChange={onChange} />
              <label>Time</label>
              <input type='time' name='time' value={time} onChange={onChange} />
              <label>Reason</label>
              <input
                type='text'
                name='reason'
                value={reason}
                onChange={onChange}
              />
              <button type='submit' className='btn'>
                Add Appointment
              </button>
            </div>
          </div>
        </div>
      </form>
    </Fragment>
  );
};

export default Appointment;
