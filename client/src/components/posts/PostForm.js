import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { addPost } from '../../actions/post';
import { connect } from 'react-redux';

const PostForm = ({ addPost }) => {
  const [formData, setFormData] = useState({ text: '' });
  const { text } = formData;
  const onChange = (e) => {
    e.preventDefault();
    setFormData({ [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const myText = JSON.stringify(formData);

    addPost(myText);
    setFormData({ text: '' });
  };

  return (
    <div class='post-form'>
      <div class='bg-primary p'>
        <h3>Say Something...</h3>
      </div>
      <form class='form my-1' onSubmit={(e) => onSubmit(e)}>
        <textarea
          name='text'
          value={text}
          cols='30'
          rows='5'
          placeholder='Create a post'
          required
          onChange={(e) => {
            onChange(e);
          }}
        ></textarea>
        <input type='submit' class='btn btn-dark my-1' value='Add Post' />
      </form>
    </div>
  );
};

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired,
};

export default connect(null, { addPost })(PostForm);
