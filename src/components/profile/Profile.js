import React from 'react';
import profile from '../../assets/Design1.PNG';

const Profile = () => {
  return (
    <div id='profile'>
      <h1>Profile</h1>
      <img src={profile} id='profile_img' alt='Profile Image'></img>
    </div>
  );
};

export default Profile;
