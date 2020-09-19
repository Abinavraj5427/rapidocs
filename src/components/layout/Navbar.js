import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className='navbar'>
      <Link to='/'>Logo</Link>
      <div className='links'>
        <Link to='/' className='link'>
          Medical Records
        </Link>
        <Link to='/' className='link'>
          Profile
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
