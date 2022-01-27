import React from 'react';
import PropTypes from 'prop-types';
import { Navigate, Outlet } from 'react-router-dom';
import { connect } from 'react-redux';
const PrivateRoute = ({ auth: { isAuthenticated, loading }, ...rest }) =>
  !isAuthenticated && !loading ? <Navigate to='/login' /> : <Outlet />;

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(PrivateRoute);
