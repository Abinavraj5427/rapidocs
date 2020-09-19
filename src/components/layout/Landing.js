import React, { useCallback, useState, useEffect } from "react";
import firebase from "firebase";
// import firebaseui from "firebaseui";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

const Landing = () => {
  //configuration for the google, email, and phone authentication
  const uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
      firebase.auth.PhoneAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
      signInSuccess: () => false,
    },
  };

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
