import React, { useEffect, useState, useContext } from 'react';
import firebase from 'firebase';
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { makeStyles } from '@material-ui/core/styles';
import { faVial } from '@fortawesome/free-solid-svg-icons';
import { faPills } from '@fortawesome/free-solid-svg-icons';
import { faAllergies } from '@fortawesome/free-solid-svg-icons';
import { faCommentMedical } from '@fortawesome/free-solid-svg-icons';
import { faProcedures } from '@fortawesome/free-solid-svg-icons';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

let store = [];
const Timeline = ({ uid }) => {
  const [entries, setEntries] = useState([]);
  const [done, setDone] = useState(false);

  function sortFunction(a, b) {
    if (a[0].child('date').val() > b[0].child('date').val()) return -1;
    if (a[0].child('date').val() < b[0].child('date').val()) return 1;
    return 0;
  }

  useEffect(() => {
    entries.sort(sortFunction);
    setTimeout(() => setDone(true), 500);
  }, [entries]);

  useEffect(() => {
    setEntries([...entries].sort(sortFunction));
    store = [];
  }, [done]);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      let id = 0;
      if (user) {
        if (uid === 0) id = user.uid;
        else id = uid;
        let storageRef = firebase
          .database()
          .ref('patients/' + id + '/allergies/');
        storageRef.once('value', function (snapshot) {
          snapshot.forEach(function (childSnapshot) {
            let el = [childSnapshot, 'Allergy'];
            setEntries([...store, el]);
            store.push(el);
          });
        });
        storageRef = firebase
          .database()
          .ref('patients/' + id + '/appointments/');
        storageRef.once('value', function (snapshot) {
          snapshot.forEach(function (childSnapshot) {
            let el = [childSnapshot, 'Appointment'];
            setEntries([...store, el]);
            store.push(el);
          });
        });
        storageRef = firebase.database().ref('patients/' + id + '/diagnosis/');
        storageRef.once('value', function (snapshot) {
          snapshot.forEach(function (childSnapshot) {
            let el = [childSnapshot, 'Diagnosis'];
            setEntries([...store, el]);
            store.push(el);
          });
        });
        storageRef = firebase
          .database()
          .ref('patients/' + id + '/medications/');
        storageRef.once('value', function (snapshot) {
          snapshot.forEach(function (childSnapshot) {
            let el = [childSnapshot, 'Medication'];
            setEntries([...store, el]);
            store.push(el);
          });
        });
        storageRef = firebase.database().ref('patients/' + id + '/procedures/');
        storageRef.once('value', function (snapshot) {
          snapshot.forEach(function (childSnapshot) {
            let el = [childSnapshot, 'Procedure'];
            setEntries([...store, el]);
            store.push(el);
          });
        });
        storageRef = firebase.database().ref('patients/' + id + '/tests/');
        storageRef.once('value', function (snapshot) {
          snapshot.forEach(function (childSnapshot) {
            let el = [childSnapshot, 'Test'];
            setEntries([...store, el]);
            store.push(el);
          });
        });
      }
    });
  }, []);

  return (
    <div>
      {entries && entries.length > 0 && (
        <VerticalTimeline layout='1-column'>
          {entries.map(entry => (
            <VerticalTimelineElement
              contentStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
              contentArrowStyle={{
                borderRight: '7px solid  rgb(33, 150, 243)',
              }}
              date={entry[0].child('date').val()}
              iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
              icon={decideIcon(entry[1])}
            >
              <h3 className='vertical-timeline-element-title'>{entry[1]}</h3>
              <h4 className='vertical-timeline-element-subtitle'>
                {decideDescription(entry[0], entry[1])}
              </h4>
            </VerticalTimelineElement>
          ))}
        </VerticalTimeline>
      )}
    </div>
  );
};

function decideIcon(type) {
  if (type === 'Allergy') return <FontAwesomeIcon icon={faAllergies} />;
  if (type === 'Diagnosis') return <FontAwesomeIcon icon={faCommentMedical} />;
  if (type === 'Medication') return <FontAwesomeIcon icon={faPills} />;
  if (type === 'Procedure') return <FontAwesomeIcon icon={faProcedures} />;
  if (type === 'Appointment') return <FontAwesomeIcon icon={faCalendar} />;
  if (type === 'Test') return <FontAwesomeIcon icon={faVial} />;
}

function decideDescription(data, type) {
  if (type === 'Allergy')
    return (
      'You have an ' +
      data.child('name').val() +
      ' ' +
      data.child('type').val() +
      ' allergy.'
    );
  if (type === 'Diagnosis')
    return (
      'You were diagnosed with ' +
      data.child('name').val() +
      ' by Dr. ' +
      data.child('doctor').val()
    );
  if (type === 'Medication')
    return (
      'You are taking ' +
      data.child('name').val() +
      ' at a dosage of ' +
      data.child('dosage').val() +
      ' and frequency of ' +
      data.child('frequency').val()
    );
  if (type === 'Procedure')
    return (
      'You had a ' +
      data.child('title').val() +
      ' at ' +
      data.child('location').val()
    );
  if (type === 'Appointment')
    return (
      'You have an appointment with Dr. ' +
      data.child('doctor').val() +
      ' at ' +
      data.child('time').val() +
      ' because of ' +
      data.child('reason').val()
    );
  if (type === 'Test')
    return 'You had a ' + data.child('title').val() + ' test performed.';
}

export default Timeline;
