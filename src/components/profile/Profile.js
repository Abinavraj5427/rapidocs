import React from "react";
// import { Image, Col, FormControl } from 'react-bootstrap';
import InputGroup from "react-bootstrap/InputGroup";
import profile from "../../assets/Design2.PNG";
import firebase from "firebase";

const Profile = () => {
  return (
    <div id="profile">
      <div id="profile_col">
        <div className="profile_sep">
          <h1>Profile</h1>
        </div>
        <div className="profile_sep">
          <img
            src={
              !!firebase.auth().currentUser
                ? firebase.auth().currentUser.photoURL
                : profile
            }
            id="profile_img"
            alt="Profile"
          ></img>
        </div>
        <br />
        <div className="profile_sep">
          <label>Name</label>
          <input
            placeholder="enter name"
            value={
              !!firebase.auth().currentUser &&
              firebase.auth().currentUser.displayName
                ? firebase.auth().currentUser.displayName
                : undefined
            }
          ></input>
        </div>
        <br />
        <div className="profile_sep">
          <label>Phone Number</label>
          <input
            placeholder="999-999-9999"
            value={
              !!firebase.auth().currentUser &&
              firebase.auth().currentUser.phoneNumber
                ? firebase.auth().currentUser.phoneNumber
                : undefined
            }
          ></input>
        </div>
        <br />
        <div className="profile_sep">
          <label>Date of Birth</label>
          <input type="date"></input>
        </div>

        <br />
        <div className="profile_sep">
          <label>Pharmacy</label>
          <input placeholder="Address"></input>
          <input placeholder="City"></input>
          <input placeholder="State"></input>
          <input type="number" placeholder="PIN"></input>
        </div>

        <br />
        <div className="profile_sep">
          <label>Insurance</label>
          <input placeholder="ex. Blue Cross Blue Shield"></input>
        </div>
      </div>
    </div>
  );
};

export default Profile;
