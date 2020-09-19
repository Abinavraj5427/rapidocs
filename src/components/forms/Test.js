import React, { useState, Fragment } from 'react';
import firebase from 'firebase';
import { useHistory } from 'react-router-dom';

const TestForm = props => {
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    file: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const { title, date, file } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    let user = firebase.auth().currentUser;
    if (user) {
      const id = user.uid;
      const inputField = document.getElementById('fileInputID');
      let selectedFile = inputField.files[0];
      let storageRef = firebase
        .storage()
        .ref(id + '/tests/' + selectedFile.name);
      const uploadTask = storageRef.put(selectedFile);
      //update progress bar
      uploadTask.on(
        'state_changed',
        function (snapshot) {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          var progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
              console.log('Upload is paused');
              break;
            case firebase.storage.TaskState.RUNNING: // or 'running'
              console.log('Upload is running');
              break;
            default:
              break;
          }
        },
        function (error) {
          // Handle unsuccessful uploads
        },
        function () {
          // Handle successful uploads on complete
          uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
            const key = firebase
              .database()
              .ref()
              .child('patients/' + id + '/tests')
              .push().key;
            let updates = {};
            updates['patients/' + id + '/tests/' + key] = {
              title: formData.title,
              date: formData.date,
              fileName: downloadURL,
            };
            firebase.database().ref().update(updates);
          });
        }
      );
    }

    // clear form
    setFormData({
      title: '',
      date: '',
      file: '',
    });

    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <Fragment>
      <form className='form' id='doctor_form' onSubmit={onSubmit}>
        <div className='center'>
          <div className='verticalAlign'>
            <div className='tile'>
              <h1>Test</h1>
              <label>Test Title</label>
              <input
                type='text'
                name='title'
                value={title}
                onChange={onChange}
              />
              <label>Date Conducted</label>
              <input type='date' name='date' value={date} onChange={onChange} />
              <label>Test Results File</label>
              <input
                type='file'
                name='file'
                value={file}
                onChange={onChange}
                id='fileInputID'
              />
              <button type='submit' className='btn'>
                Add Test
              </button>
              {submitted && <p className='saved S'>Test Saved</p>}
            </div>
          </div>
        </div>
      </form>
    </Fragment>
  );
};

export default TestForm;
