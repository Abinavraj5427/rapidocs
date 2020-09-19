import React, { useState, useEffect } from "react";
// import { Image, Col, FormControl } from 'react-bootstrap';
import InputGroup from "react-bootstrap/InputGroup";
import profile from "../../assets/Design2.PNG";
import firebase from "firebase";

const Profile = () => {
  const [data, setData] = useState({
    name: undefined,
    phone: undefined,
    birthday: undefined,
    pharmacyAddress: undefined,
    pharmacyCity: undefined,
    pharmacyState: undefined,
    pharmacyZip: undefined,
    insurance: undefined,
  });

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

    // applicationVerifier = new firebase.auth.RecaptchaVerifier(
    //   "recaptcha-container"
    // );
    // provider = new firebase.auth.PhoneAuthProvider();
    // provider
    //   .verifyPhoneNumber("+16505550101", applicationVerifier)
    //   .then(function (verificationId) {
    //     var verificationCode = window.prompt(
    //       "Please enter the verification " +
    //         "code that was sent to your mobile device."
    //     );
    //     return firebase.auth.PhoneAuthProvider.credential(
    //       verificationId,
    //       verificationCode
    //     );
    //   })
    //   .then(function (phoneCredential) {
    //     return firebase.auth().signInWithCredential(phoneCredential);
    //   });
  }, [firebase.auth().currentUser]);

  const handleSubmit = (event) => {};
  const handleChange = (event) => {
    setData({ value: event.target.value });
  };
  return (
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
            value={data.name}
            onChange={handleChange}
          ></input>
        </div>
        <br />
        <div className="profile_sep">
          <label>Phone Number</label>
          <input
            type="text"
            placeholder="999-999-9999"
            value={data.phone}
          ></input>
        </div>
        <br />
        <div className="profile_sep">
          <label>Date of Birth</label>
          <input type="date" value={data.birthday}></input>
        </div>

        <br />
        <div className="profile_sep">
          <label>Address</label>
          <input type="text" placeholder="Address"></input>
          <br />
          <div className="input_rows">
            <input type="text" placeholder="City"></input>
            <input type="text" placeholder="State"></input>
            <input type="number" placeholder="Zip"></input>
          </div>
        </div>

        <br />
        <div className="profile_sep">
          <label>Pharmacy</label>
          <input
            type="text"
            placeholder="Address"
            value={data.pharmacyAddress}
          ></input>
          <br />
          <div className="input_rows">
            <input
              type="text"
              placeholder="City"
              value={data.pharmacyCity}
            ></input>
            <input
              type="text"
              placeholder="State"
              value={data.pharmacyState}
            ></input>
            <input
              type="number"
              placeholder="Zip"
              value={data.pharmacyZip}
            ></input>
          </div>
        </div>

        <br />

        <div className="profile_sep">
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
        </div>

        <br />
        <div className="profile_sep">
          <label>Insurance</label>
          <input
            type="text"
            placeholder="ex. Blue Cross Blue Shield"
            value={data.insurance}
          ></input>
        </div>

        {/* <div id="recaptcha-container"></div> */}

        <input type="submit" value="Save"></input>
      </div>
    </form>
  );
};

export default Profile;
