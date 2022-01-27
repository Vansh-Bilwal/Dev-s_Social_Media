import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { addComment } from '../../actions/post';
import { connect } from 'react-redux';

const CommentForm = ({ post, addComment }) => {
  const [formData, setFormData] = useState({ text: '' });
  const { text } = formData;
  const onChange = (e) => {
    e.preventDefault();
    setFormData({ [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const myText = JSON.stringify(formData);
    addComment(myText, post._id);
    setFormData({ text: '' });
  };
  return (
    <Fragment>
      <div class='post-form'>
        <div class='bg-primary p'>
          <h3>Leave A Comment</h3>
        </div>
        <form
          class='form my-1'
          onSubmit={(e) => {
            onSubmit(e);
          }}
        >
          <textarea
            name='text'
            cols='30'
            rows='5'
            placeholder='Comment on this post'
            value={text}
            onChange={(e) => onChange(e)}
            required
          ></textarea>
          <input type='submit' class='btn btn-dark my-1' value='Submit' />
        </form>
      </div>
    </Fragment>
  );
};

CommentForm.propTypes = {
  post: PropTypes.object.isRequired,
  addComment: PropTypes.func.isRequired,
};

export default connect(null, { addComment })(CommentForm);
