import React from "react";
// import { Image, Col, FormControl } from 'react-bootstrap';
import InputGroup from "react-bootstrap/InputGroup";
import profile from "../../assets/Design2.PNG";
import firebase from "firebase";

const Profile = () => {
  return (
    <div id='profile'>
        <div id = "profile_col">
            <div className = "profile_sep">
                <h1>Profile</h1>
            </div>
            <div className = "profile_sep">
                <img
                src={firebase.auth().currentUser.photoURL}
                id="profile_img"
                alt="Profile"
                >
                </img>
            </div>
            <br/>
            <div className="profile_sep">
                <label>Name</label>
                <input
                    placeholder={
                    firebase.auth().currentUser.displayName
                        ? firebase.auth().currentUser.displayName
                        : "Enter Name"
                    }
                ></input>
            </div>
            <br/>
            <div className = "profile_sep">
                <input placeholder = "phone number"></input>
            </div>
            <br/>
            <div className = "profile_sep">
                <label>Date of Birth</label>
                <input type="date"></input>
            </div>
            
            <br/>
            <div className = "profile_sep">
                <label>Pharmacy</label>
                <input placeholder = "999-999-999"></input>
            </div>
            
            <br/>
            <div className = "profile_sep">
                <label>Insurance</label>
                <input placeholder = "999-999-999"></input>
            </div>
        </div>
    </div>
  );
};

export default Profile;
