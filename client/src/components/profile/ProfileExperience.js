import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

const ProfileExperience = ({ profile: { experience } }) => {
  return (
    <Fragment>
      <div class='profile-exp bg-white p-2'>
        <h2 class='text-primary'>Experience</h2>
        {experience.length > 0 ? (
          <Fragment>
            {experience.map(
              ({ title, company, location, from, to, description, _id }) => {
                return (
                  <div key={_id}>
                    <h3 class='text-dark'>
                      {company && <span>{company}</span>}
                    </h3>
                    <p>
                      <Moment format='YYYY/MM/DD'>{from}</Moment> -{' '}
                      {to ? (
                        <Moment format='YYYY/MM/DD'>{to}</Moment>
                      ) : (
                        <span>Present</span>
                      )}
                    </p>
                    <p>
                      <strong>Position: </strong>
                      {title && title}
                    </p>
                    <p>
                      <strong>Description: </strong>
                      {description && <span>{description}</span>}
                    </p>
                  </div>
                );
              }
            )}
          </Fragment>
        ) : (
          <Fragment>
            <h4>No experience credentials</h4>
          </Fragment>
        )}
      </div>
    </Fragment>
  );
};

ProfileExperience.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileExperience;
