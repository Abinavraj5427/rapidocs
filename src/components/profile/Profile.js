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
            type = "text"
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
            type = "text"
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
            <input type = "text" placeholder="Address"></input> 
            <br/>
            <div className = "input_rows">
                <input type = "text" placeholder="City"></input>
                <input type = "text" placeholder="State"></input>
                <input type="number" placeholder="Zip"></input>
            </div>
            
        </div>

        <br />
        <div className="profile_sep">
          <label>Insurance</label>
          <input type = "text" placeholder="ex. Blue Cross Blue Shield"></input>
        </div>

        
        <input type = "submit" value = "Save"></input>
      </div>

    </div>
  );
};

export default Profile;
