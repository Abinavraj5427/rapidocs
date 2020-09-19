import React, { useCallback, useState, useEffect } from 'react';
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
        // code to push formData to DB
      }}
    >
      <div className='form-group'>
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
        <input
          type='text'
          placeholder='File Associated'
          name='file'
          value={file}
          onChange={onChange}
        />
      </div>
    </form>
  );
};

export default TestForm;
