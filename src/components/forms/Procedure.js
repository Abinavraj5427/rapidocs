import React, { useState } from 'react';
import firebase from 'firebase';

const Procedure = () => {
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
          firebase
            .database()
            .ref('patients/' + id)
            .set(formData);
        }
      }}
    >
      <div>Procedure</div>
    </form>
  );
};

export default Procedure;
