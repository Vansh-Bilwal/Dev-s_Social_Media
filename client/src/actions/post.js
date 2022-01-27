import axios from 'axios';
import { setAlert } from './alert';
import {
  GET_POSTS,
  POST_ERROR,
  GET_POST,
  UPDATE_POST,
  UPDATE_LIKE,
  UPDATE_COMMENT,
  UPDATE_POSTS,
} from './types';
import React from 'react';

//GET POSTS
export const getPosts = () => async (dispatch) => {
  try {
    const res = await axios.get('http://localhost:5000/api/posts');
    dispatch({
      type: GET_POSTS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

//Get single post
export const getSinglePost = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`http://localhost:5000/api/posts/${id}`);
    dispatch({
      type: GET_POST,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

//Add Post
export const addPost = (text) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const res = await axios.post(
      'http://localhost:5000/api/posts',
      text,
      config
    );
    dispatch({ type: UPDATE_POST, payload: res.data });

    dispatch(setAlert('Post Added', 'success'));
  } catch (err) {
    console.log(err.response.data.errors);

    dispatch({
      type: POST_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

//Add Like

export const addLike = (id) => async (dispatch) => {
  try {
    const res = await axios.put(`http://localhost:5000/api/posts/like/${id}`);
    dispatch({ type: UPDATE_LIKE, payload: { id, likes: res.data } });
  } catch (err) {
    console.log(err);
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

//Remove Like
export const addUnlike = (id) => async (dispatch) => {
  try {
    const res = await axios.put(`http://localhost:5000/api/posts/unlike/${id}`);
    dispatch({ type: UPDATE_LIKE, payload: { id, likes: res.data } });
  } catch (err) {
    console.log(err);
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};
//Add Comment

export const addComment = (text, id) => async (dispatch) => {
  console.log('Hello');
  console.log(text);
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const res = await axios.put(
      `http://localhost:5000/api/posts/comment/${id}`,
      text,
      config
    );
    dispatch({ type: UPDATE_COMMENT, payload: { id, data: res.data } });

    dispatch(setAlert('Comment Added', 'success'));
  } catch (err) {
    console.log(err.response.data.errors);

    dispatch({
      type: POST_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

//Delete Post

export const deletePost = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`http://localhost:5000/api/posts/${id}`);
    dispatch({
      type: UPDATE_POSTS,
      payload: id,
    });
    dispatch(setAlert('Post Deleted', 'danger'));
  } catch (err) {
    console.log(err);
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
//Delete Comment

export const deleteComment = (Postid, Commentid) => async (dispatch) => {
  try {
    const res = await axios.delete(
      `http://localhost:5000/api/posts/comment/${Postid}/${Commentid}`
    );
    dispatch({
      type: UPDATE_COMMENT,
      payload: { id: Postid, data: res.data },
    });
    dispatch(setAlert('Post Deleted', 'danger'));
  } catch (err) {
    console.log(err);
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
