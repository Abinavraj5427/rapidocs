import React, { useContext } from "react";
import { MenuContext } from "react-flexible-sliding-menu";
import { useHistory } from "react-router-dom";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";

function Menu() {
  const { closeMenu } = useContext(MenuContext);
  const history = useHistory();
  return (
    <div className="Menu">
      <div className="header">
        <h1>Menu</h1>
        <IconButton id="closemenu" color="inherit" onClick={closeMenu}>
          <CloseIcon />
        </IconButton>
      </div>
      <div className="links">
        <p onClick={() => history.push("/records")} className="link S">
          My Records
        </p>
        <p onClick={() => history.push("/doctors")} className="link S">
          My Doctors
        </p>
        <p onClick={() => history.push("/profile")} className="link S">
          My Profile
        </p>
      </div>
    </div>
  );
}

export default Menu;
