import React, { useState, Fragment } from 'react';
import firebase from 'firebase';

const Diagnosis = () => {
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    doctor: '',
    severity: 0,
    file: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const { name, date, doctor, severity, file } = formData;

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
              .child('patients/' + id + '/diagnosis')
              .push().key;
            let updates = {};
            updates['patients/' + id + '/diagnosis/' + key] = {
              name: formData.name,
              date: formData.date,
              doctor: formData.doctor,
              severity: formData.severity,
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
      {submitted && <p className='saved S'>Procedure Saved</p>}
      <form className='form' onSubmit={onSubmit}>
        <div className='center'>
          <div className='verticalAlign'>
            <div className='tile'>
              <h1>Diagnosis</h1>
              <label>Condition Name</label>
              <input type='text' name='name' value={name} onChange={onChange} />
              <label>Date Discovered</label>
              <input type='date' name='date' value={date} onChange={onChange} />
              <label>Doctor Who Diagnosed You</label>
              <input
                type='text'
                name='doctor'
                value={doctor}
                onChange={onChange}
              />
              <label>Severity</label>
              <select name='severity' value={severity} onChange={onChange}>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
                <option value={6}>6</option>
                <option value={7}>7</option>
                <option value={8}>8</option>
                <option value={9}>9</option>
                <option value={10}>10</option>
              </select>
              <label>Diagnosis File</label>
              <input
                type='file'
                name='file'
                value={file}
                onChange={onChange}
                id='fileInputID'
              />
              <button type='submit' className='btn'>
                Add Diagnosis
              </button>
            </div>
          </div>
        </div>
      </form>
    </Fragment>
  );
};

export default Diagnosis;
