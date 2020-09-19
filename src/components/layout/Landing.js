import React, { useCallback, useState, useEffect } from "react";
import firebase from "firebase";
import firebaseui from "firebaseui";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

const Landing = () => {
  //configuration for the google, email, and phone authentication
  const uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
      signInSuccess: () => false,
    },
  };

  // useEffect(() => {
  //   firebase.auth().onAuthStateChanged((user) => {
  //     // Google user signed in. Check if phone number added.
  //     if (!user.phoneNumber) {
  //       // Ask user for phone number.
  //       var phoneNumber = window.prompt("Provide your phone number");
  //       // You also need to provide a button element signInButtonElement
  //       // which the user would click to complete sign-in.
  //       // Get recaptcha token. Let's use invisible recaptcha and hook to the button.
  //       var appVerifier = new firebase.auth.RecaptchaVerifier(
  //         <button>Sign in</button>,
  //         { size: "invisible" }
  //       );
  //       // This will wait for the button to be clicked the reCAPTCHA resolved.
  //       return user
  //         .linkWithPhoneNumber(phoneNumber, appVerifier)
  //         .then(function (confirmationResult) {
  //           // Ask user to provide the SMS code.
  //           var code = window.prompt("Provide your SMS code");
  //           // Complete sign-in.
  //           return confirmationResult.confirm(code);
  //         });
  //     }
  //   });
  // }, []);

  return (
    <div className="landing">
      <div className="landing-inner">
        <h1 className="L">rapidocs</h1>
        <p className="S">never fill out medical forms twice</p>
        <div className="buttons">
          <StyledFirebaseAuth
            uiConfig={uiConfig}
            firebaseAuth={firebase.auth()}
          />
        </div>
      </div>
    </div>
  );
};

export default Landing;
