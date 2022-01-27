import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { deleteEducation } from '../../actions/profile';
const Education = ({ edu, deleteEducation }) => {
  return (
    <Fragment>
      <h2 className='my-2'>Education Credentials</h2>
      <table className='table'>
        <thead>
          <tr>
            <th>School</th>
            <th className='hide-sm'>Degree</th>
            <th className='hide-sm'>Years</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {edu &&
            edu.map((edu) => {
              return (
                <Fragment key={edu._id}>
                  <tr>
                    <td>{edu.school}</td>
                    <td className='hide-sm'>{edu.degree}</td>
                    <td className='hide-sm'>
                      <Moment format='YYYY/MM/DD'>{edu.from}</Moment> -{' '}
                      {edu.current ? (
                        'Present'
                      ) : (
                        <Moment format='YYYY/MM/DD'>{edu.to}</Moment>
                      )}
                    </td>
                    <td>
                      <button
                        className='btn btn-danger'
                        onClick={() => deleteEducation(edu._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                </Fragment>
              );
            })}
        </tbody>
      </table>
    </Fragment>
  );
};

Education.propTypes = {
  edu: PropTypes.array.isRequired,
  deleteEducation: PropTypes.func.isRequired,
};

export default connect(null, { deleteEducation })(Education);
