import React, { useState, Fragment } from 'react';
import firebase from 'firebase';

const Medication = () => {
  const [formData, setFormData] = useState({
    medicationName: '',
    doctor: '',
    reason: '',
    dosage: '',
    frequency: '',
    start: '',
    end: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const {
    medicationName,
    doctor,
    reason,
    dosage,
    frequency,
    start,
    end,
  } = formData;

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
        .child('patients/' + id + '/medications')
        .push().key;
      let updates = {};
      updates['patients/' + id + '/medications/' + key] = {
        ...formData,
      };
      firebase.database().ref().update(updates);
    }

    // clear form
    setFormData({
      medicationName: '',
      doctor: '',
      reason: '',
      dosage: '',
      frequency: '',
      start: '',
      end: '',
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
              <h1>Medication</h1>
              <label>Medication Name</label>
              <input
                type='text'
                name='medicationName'
                value={medicationName}
                onChange={onChange}
              />
              <label>Date Started</label>
              <input
                type='date'
                name='start'
                value={start}
                onChange={onChange}
              />
              <label>Date Ended</label>
              <input type='date' name='end' value={end} onChange={onChange} />
              <label>Doctor Who Prescribed</label>
              <input
                type='text'
                name='doctor'
                value={doctor}
                onChange={onChange}
              />
              <label>Reason</label>
              <input
                type='text'
                name='reason'
                value={reason}
                onChange={onChange}
              />
              <label>Frequency</label>
              <input
                type='text'
                name='frequency'
                value={frequency}
                onChange={onChange}
              />
              <label>Dosage</label>
              <input
                type='text'
                name='dosage'
                value={dosage}
                onChange={onChange}
              />
              <button type='submit' className='btn'>
                Add Medication
              </button>
            </div>
          </div>
        </div>
      </form>
    </Fragment>
  );
};

export default Medication;
