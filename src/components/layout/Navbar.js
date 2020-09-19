import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className='navbar'>
      <Link to='/'>Logo</Link>
      <div className='links'>
        <Link to='/records' className='link S'>
          Records
        </Link>
        <Link to='/profile' className='link S'>
          Profile
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
