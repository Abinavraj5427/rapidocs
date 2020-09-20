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

let TimelineRoot = document.createElement('VerticalTimeline');
TimelineRoot.setAttribute("layout", "1-column"); 
let entries = []; 
const Timeline = () => {
    useEffect(() => {
        console.log("Is anything happening anymore?"); 
        firebase.auth().onAuthStateChanged((user) => {
            let id = 0;
            if (user) {
                id = user.uid;
                let storageRef = firebase.database().ref('patients/' + id + "/allergies/");
                storageRef.once('value', function (snapshot) {
                    snapshot.forEach(function (childSnapshot) {
                        entries.push(childSnapshot);
                        console.log(childSnapshot.child('date').val()); 
                    });
                });
                storageRef = firebase.database().ref('patients/' + id + "/appointments/");
                storageRef.once('value', function (snapshot) {
                    snapshot.forEach(function (childSnapshot) {
                        entries.push(childSnapshot);
                    });
                });
                storageRef = firebase.database().ref('patients/' + id + "/diagnosis/");
                storageRef.once('value', function (snapshot) {
                    snapshot.forEach(function (childSnapshot) {
                        entries.push(childSnapshot);
                    });
                });
                storageRef = firebase.database().ref('patients/' + id + "/medications/");
                storageRef.once('value', function (snapshot) {
                    snapshot.forEach(function (childSnapshot) {
                        entries.push(childSnapshot);
                    });
                });
                storageRef = firebase.database().ref('patients/' + id + "/procedures/");
                storageRef.once('value', function (snapshot) {
                    snapshot.forEach(function (childSnapshot) {
                        entries.push(childSnapshot);
                    });
                });
                storageRef = firebase.database().ref('patients/' + id + "/tests/");
                storageRef.once('value', function (snapshot) {
                    snapshot.forEach(function (childSnapshot) {
                        entries.push(childSnapshot);
                    });
                });
                entries.sort((a, b) => b.date - a.date); 
                console.log(entries); 
            }
        }); 
    }, []);

    return <VerticalTimeline layout="1-column">{
        entries.map(entry => (
            <VerticalTimelineElement
                contentStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
                date="2011 - present"
                iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
            >
                <h3 className="vertical-timeline-element-title">Creative Director</h3>
                <h4 className="vertical-timeline-element-subtitle">Miami, FL</h4>>
                <h3> Hello World </h3> 
            </VerticalTimelineElement>
        ))
    }</VerticalTimeline>; 

    /*return (<VerticalTimeline>
        <VerticalTimelineElement
            className="vertical-timeline-element--work"
            contentStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
            contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
            date="2011 - present"
            iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
        >
            <h3 className="vertical-timeline-element-title">Creative Director</h3>
            <h4 className="vertical-timeline-element-subtitle">Miami, FL</h4>
            <p>
                Creative Direction, User Experience, Visual Design, Project Management, Team Leading
    </p>
        </VerticalTimelineElement>
        <VerticalTimelineElement
            className="vertical-timeline-element--work"
            date="2010 - 2011"
            iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
        >
            <h3 className="vertical-timeline-element-title">Art Director</h3>
            <h4 className="vertical-timeline-element-subtitle">San Francisco, CA</h4>
            <p>
                Creative Direction, User Experience, Visual Design, SEO, Online Marketing
    </p>
        </VerticalTimelineElement>
        <VerticalTimelineElement
            className="vertical-timeline-element--work"
            date="2008 - 2010"
            iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
        >
            <h3 className="vertical-timeline-element-title">Web Designer</h3>
            <h4 className="vertical-timeline-element-subtitle">Los Angeles, CA</h4>
            <p>
                User Experience, Visual Design
    </p>
        </VerticalTimelineElement>
        <VerticalTimelineElement
            className="vertical-timeline-element--work"
            date="2006 - 2008"
            iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
        >
            <h3 className="vertical-timeline-element-title">Web Designer</h3>
            <h4 className="vertical-timeline-element-subtitle">San Francisco, CA</h4>
            <p>
                User Experience, Visual Design
    </p>
        </VerticalTimelineElement>
        <VerticalTimelineElement
            className="vertical-timeline-element--education"
            date="April 2013"
            iconStyle={{ background: 'rgb(233, 30, 99)', color: '#fff' }}
        >
            <h3 className="vertical-timeline-element-title">Content Marketing for Web, Mobile and Social Media</h3>
            <h4 className="vertical-timeline-element-subtitle">Online Course</h4>
            <p>
                Strategy, Social Media
    </p>
        </VerticalTimelineElement>
        <VerticalTimelineElement
            className="vertical-timeline-element--education"
            date="November 2012"
            iconStyle={{ background: 'rgb(233, 30, 99)', color: '#fff' }}
        >
            <h3 className="vertical-timeline-element-title">Agile Development Scrum Master</h3>
            <h4 className="vertical-timeline-element-subtitle">Certification</h4>
            <p>
                Creative Direction, User Experience, Visual Design
    </p>
        </VerticalTimelineElement>
        <VerticalTimelineElement
            className="vertical-timeline-element--education"
            date="2002 - 2006"
            iconStyle={{ background: 'rgb(233, 30, 99)', color: '#fff' }}
        >
            <h3 className="vertical-timeline-element-title">Bachelor of Science in Interactive Digital Media Visual Imaging</h3>
            <h4 className="vertical-timeline-element-subtitle">Bachelor Degree</h4>
            <p>
                Creative Direction, Visual Design
    </p>
        </VerticalTimelineElement>
        <VerticalTimelineElement
            iconStyle={{ background: 'rgb(16, 204, 82)', color: '#fff' }}
        />
    </VerticalTimeline>); */
} 

export default Timeline;

