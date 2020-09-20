import React, { useState, useEffect } from 'react';
import firebase from 'firebase';

const MyDoctor = () => {
  const [doctors, setDoctors] = useState([]);

  const [formData, setFormData] = useState({
    name: '',
    specialty: '',
    phone: '',
  });

  const { name, specialty, phone } = formData;

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
        .child('patients/' + id + '/doctors')
        .push().key;
      let updates = {};
      updates['patients/' + id + '/doctors/' + key] = {
        ...formData,
      };
      firebase.database().ref().update(updates);
    }

    // clear form
    setFormData({
      name: '',
      specialty: '',
      phone: '',
    });
  };

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      console.log(1);
      const id = user.uid;
      firebase
        .database()
        .ref(`patients/${id}`)
        .once('value')
        .then(function (snapshot) {
          if (snapshot.val().doctors) setDoctors(snapshot.val().doctors);
        });
    });
  }, [doctors]);

  return (
    <form className='form' id='doctor_form' onSubmit={onSubmit}>
      <div className='center'>
        <h1>My Doctors</h1>
        <div className='verticalAlign'>
          {doctors &&
            Object.keys(doctors).map(i => (
              <div className='tile'>
                <h2>{doctors[i].name}</h2>
                <label> {doctors[i].specialty} </label>
                <br />
                <label> {doctors[i].phone} </label>
              </div>
            ))}

          <div className='tile'>
            <label>Name</label>
            <input
              type='text'
              name='name'
              value={name}
              onChange={onChange}
              required
            />
            <label>Field of Practice</label>
            <select
              name='specialty'
              value={specialty}
              onChange={onChange}
              required
            >
              <option value=''></option>
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
            <label>Phone</label>
            <input
              type='text'
              name='phone'
              value={phone}
              onChange={onChange}
              required
            />
            <button type='submit' className='btn'>
              Add Doctor
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default MyDoctor;
