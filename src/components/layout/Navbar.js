import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className='navbar'>
      <Link to='/'>Logo</Link>
      <div className='links'>
        <Link to='/'>Medical Records</Link>
        <Link to='/'>Profile</Link>
      </div>
    </nav>
  );
};

export default Navbar;
