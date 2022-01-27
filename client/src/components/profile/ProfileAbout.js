import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const ProfileAbout = ({
  profile: {
    bio,
    skills,
    user: { name },
  },
}) => {
  return (
    <div class='profile-about bg-light p-2'>
      <h2 class='text-primary'>{name.trim().split(' ')[0]}'s Bio</h2>
      <p>{bio && bio}</p>
      <div class='line'></div>
      <h2 class='text-primary'>Skill Set</h2>
      <div class='skills'>
        {skills.length > 0 ? (
          skills.map((skill, index) => {
            return (
              <div className='p-1' key={index}>
                <i class='fa fa-check'></i>
                {skill}
              </div>
            );
          })
        ) : (
          <Fragment></Fragment>
        )}
      </div>
    </div>
  );
};

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileAbout;
