import React, { useState, Fragment } from 'react';
import firebase from 'firebase';

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
              <select name='type' value={type} onChange={onChange}>
                <option value='Cardiology'>Cardiology</option>
                <option value='Dentistry'>Dentistry</option>
                <option value='Dermatology'>Dermatology</option>
                <option value='Endocrinology'>Endocrinology</option>
                <option value='Gastroenterology'>Gastroenterology</option>
                <option value='Gynocology'>Gynocology</option>
                <option value='Hematology'>Hematology</option>
                <option value='Neurology'>Neurology</option>
                <option value='Oncology'>Oncology</option>
                <option value='Opthalmology'>Opthalmology</option>
                <option value='Optometry'>Optometry</option>
                <option value='Orthopedic'>Orthopedic</option>
                <option value='Orthodontistry'>Orthodontistry</option>
                <option value='Pediatric'>Pediatric</option>
                <option value='Podiatry'>Podiatry</option>
                <option value='Pulmonology'>Pulmonology</option>
                <option value='Psychiatry'>Psychiatry</option>
                <option value='Psychology'>Psychology</option>
                <option value='Radiology'>Radiology</option>
                <option value='Rheumatology'>Rheumatology</option>
                <option value='Urology'>Urology</option>
              </select>
              <button type='submit' className='btn'>
                Add Procedure
              </button>
              {submitted && <p className='saved S'>Procedure Saved</p>}
            </div>
          </div>
        </div>
      </form>
    </Fragment>
  );
};

export default Procedure;
