import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { Link, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';
import CommentForm from './CommentForm';
import { deleteComment } from '../../actions/post';

const SinglePost = ({ auth, post: { post, loading }, deleteComment }) => {
  const { user, text, avatar, comments, name } = post;
  const handleClick = (e, CommentId) => {
    if (window.confirm('Do you want to delete this comment?')) {
      deleteComment(post._id, CommentId);
    }
  };

  return (
    <Fragment>
      {auth.loading || loading ? (
        <Spinner></Spinner>
      ) : (
        <Fragment>
          <Link to='/posts' className='btn'>
            Back To Posts
          </Link>
          <div className='post bg-white p-1 my-1'>
            <div>
              <Link to={`/profile/${user}`}>
                <img className='round-img' src={avatar} alt='' />
                <h4>{name}</h4>
              </Link>
            </div>
            <div>
              <p className='my-1'>{text}</p>
            </div>
          </div>

          <CommentForm post={post}></CommentForm>

          <div className='comments'>
            {comments.map(({ user, avatar, name, date, text, _id }) => {
              return (
                <Fragment key={_id}>
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
                      {auth.user._id === user.toString() && (
                        <button
                          type='button'
                          className='btn btn-danger'
                          onClick={(e) => handleClick(e, _id)}
                        >
                          <i className='fas fa-times'></i>
                        </button>
                      )}
                    </div>
                  </div>
                </Fragment>
              );
            })}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

SinglePost.propTypes = {
  auth: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  deleteComment: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { deleteComment })(SinglePost);
