import React, { useEffect } from "react";
import firebaseConfig from "../../firebase";
import firebase from "firebase";
import * as firebaseui from "firebaseui";
import Dialog from "@material-ui/core/Dialog";

const VerifyPhone = (open, newPhoneNum) => {
  // const [open, setOpen] = React.useState(false);

  useEffect(() => {
    // const uiConfig = {
    //   //   signInSuccessUrl: "https://netflix-clone-ankur.herokuapp.com/", //This URL is used to return to that page when we got success response for phone authentication.
    //   signInOptions: [firebase.auth.PhoneAuthProvider.PROVIDER_ID],
    //   signInFlow: "popup",
    //   //   tosUrl: "https://netflix-clone-ankur.herokuapp.com/",
    // };

    // var ui = new firebaseui.auth.AuthUI(firebase.auth());
    // ui.start("#firebaseui-auth-container", uiConfig);
    if (open) {
      var applicationVerifier = new firebase.auth.RecaptchaVerifier(
        "recaptcha-container"
      );
      var provider = new firebase.auth.PhoneAuthProvider();
      console.log(`+1${newPhoneNum}`);
      provider
        .verifyPhoneNumber(`+1${newPhoneNum}`, applicationVerifier)
        .then(function (verificationId) {
          var verificationCode = window.prompt(
            "Please enter the verification " +
              "code that was sent to your mobile device."
          );
          return firebase.auth.PhoneAuthProvider.credential(
            verificationId,
            verificationCode
          );
        })
        .then(function (phoneCredential) {
          return firebase
            .auth()
            .currentUser.linkWithCredential(phoneCredential);
        })
        .catch((error) =>
          window.alert(`Error in phone number input: ${error}`)
        );
    }
  }, [open]);

  return (
    // <form id="profile">
    //   {/* <h1>REACT PHONE AUTHENTICATION</h1> */}
    //   <div id="firebaseui-auth-container"></div>
    // </form>
    <Dialog open={open}>
      <div id="recaptcha-container" />
    </Dialog>
  );
};

export default VerifyPhone;
