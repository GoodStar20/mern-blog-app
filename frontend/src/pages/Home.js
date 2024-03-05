import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { io } from 'socket.io-client';
import { Box, Container, Grid, Typography } from '@mui/material';

import BlogCard from '../components/BlogCard';
import Loader from '../components/Loader';
import { getBlogsAction } from '../redux/actions/blogAction';

const socket = io('/', {
  reconnection: true
});

const Home = () => {
  const dispatch = useDispatch();
  const { blogs, loading } = useSelector(state => state.blog);
  const [allBlogs, setAllBlogs] = useState(blogs);

  useEffect(() => {
    setAllBlogs(blogs);
  }, [blogs]);

  useEffect(() => {
    dispatch(getBlogsAction());
    socket.on('add-like', newBlogs => {
      setAllBlogs(newBlogs);
    });
    socket.on('remove-like', newBlogs => {
      setAllBlogs(newBlogs);
    });
    //eslint-disable-next-line
  }, []);

  return (
    <Container sx={{ pt: 5, pb: 5 }}>
      <Box sx={{ flexGrow: 1 }}>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}>
          {loading ? (
            <Loader />
          ) : allBlogs && allBlogs.length > 0 ? (
            allBlogs.map((blog, index) => (
              <Grid item xs={2} sm={4} md={4} key={index}>
                <BlogCard
                  id={blog._id}
                  title={blog.title}
                  content={blog.content}
                  posterName={blog.postedBy.name}
                  image={blog.image || ''}
                  subheader={moment(blog.createdAt).format('MMMM DD, YYYY')}
                  comments={blog.comments.length}
                  likes={blog.likes.length}
                  likesId={blog.likes}
                />
              </Grid>
            ))
          ) : (
            <Box sx={{ textAlign: 'center', width: '100%' }}>
              <Typography variant="h6">There are no blogs.</Typography>
            </Box>
          )}
        </Grid>
      </Box>
    </Container>
  );
};

export default Home;
