import React, { useState, Fragment } from 'react';
import firebase from 'firebase';

const Allergy = () => {
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    severity: 0,
    type: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const { name, date, severity, type } = formData;

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
        .child('patients/' + id + '/allergies')
        .push().key;
      let updates = {};
      updates['patients/' + id + '/allergies/' + key] = {
        ...formData,
      };
      firebase.database().ref().update(updates);
    }

    // clear form
    setFormData({
      name: '',
      date: '',
      severity: 0,
      type: '',
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
              <h1>Allergy</h1>
              <label>Allergy Name</label>
              <input
                type='text'
                name='name'
                value={name}
                onChange={onChange}
                placeholder='ex: peanut'
                required
              />
              <label>Date Discovered</label>
              <input
                type='date'
                name='date'
                value={date}
                onChange={onChange}
                required
              />
              <label>Severity</label>
              <select
                name='severity'
                value={severity}
                onChange={onChange}
                required
              >
                <option value=''></option>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
                <option value={6}>6</option>
                <option value={7}>7</option>
                <option value={8}>8</option>
                <option value={9}>9</option>
                <option value={10}>10</option>
              </select>
              <label>Type</label>
              <select name='type' value={type} onChange={onChange} required>
                <option value=''></option>
                <option value='contact'>contact</option>
                <option value='inhalation'>inhalation</option>
                <option value='ingestion'>ingestion</option>
              </select>
              <button type='submit' className='btn'>
                Add Allergy
              </button>
              {submitted && <p className='saved S'>Allergy Saved</p>}
            </div>
          </div>
        </div>
      </form>
    </Fragment>
  );
};

export default Allergy;
