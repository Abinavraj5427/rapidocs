import React from 'react';
import firebase from 'firebase';

const Diagnosis = () => {
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
      <div>Diagnosis</div>
    </form>
  );
};

export default Diagnosis;
