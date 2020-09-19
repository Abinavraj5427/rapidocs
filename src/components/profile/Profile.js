import React from 'react';
// import { Image, Col, FormControl } from 'react-bootstrap';
import InputGroup from 'react-bootstrap/InputGroup'
import profile from '../../assets/Design1.PNG';


const Landing = () => {
  return (
    <div id = "profile">
        <h1>Profile</h1>
        <img src = {profile} id = "profile_img" alt = "Profile Image"></img>

            
    </div>
  );
};

export default Landing;
