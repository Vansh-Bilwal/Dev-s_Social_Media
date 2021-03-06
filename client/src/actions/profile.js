import axios from 'axios';
import { setAlert } from '../actions/alert';
import {
  GET_PROFILE,
  GET_REPOS,
  GET_PROFILES,
  PROFILE_ERROR,
  UPDATE_PROFILE,
  CLEAR_PROFILE,
  ACCOUNT_DELETED,
} from './types';

export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await axios.get(
      `${
        process.env.NODE_ENV === 'production'
          ? 'https://fierce-savannah-61881.herokuapp.com/api/profile/me'
          : 'http://localhost:5000/api/profile/me'
      }`
    );

    dispatch({ type: GET_PROFILE, payload: res.data });
  } catch (err) {
    console.log(err);
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Get all Users Profiles
export const getProfiles = () => async (dispatch) => {
  try {
    dispatch({ type: CLEAR_PROFILE });
    console.log(process.env.NODE_ENV === 'production');
    const res = await axios.get(
      `${
        process.env.NODE_ENV === 'production'
          ? 'https://fierce-savannah-61881.herokuapp.com/api/profile'
          : 'http://localhost:5000/api/profile'
      }`
    );

    dispatch({ type: GET_PROFILES, payload: res.data });
  } catch (err) {
    console.log(err);
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Get Profile By Id
export const getProfileById = (userId) => async (dispatch) => {
  try {
    const url =
      process.env.NODE_ENV === 'production'
        ? `https://fierce-savannah-61881.herokuapp.com/api/profile/user/${userId}`
        : `http://localhost:5000/api/profile/user/${userId}`;
    const res = await axios.get(url);

    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response.statustext,
        status: err.response.status,
      },
    });
  }
};

//Get Github Repos
export const getGithubRepos = (username) => async (dispatch) => {
  try {
    const url =
      process.env.NODE_ENV === 'production'
        ? `https://fierce-savannah-61881.herokuapp.com/api/profile/github/${username}`
        : `http://localhost:5000/api/profile/github/${username}`;
    const res = await axios.get(url);

    dispatch({
      type: GET_REPOS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response.statustext,
        status: err.response.status,
      },
    });
  }
};

//Create/Update Profile
export const createProfile =
  (formData, edit = false) =>
  async (dispatch) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const res = await axios.post(
        `${
          process.env.NODE_ENV === 'production'
            ? `https://fierce-savannah-61881.herokuapp.com/api/profile`
            : 'http://localhost:5000/api/profile'
        }`,
        formData,
        config
      );

      dispatch({ type: GET_PROFILE, payload: res.data });

      dispatch(
        setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success')
      );
    } catch (err) {
      console.log(err);
      const errors = err.response.data.errors;
      console.log(errors);
      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
      }
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  };

//Add Experience
export const addExperience = (formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const res = await axios.put(
      `${
        process.env.NODE_ENV === 'production'
          ? `https://fierce-savannah-61881.herokuapp.com/api/profile/experience`
          : 'http://localhost:5000/api/profile/experience'
      }`,
      formData,
      config
    );

    dispatch({ type: UPDATE_PROFILE, payload: res.data });

    dispatch(setAlert('Experience Added', 'success'));
  } catch (err) {
    const errors = err.response.data.errors;
    console.log(errors);
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Add Education
export const addEducation = (formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const res = await axios.put(
      `${
        process.env.NODE_ENV === 'production'
          ? `https://fierce-savannah-61881.herokuapp.com/api/profile/education`
          : 'http://localhost:5000/api/profile/education'
      }`,
      formData,
      config
    );

    dispatch({ type: UPDATE_PROFILE, payload: res.data });
    dispatch(setAlert('Education Added', 'success'));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((err) => {
        dispatch(setAlert(err.msg, 'danger'));
      });
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Delete Experience
export const deleteExperience = (id) => async (dispatch) => {
  try {
    const url =
      process.env.NODE_ENV === 'production'
        ? `https://fierce-savannah-61881.herokuapp.com/api/profile/experience/${id}`
        : `http://localhost:5000/api/profile/experience/${id}`;
    const res = await axios.delete(url);

    dispatch({ type: UPDATE_PROFILE, payload: res.data });
    dispatch(setAlert('Experience Removed', 'success'));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
//Delete Education
export const deleteEducation = (id) => async (dispatch) => {
  try {
    const url =
      process.env.NODE_ENV === 'production'
        ? `https://fierce-savannah-61881.herokuapp.com/api/profile/education/${id}`
        : `http://localhost:5000/api/profile/education/${id}`;
    const res = await axios.delete(url);

    dispatch({ type: UPDATE_PROFILE, payload: res.data });
    dispatch(setAlert('Education Removed', 'success'));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Delete Account and profile

export const deleteAccount = () => async (dispatch) => {
  if (window.confirm('Are you sure? this can NOT be undone')) {
    try {
      await axios.delete(
        `${
          process.env.NODE_ENV === 'production'
            ? `https://fierce-savannah-61881.herokuapp.com/api/profile`
            : 'http://localhost:5000/api/profile'
        }`
      );
      dispatch({
        type: CLEAR_PROFILE,
      });
      dispatch({
        type: ACCOUNT_DELETED,
      });
      dispatch(setAlert('Your account has been deleted'));
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  }
};
