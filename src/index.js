import React from "react";
import ReactDOM from "react-dom";
// import MenuProvider from "react-flexible-sliding-menu";
import App from "./App";
// import Menu from "./components/layout/Menu";

ReactDOM.render(
  <React.StrictMode>
    {/* <MenuProvider MenuComponent={Menu} animation="push"> */}
    <App />
    {/* </MenuProvider> */}
  </React.StrictMode>,
  document.getElementById("root")
);
