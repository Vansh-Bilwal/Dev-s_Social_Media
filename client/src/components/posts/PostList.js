import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addLike, addUnlike, deletePost } from '../../actions/post';

const PostList = ({ post, auth, addLike, addUnlike, deletePost }) => {
  const { user, text, avatar, likes, comments, date, name, _id } = post;

  const dClass = likes.filter((like) => like.user === auth.user._id).length
    ? 'btn-primary'
    : 'btn-light';
  const handleClick = (e) => {
    if (window.confirm('Do you wish to Delete the post?')) {
      deletePost(_id);
    }
  };
  return (
    <Fragment>
      <div className='post bg-white p-1 my-1'>
        <div>
          <Link to={`/profile/${user}`}>
            <img className='round-img' src={avatar} alt='' />
            <h4>{name}</h4>
          </Link>
        </div>
        <div>
          <p className='my-1'>{text}</p>
          <p className='post-date'>
            Posted on <Moment format='YYYY/MM/DD'>{date}</Moment>
          </p>
          <button
            type='button'
            className={`btn ${dClass}`}
            onClick={(e) => addLike(_id)}
          >
            <i className='fas fa-thumbs-up'></i>
            <span>{likes.length}</span>
          </button>
          <button
            type='button'
            className='btn btn-light'
            onClick={(e) => addUnlike(_id)}
          >
            <i className='fas fa-thumbs-down'></i>
          </button>
          <Link to={`/posts/${_id}`} className='btn btn-primary'>
            Discussion <span className='comment-count'>{comments.length}</span>
          </Link>
          {auth.user._id === user && (
            <button
              type='button'
              className='btn btn-danger'
              onClick={(e) => handleClick(e)}
            >
              <i className='fas fa-times'></i>
            </button>
          )}
        </div>
      </div>
    </Fragment>
  );
};

PostList.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  addUnlike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { addLike, addUnlike, deletePost })(
  PostList
);
