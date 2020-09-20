import React, { useEffect, useState, useContext } from "react";
import firebase from 'firebase';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { makeStyles } from '@material-ui/core/styles';
import { faVial } from '@fortawesome/free-solid-svg-icons';
import { faPills } from '@fortawesome/free-solid-svg-icons';
import { faAllergies } from '@fortawesome/free-solid-svg-icons';
import { faCommentMedical } from '@fortawesome/free-solid-svg-icons';
import { faProcedures } from '@fortawesome/free-solid-svg-icons';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Timeline = () => {
    const [entries, setEntries] = useState([]);
    useEffect(() => {
        console.log("Why am I not getting here?");
        firebase.auth().onAuthStateChanged((user) => {
            let id = 0;
            if (user) {
                id = user.uid;
                let storageRef = firebase.database().ref('patients/' + id + "/allergies/");
                storageRef.once('value', function (snapshot) {
                    snapshot.forEach(function (childSnapshot) {
                        setEntries([...entries, [childSnapshot, 'allergy']]); 
                        console.log(childSnapshot.child('date').val()); 
                    });
                });
                storageRef = firebase.database().ref('patients/' + id + "/appointments/");
                storageRef.once('value', function (snapshot) {
                    snapshot.forEach(function (childSnapshot) {
                        setEntries([...entries, [childSnapshot, 'appointment']]); 
                    });
                });
                storageRef = firebase.database().ref('patients/' + id + "/diagnosis/");
                storageRef.once('value', function (snapshot) {
                    snapshot.forEach(function (childSnapshot) {
                        setEntries([...entries, [childSnapshot, 'diagnosis']]); 
                    });
                });
                storageRef = firebase.database().ref('patients/' + id + "/medications/");
                storageRef.once('value', function (snapshot) {
                    snapshot.forEach(function (childSnapshot) {
                        setEntries([...entries, [childSnapshot, 'medication']]); 
                    });
                });
                storageRef = firebase.database().ref('patients/' + id + "/procedures/");
                storageRef.once('value', function (snapshot) {
                    snapshot.forEach(function (childSnapshot) {
                        setEntries([...entries, [childSnapshot, 'procedure']]); 
                    });
                });
                storageRef = firebase.database().ref('patients/' + id + "/tests/");
                storageRef.once('value', function (snapshot) {
                    snapshot.forEach(function (childSnapshot) {
                        setEntries([...entries, [childSnapshot, 'test']]); 
                    });
                });
                entries.sort((a, b) => b[0].child('date').val() - a[0].child('date').val());
                console.log(entries); 
            }
        });
    }, []);

    return <VerticalTimeline layout="1-column">{
        entries.map(entry => (
            <VerticalTimelineElement
                contentStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
                date = {entry[0].child('date').val()} 
                iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                icon={decideIcon(entry[1])}
            >
                <h3 className="vertical-timeline-element-title">Creative Director</h3>
                <h4 className="vertical-timeline-element-subtitle">Miami, FL</h4>
                <h3> Hello World </h3>
            </VerticalTimelineElement>
        ))
    }</VerticalTimeline>;
}

function decideIcon(type) {
    if(type==='allergy')
        return <FontAwesomeIcon
        icon={faAllergies}
      />; 
      if(type==='diagnosis')
      return <FontAwesomeIcon
      icon={faCommentMedical}
    />; 
    if(type==='medication')
        return <FontAwesomeIcon
        icon={faPills}
      />; 
      if(type==='procedure')
        return <FontAwesomeIcon
        icon={faProcedures}
      />; 
      if(type==='appointment')
        return <FontAwesomeIcon
        icon={faCalendar}
      />; 
      if(type==='test')
        return <FontAwesomeIcon
        icon={faVial}
      />; 
}

export default Timeline;

