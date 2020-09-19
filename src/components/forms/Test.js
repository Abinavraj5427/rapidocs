import React, { useState } from 'react';
import firebase from 'firebase';
import { useHistory } from 'react-router-dom';

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
          const inputField = document.getElementById('fileInputID');
          let selectedFile = inputField.files[0];
          let storageRef = firebase
            .storage()
            .ref(id + '/tests/' + selectedFile.name);
          var upload = storageRef.put(selectedFile);
          //update progress bar
          upload.on(
            'state_changed',
            function progress(snapshot) {
              var percentage =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              //spinner can go here
            },

            function error() {
              alert('error uploading file');
            },

            function complete() {
              //remove spinner
              alert('File is uploaded');
            }
          );
          storageRef.getDownloadURL().then(function (url) {
            const key = firebase
              .database()
              .ref()
              .child('patients/' + id + '/tests')
              .push().key;
            let updates = {};
            updates['patients/' + id + '/tests/' + key] = {
              title: formData.title,
              date: formData.date,
              fileName: url,
            };
            firebase.database().ref().update(updates);
          });
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
          id='fileInputID'
          placeholder='File Associated'
          name='file'
          value={file}
          onChange={onChange}
          className='btn'
        />
      </div>
      <button type='submit' className='btn'>
        Add This Test
      </button>
    </form>
  );
};

export default TestForm;
