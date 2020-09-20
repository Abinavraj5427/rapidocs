import React, { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
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
  const [landAt, setLandAt] = useState("/");
  const history = useHistory();

  useEffect(() => {
    if (firebase.auth().currentUser) setLandAt("/records");
    else setLandAt("/");
  }, [firebase.auth().currentUser]);

  return (
    <div className={classes.root}>
      <AppBar position="static" color="transparent">
        <Toolbar>
          {landAt == "/records" && (
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
