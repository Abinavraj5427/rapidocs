import React, { useState, Fragment } from 'react';
import firebase from 'firebase';

const Diagnosis = () => {
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    type: '',
    doctor: '',
    severity: 0,
    file: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const { name, date, type, doctor, severity, file } = formData;

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
              type: formData.type,
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
      name: '',
      date: '',
      type: '',
      doctor: '',
      severity: 0,
      file: '',
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
              <h1>Diagnosis</h1>
              <label>Condition Name</label>
              <input
                type='text'
                name='name'
                value={name}
                onChange={onChange}
                required
              />
              <label>Date Discovered</label>
              <input
                type='date'
                name='date'
                value={date}
                onChange={onChange}
                required
              />
              <label>Doctor Who Diagnosed You</label>
              <input
                type='text'
                name='doctor'
                value={doctor}
                onChange={onChange}
              />
              <label>Type of Diagnosis</label>
              <select name='type' value={type} onChange={onChange} required>
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
              <label>Severity</label>
              <select
                name='severity'
                value={severity}
                onChange={onChange}
                required
              >
                <option value=''></option>
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
              {submitted && <p className='saved S'>Diagnosis Saved</p>}
            </div>
          </div>
        </div>
      </form>
    </Fragment>
  );
};

export default Diagnosis;
