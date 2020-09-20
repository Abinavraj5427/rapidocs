import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const Login = () => {
  const history = useHistory();
  // const username = useRef();
  // const password = useRef();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [errorMsg, setErrorMsg] = useState(null);

  //configuration for the google, email, and phone authentication
  const uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
      // firebase.auth.PhoneAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
      signInSuccess: () => false,
    },
  };

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      //true if user is an object, false otherwise
      if (!!user) {
        if (user.email === "admin@admin.com") history.push("/admin");
        else history.push("/profile");
      }
    });
  }, []);

  const handleSubmit = (event) => {
    // setOpen(true);
    event.preventDefault();

    firebase
      .auth()
      .signInWithEmailAndPassword(formData.username, formData.password)
      .then(() => {
        history.push("/admin");
      })
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;

        setErrorMsg(errorCode + ": " + errorMessage);

        // ...
      });
  };

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
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
        <form>
          <h2>Admin Sign Up/Login</h2>
          <TextField
            id="filled-username-input"
            className="admin-auth"
            label="Username"
            variant="filled"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
          <br />
          <TextField
            id="filled-password-input"
            className="admin-auth"
            label="Password"
            type="password"
            autoComplete="current-password"
            variant="filled"
            name="password"
            value={formData.passsword}
            onChange={handleChange}
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
          {errorMsg && <p className="admin-auth">{errorMsg}</p>}
        </form>
      </div>
    </div>
  );
};

export default Login;
