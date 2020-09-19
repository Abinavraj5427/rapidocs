import React from 'react';
import firebase from 'firebase';

const Appointment = () => {
  return (
    <form
      className='form'
      onSubmit={e => {
        e.preventDefault();
        let user = firebase.auth().currentUser;
        if (user) {
          const phoneNumber = user.phoneNumber;
          firebase
            .database()
            .ref('patients/' + phoneNumber)
            .set(formData);
        }
      }}
    >
      <div>Appointment</div>
    </form>
  );
};

export default Appointment;
