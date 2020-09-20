import React, { useEffect, useState, useContext } from "react";
// import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
// import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import firebase from "firebase";
import { MenuContext } from "react-flexible-sliding-menu";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Navbar() {
  const { toggleMenu } = useContext(MenuContext);

  const classes = useStyles();
  const [loggedIn, setLoggedIn] = useState(false);
  // const history = useHistory();

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      //true if user is an object, false otherwise
      // setIsSignedIn(!!user);
      if (!!user) {
        setLoggedIn(true);
      } else setLoggedIn(false);
    });
  }, []);

  return (
    <div className={classes.root}>
      <AppBar position="static" color="transparent">
        <Toolbar>
          {loggedIn && (
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
              onClick={toggleMenu}
            >
              <MenuIcon />
            </IconButton>
          )}
          <h1>the rapidocs solution</h1>
        </Toolbar>
      </AppBar>
    </div>
  );
}
