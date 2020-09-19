import React from 'react';
import { Link } from 'react-router-dom';
import firebase from 'firebase';

const Navbar = () => {
  // console.log("hi\n\n\n\n" + firebase.auth().currentUser);
  return (
    <nav className='navbar'>
      <Link to='/'>Logo</Link>
      {firebase.auth().currentUser != null && (
        <div className='links'>
          <Link to='/records' className='link S'>
            My Records
          </Link>
          <Link to='/doctors' className='link S'>
            My Doctors
          </Link>
          <Link to='/profile' className='link S'>
            My Profile
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
