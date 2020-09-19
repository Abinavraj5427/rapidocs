import React from 'react';
import { Image, Col, FormControl } from 'react-bootstrap';
import InputGroup from 'react-bootstrap/InputGroup'
import profile from '../../assets/Design1.PNG';


const Landing = () => {
  return (
    <div id = "profile">
        <h1>Profile</h1>
        <Col xs={6} md={4}>

            <Image src={profile} roundedCircle />

            <InputGroup className="mb-3">
                <InputGroup.Prepend>
                    <InputGroup.Text id="inputGroup-sizing-default">Phone</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
                />
            </InputGroup>

            <InputGroup className="mb-3">
                <InputGroup.Prepend>
                    <InputGroup.Text id="inputGroup-sizing-default">Date of Birth</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
                />
            </InputGroup>

            <InputGroup className="mb-3">
                <InputGroup.Prepend>
                    <InputGroup.Text id="inputGroup-sizing-default">Address</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
                />
            </InputGroup>

        </Col>
    </div>
  );
};

export default Landing;
