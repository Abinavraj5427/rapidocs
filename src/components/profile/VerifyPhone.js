import React, { useEffect } from "react";
import firebaseConfig from "../../firebase";
import firebase from "firebase";
import * as firebaseui from "firebaseui";

const VerifyPhone = () => {
  useEffect(() => {
    const uiConfig = {
      //   signInSuccessUrl: "https://netflix-clone-ankur.herokuapp.com/", //This URL is used to return to that page when we got success response for phone authentication.
      signInOptions: [firebase.auth.PhoneAuthProvider.PROVIDER_ID],
      signInFlow: "popup",
      //   tosUrl: "https://netflix-clone-ankur.herokuapp.com/",
    };

    var ui = new firebaseui.auth.AuthUI(firebase.auth());
    ui.start("#firebaseui-auth-container", uiConfig);
  }, []);

  return (
    <form id="profile">
      {/* <h1>REACT PHONE AUTHENTICATION</h1> */}
      <div id="firebaseui-auth-container"></div>
    </form>
  );
};

export default VerifyPhone;
