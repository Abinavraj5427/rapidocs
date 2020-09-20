import React, { useState, Fragment } from 'react';
import firebase from 'firebase';

const Medication = () => {
  const [formData, setFormData] = useState({
    name: '',
    doctor: '',
    reason: '',
    dosage: '',
    frequency: '',
    start: '',
    date: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const { name, doctor, reason, dosage, frequency, start, date } = formData;

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
      name: '',
      doctor: '',
      reason: '',
      dosage: '',
      frequency: '',
      start: '',
      date: '',
    });

    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <Fragment>
      <form className='form' onSubmit={onSubmit}>
        <div className='center'>
          <div className='verticalAlign'>
            <div className='tile'>
              <h1>Medication</h1>
              <label>Medication Name</label>
              <input
                type='text'
                name='name'
                value={name}
                onChange={onChange}
                required
              />
              <label>Date Started</label>
              <input
                type='date'
                name='start'
                value={start}
                onChange={onChange}
              />
              <label>Date Ended</label>
              <input type='date' name='date' value={date} onChange={onChange} />
              <label>Doctor Who Prescribed</label>
              <input
                type='text'
                name='doctor'
                value={doctor}
                onChange={onChange}
                required
              />
              <label>Reason</label>
              <input
                type='text'
                name='reason'
                value={reason}
                onChange={onChange}
                placeholder='ex: allergies'
                required
              />
              <label>Frequency</label>
              <input
                type='text'
                name='frequency'
                value={frequency}
                onChange={onChange}
                placeholder='ex: 2x per week'
                required
              />
              <label>Dosage</label>
              <input
                type='text'
                name='dosage'
                value={dosage}
                onChange={onChange}
                placeholder='ex: 200mg'
                required
              />
              <button type='submit' className='btn'>
                Add Medication
              </button>
              {submitted && <p className='saved S'>Medication Saved</p>}
            </div>
          </div>
        </div>
      </form>
    </Fragment>
  );
};

export default Medication;
