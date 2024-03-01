import {
  BLOGS_LOAD_REQUEST,
  BLOGS_LOAD_SUCCESS,
  BLOGS_LOAD_FAIL,
  BLOGS_SINGLE_LOAD_SUCCESS,
  BLOGS_SINGLE_LOAD_FAIL
} from '../constants/blogConstant';

const initialState = {
  loading: false,
  blogs: [],
  singleBlog: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case BLOGS_LOAD_REQUEST:
      return { ...state, loading: true };
    case BLOGS_LOAD_SUCCESS:
      return { ...state, loading: false, blogs: action.payload };
    case BLOGS_LOAD_FAIL:
      return { ...state, loading: false, blogs: [] };
    case BLOGS_SINGLE_LOAD_SUCCESS:
      return { ...state, loading: false, singleBlog: action.payload };
    case BLOGS_SINGLE_LOAD_FAIL:
      return { ...state, loading: false, singleBlog: null };
    default:
      return state;
  }
};
