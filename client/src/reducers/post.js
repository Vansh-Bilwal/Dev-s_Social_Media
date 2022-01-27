import {
  GET_POSTS,
  GET_POST,
  UPDATE_POST,
  UPDATE_POSTS,
  POST_ERROR,
  UPDATE_LIKE,
  UPDATE_COMMENT,
} from '../actions/types';

const initialState = {
  posts: [],
  post: null,
  loading: true,
  error: {},
};

const posts = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_POSTS:
      return {
        ...state,
        posts: payload,
        loading: false,
      };
    case UPDATE_POST:
      return {
        ...state,
        posts: [payload, ...state.posts],
        post: null,
        loading: false,
      };
    case UPDATE_POSTS:
      return {
        ...state,
        loading: false,
        posts: state.posts.filter((post) => post._id !== payload),
      };
    case UPDATE_LIKE:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === payload.id
            ? { ...post, likes: payload.likes.likes }
            : post
        ),
        loading: false,
      };
    case UPDATE_COMMENT:
      console.log(payload.data);
      return {
        ...state,
        loading: false,
        posts: state.posts.map((item) =>
          item._id === payload.id ? payload.data : item
        ),
        post: {
          ...state.post,
          comments: payload.data.comments,
        },
      };
    case GET_POST:
      return {
        ...state,
        post: payload,
        loading: false,
      };
    case POST_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default posts;
