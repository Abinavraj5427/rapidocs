import React, { useState, Fragment } from 'react';
import firebase from 'firebase';
import { render } from '@testing-library/react';

const Procedure = () => {
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    location: '',
    type: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const { title, date, location, type } = formData;

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
        .child('patients/' + id + '/procedures')
        .push().key;
      let updates = {};
      updates['patients/' + id + '/procedures/' + key] = {
        ...formData,
      };
      firebase.database().ref().update(updates);
    }

    // clear form
    setFormData({
      title: '',
      date: '',
      location: '',
      type: '',
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
              <h1>Procedure</h1>
              <label>Procedure Title</label>
              <input
                type='text'
                name='title'
                value={title}
                onChange={onChange}
              />
              <label>Date Conducted</label>
              <input type='date' name='date' value={date} onChange={onChange} />
              <label>Location</label>
              <input
                type='text'
                name='location'
                value={location}
                onChange={onChange}
              />
              <label>Type of Procedure</label>
              <input type='text' name='type' value={type} onChange={onChange} />
              <button type='submit' className='btn'>
                Add Procedure
              </button>
            </div>
          </div>
        </div>
      </form>
    </Fragment>
  );
};

export default Procedure;
