import React, { useContext, useState, useEffect } from "react";
import { MenuContext } from "react-flexible-sliding-menu";
import { useHistory } from "react-router-dom";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import firebase from "firebase";

function Menu() {
  const { closeMenu } = useContext(MenuContext);
  const [currentUser, setCurrentUser] = useState(null);
  const history = useHistory();

  useEffect(() => {
    let currUser = firebase.auth().currentUser;

    if (currUser) {
      if (currUser.email === "admin@admin.com") setCurrentUser("admin");
      else setCurrentUser("patient");
    }
  }, [firebase.auth().currentUser]);

  const handleLogout = () => {
    firebase
      .auth()
      .signOut()
      .then(function () {
        // Sign-out successful.
        history.push("/login");
        closeMenu();
      })
      .catch(function (error) {
        // An error happened.
        console.log(error);
      });
  };
  return (
    <div className="Menu">
      <h1>Menu</h1>
      <div className="header">
        <IconButton id="closemenu" color="inherit" onClick={closeMenu}>
          <CloseIcon />
        </IconButton>
      </div>
      <div className="links">
        {currentUser === "patient" && (
          <div>
            <p
              onClick={() => history.push("/timeline")}
              className="menu-link link S"
            >
              My Timeline
            </p>
            <p
              onClick={() => history.push("/records")}
              className="menu-link link S"
            >
              My Records
            </p>
            <p
              onClick={() => history.push("/doctors")}
              className="menu-link link S"
            >
              My Doctors
            </p>
            <p
              onClick={() => history.push("/profile")}
              className="menu-link link S"
            >
              My Profile
            </p>
          </div>
        )}
        <p onClick={handleLogout} className="menu-link link S">
          Log Out
        </p>
      </div>
    </div>
  );
}

export default Menu;
