import axios from 'axios';
import { toast } from 'react-toastify';
import { io } from 'socket.io-client';

import {
  BLOGS_LOAD_REQUEST,
  BLOGS_LOAD_SUCCESS,
  BLOGS_LOAD_FAIL,
  BLOGS_SINGLE_LOAD_SUCCESS,
  BLOGS_SINGLE_LOAD_FAIL
} from '../constants/blogConstant';

const socket = io('/', {
  reconnection: true
});

export const getBlogsAction = () => async dispatch => {
  dispatch({ type: BLOGS_LOAD_REQUEST });
  try {
    const { data } = await axios.get('/api/blogs');
    dispatch({
      type: BLOGS_LOAD_SUCCESS,
      payload: data.blogs
    });
  } catch (error) {
    dispatch({
      type: BLOGS_LOAD_FAIL
    });
  }
};

export const addLikeAction = id => async () => {
  try {
    await axios.put(`/api/addlike/blog/${id}`);
  } catch (error) {
    toast.error(error.response.data.error);
  }
};

export const removeLikeAction = id => async () => {
  try {
    await axios.put(`/api/removelike/blog/${id}`);
  } catch (error) {
    toast.error(error.response.data.error);
  }
};

export const getSingleBlogAction = id => async dispatch => {
  dispatch({ type: BLOGS_LOAD_REQUEST });
  try {
    const { data } = await axios.get(`/api/blogs/${id}`);
    dispatch({
      type: BLOGS_SINGLE_LOAD_SUCCESS,
      payload: data.blog
    });
  } catch (error) {
    dispatch({
      type: BLOGS_SINGLE_LOAD_FAIL
    });
  }
};

export const createBlogAction = values => async dispatch => {
  try {
    await axios.post('/api/blog/create', values);
    toast.success('Blog created');
    dispatch(getBlogsAction());
  } catch (error) {
    toast.error(error);
  }
};

export const deleteBlogAction = id => async dispatch => {
  try {
    const { data } = await axios.delete(`/api/delete/blog/${id}`);
    if (data.success === true) {
      toast.success('Blog deleted');
      dispatch(getBlogsAction());
    }
  } catch (error) {
    toast.error(error);
  }
};
export const editBlogAction = (id, values) => async dispatch => {
  try {
    const { data } = await axios.put(`/api/update/blog/${id}`, values);
    if (data.success === true) {
      toast.success('Blog updated');
      dispatch(getBlogsAction());
    }
  } catch (error) {
    toast.error(error.response.data.error);
  }
};

export const addCommentAction = (id, comment) => async dispatch => {
  try {
    const { data } = await axios.put(`/api/comment/blog/${id}`, {
      comment
    });
    if (data.success === true) {
      toast.success('Comment added');
      socket.emit('comment', data.blog.comments);
    }
  } catch (error) {
    toast.error(error);
  }
};
