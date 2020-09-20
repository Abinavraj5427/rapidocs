import React from "react";
import { useHistory } from "react-router-dom";
import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const Login = () => {
  const history = useHistory();
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
  React.useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      //true if user is an object, false otherwise
      if (!!user) history.push("/records");
    });
  }, []);

  const handleSubmit = () => {
    console.log("form entered");
    history.push("/admin");
  };

  return (
    <div className="login-container">
      <div className="login">
        <h2>User Sign Up/Login</h2>
        <StyledFirebaseAuth
          uiConfig={uiConfig}
          firebaseAuth={firebase.auth()}
        />
      </div>
      <div className="login">
        <form onSubmit={handleSubmit}>
          <h2>Admin Sign Up/Login</h2>
          <TextField
            id="filled-username-input"
            className="admin-auth"
            label="Username"
            variant="filled"
          />
          <br />
          <TextField
            id="filled-password-input"
            className="admin-auth"
            label="Password"
            type="password"
            autoComplete="current-password"
            variant="filled"
          />
          <br />
          <div className="btn-container admin-auth">
            <Button variant="contained" onClick={handleSubmit}>
              Log in
            </Button>
            <Button
              variant="contained"
              onClick={() => history.push("/adminregister")}
            >
              Sign up
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
