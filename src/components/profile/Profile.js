import React, { useState, useEffect } from "react";
// import { Image, Col, FormControl } from 'react-bootstrap';
import InputGroup from "react-bootstrap/InputGroup";
import profile from "../../assets/Design2.PNG";
import firebase from "firebase";
import db from "../../firebase";
import VerifyPhone from "./VerifyPhone";

const Profile = () => {
  const [data, setData] = useState({
    name: undefined,
    phone: undefined,
    birthday: undefined,
    address: undefined,
    city: undefined,
    state: undefined,
    zip: undefined,
    pharmacyAddress: undefined,
    pharmacyCity: undefined,
    pharmacyState: undefined,
    pharmacyZip: undefined,
    pharmacyName: undefined,
    pharmacyPhone: undefined,
    insurance: undefined,
  });

  const {
    name,
    phone,
    birthday,
    address,
    city,
    state,
    zip,
    pharmacyAddress,
    pharmacyCity,
    pharmacyState,
    pharmacyZip,
    pharmacyName,
    pharmacyPhone,
    insurance,
  } = data;

  useEffect(() => {
    if (
      !!firebase.auth().currentUser &&
      firebase.auth().currentUser.displayName
    )
      setData({ name: firebase.auth().currentUser.displayName });
    if (
      !!firebase.auth().currentUser &&
      firebase.auth().currentUser.phoneNumber
    )
      setData({ phone: firebase.auth().currentUser.phoneNumber });
  }, [firebase.auth().currentUser]);

  const handleSubmit = (event) => {
    // setOpen(true);
    event.preventDefault();
    console.log(data);
    let user = firebase.auth().currentUser;
    if (user) {
      let uid = user.uid;
      db.ref(`patients/${uid}`).update(data);
    }
  };
  const handleChange = (event) => {
    console.log([event.target.name]);
    setData({ ...data, [event.target.name]: event.target.value });
  };
  return (
    <div>
      {/* <VerifyPhone open={open} newPhoneNum={phone} /> */}
      <form id="profile" onSubmit={handleSubmit}>
        <div id="profile_col">
          <div className="profile_sep"></div>
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
              type="text"
              placeholder="enter name"
              value={name}
              onChange={handleChange}
              required
            ></input>
          </div>
          <br />
          <div className="profile_sep">
            <label>Phone Number</label>
            <input
              type="text"
              placeholder="999-999-9999"
              value={phone}
              onChange={handleChange}
              required
            ></input>
          </div>
          <br />
          <div className="profile_sep">
            <label>Date of Birth</label>
            <input
              type="date"
              value={birthday}
              onChange={handleChange}
              required
            ></input>
          </div>

          <br />
          <div className="profile_sep">
            <label>Address</label>
            <input
              type="text"
              placeholder="Address"
              value={address}
              onChange={handleChange}
              required
            ></input>
            <br />
            <div className="input_rows">
              <input
                type="text"
                placeholder="City"
                value={city}
                onChange={handleChange}
                required
              ></input>
              <input
                type="text"
                placeholder="State"
                value={state}
                onChange={handleChange}
                required
              ></input>
              <input
                type="number"
                placeholder="Zip"
                value={zip}
                onChange={handleChange}
                required
              ></input>
            </div>
          </div>

          <br />
          <div className="profile_sep">
            <label>Pharmacy</label>
            <input
              type="text"
              placeholder="Address"
              value={pharmacyAddress}
              onChange={handleChange}
              required
            ></input>
            <br />
            <div className="input_rows">
              <input
                type="text"
                placeholder="City"
                value={pharmacyCity}
                onChange={handleChange}
                required
              ></input>
              <input
                type="text"
                placeholder="State"
                value={pharmacyState}
                onChange={handleChange}
                required
              ></input>
              <input
                type="number"
                placeholder="Zip"
                value={pharmacyZip}
                onChange={handleChange}
                required
              ></input>
            </div>
            <div className="input_rows">
              <input
                type="text"
                placeholder="Pharmacy Name"
                value={pharmacyName}
                onChange={handleChange}
                required
              ></input>
              <input
                type="number"
                placeholder="Pharmacy Phone"
                value={pharmacyPhone}
                onChange={handleChange}
                required
              ></input>
            </div>
          </div>

          <br />

          {/* <div className="profile_sep">
            <label>Pharmacy</label>
            <input type="text" placeholder="Address"></input>
            <br />
            <div className="input_rows">
              <input type="text" placeholder="City"></input>
              <input type="text" placeholder="State"></input>
              <input type="number" placeholder="Zip"></input>
            </div>
            <div className="input_rows">
              <input type="text" placeholder="Pharmacy Name"></input>
              <input type="number" placeholder="Pharmacy Phone"></input>
            </div>
          </div> */}

          <br />
          <div className="profile_sep">
            <label>Insurance</label>
            <input
              type="text"
              placeholder="ex. Blue Cross Blue Shield"
              value={insurance}
              onChange={handleChange}
              required
            ></input>
          </div>

          {/* <div id="recaptcha-container" /> */}

          <input type="submit" value="Save"></input>
        </div>
      </form>
    </div>
  );
};

export default Profile;
