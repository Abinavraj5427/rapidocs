import React from 'react';
import { Image, Col } from 'react-bootstrap';
import profile from '../../assets/Design1.PNG';


const Landing = () => {
  return (
    <div id = "profile">
        <h1>Profile</h1>
        <Col xs={6} md={4}>
            <Image src={profile} roundedCircle />
        </Col>
    </div>
  );
};

export default Landing;
