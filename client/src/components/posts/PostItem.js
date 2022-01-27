import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import SinglePost from './SinglePost';
import { getSinglePost } from '../../actions/post';
import Spinner from '../layout/Spinner';

const PostItem = ({ post, getSinglePost }) => {
  const { id } = useParams();
  useEffect(() => {
    getSinglePost(id);
  }, [getSinglePost]);
  return (
    <Fragment>
      {post.post === null ? (
        <Spinner></Spinner>
      ) : (
        <SinglePost post={post}></SinglePost>
      )}
    </Fragment>
  );
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  getSinglePost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, { getSinglePost })(PostItem);
