import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';
import { getPosts } from '../../actions/post';
import { connect } from 'react-redux';
import SinglePost from './PostList';
import PostForm from './PostForm';

const Posts = ({ getPosts, post: { posts, loading }, auth }) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);
  return (
    <Fragment>
      {loading || auth.loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <PostForm></PostForm>
          <div class='posts'>
            {posts.length ? (
              posts.map((post) => {
                return <SinglePost key={post._id} post={post}></SinglePost>;
              })
            ) : (
              <span>No Posts</span>
            )}{' '}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
  auth: state.auth,
});

export default connect(mapStateToProps, { getPosts })(Posts);
