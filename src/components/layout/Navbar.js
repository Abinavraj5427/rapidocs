import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import firebase from "firebase";

const Navbar = () => {
  // console.log("hi\n\n\n\n" + firebase.auth().currentUser);
  const [landAt, setLandAt] = useState("/");
  const history = useHistory();

  useEffect(() => {
    if (firebase.auth().currentUser) setLandAt("/records");
    else setLandAt("/");
  }, [firebase.auth().currentUser]);
  return (
    <nav className="navbar">
      <Link to={landAt}>Logo</Link>
      {landAt == "/records" && history.push("/records")}
      {firebase.auth().currentUser != null && (
        <div className="links">
          <Link to="/records" className="link S">
            My Records
          </Link>
          <Link to="/doctors" className="link S">
            My Doctors
          </Link>
          <Link to="/profile" className="link S">
            My Profile
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
