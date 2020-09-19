import React, { useState } from 'react';
import firebase from 'firebase';

const TestForm = props => {
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    file: '',
  });

  const { title, date, file } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <form
      className='form'
      onSubmit={e => {
        e.preventDefault();
        let user = firebase.auth().currentUser;
        if (user) {
          const id = user.uid;
          const key = firebase
            .database()
            .ref()
            .child('patients/' + id + '/tests')
            .push().key;
          let updates = {};
          updates['patients/' + id + '/tests/' + key] = { ...formData };
          firebase.database().ref().update(updates);
        }
      }}
    >
      <div className='form-group'>
        <label className='S'>Test Name</label>
        <input
          type='text'
          placeholder='Test Title'
          name='title'
          value={title}
          onChange={onChange}
          required
        />
      </div>
      <div className='form-group'>
        <label className='S'>Test Date</label>
        <input
          type='date'
          placeholder='Test Date'
          name='date'
          value={date}
          onChange={onChange}
          required
        />
      </div>
      <div className='form-group'>
        <label className='S'>Test Results File</label>
        <input
          type='file'
          placeholder='File Associated'
          name='file'
          value={file}
          onChange={onChange}
          className='btn'
        />
      </div>
      <input type='submit' className='btn' />
    </form>
  );
};

export default TestForm;
