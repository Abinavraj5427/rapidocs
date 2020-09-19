import React from 'react';
import firebase from 'firebase';

const Medication = () => {
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
      <div>Medication</div>
    </form>
  );
};

export default Medication;
