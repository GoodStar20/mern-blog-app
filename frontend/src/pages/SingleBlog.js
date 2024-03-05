import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams, useNavigate } from 'react-router-dom';
import moment from 'moment';
import { io } from 'socket.io-client';
import {
  Avatar,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  TextField,
  Typography,
  Box,
  Button,
  IconButton
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import Loader from '../components/Loader';
import CommentList from '../components/CommentList';
import { getFirstChar } from '../lib/utilities';

import defaultImage from '../images/blog.jpg';
import {
  getSingleBlogAction,
  addCommentAction
} from '../redux/actions/blogAction';

const socket = io('/', {
  reconnection: true
});

const SingleBlog = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();

  const { userInfo } = useSelector(state => state.user);
  const { singleBlog, loading } = useSelector(state => state.blog);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');
  const [createdAt, setCreatedAt] = useState('');
  const [comment, setComment] = useState('');
  const [posterName, setPosterName] = useState('');
  const [comments, setComments] = useState([]);

  const addComment = async () => {
    if (comment) {
      dispatch(addCommentAction(id, comment));
      setComment('');
    }
  };

  useEffect(() => {
    if (singleBlog) {
      setTitle(singleBlog.title);
      setContent(singleBlog.content);
      setImage(singleBlog.image || defaultImage);
      setCreatedAt(singleBlog.createdAt);
      setComments(singleBlog.comments);
      setPosterName(singleBlog.postedBy.name);
    }
  }, [singleBlog]);

  useEffect(() => {
    dispatch(getSingleBlogAction(id));
    socket.on('new-comment', newComment => {
      setComments(newComment);
    });
    //eslint-disable-next-line
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        pt: 4,
        pb: 4
      }}>
      <Card sx={{ maxWidth: 900, height: '100%', width: '100%' }}>
        <IconButton aria-label="edit" onClick={() => navigate('/')}>
          <ArrowBackIcon sx={{ color: '#1976d2' }} />
        </IconButton>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: 'green' }} aria-label="recipe">
              {getFirstChar(posterName)}
            </Avatar>
          }
          title={title}
          subheader={moment(createdAt).format('MMMM DD, YYYY')}
        />
        <CardMedia component="img" height="300" image={image} alt={title} />
        <CardContent>
          <Typography variant="body2">{content}</Typography>
          {comments.length > 0 && (
            <>
              <Typography variant="h5" sx={{ pt: 3, mb: 2 }}>
                Comments:
              </Typography>
              {comments.map(comment => (
                <CommentList
                  key={comment._id}
                  name={comment.postedBy.name}
                  text={comment.text}
                />
              ))}
            </>
          )}
          {userInfo ? (
            <Box sx={{ p: 2 }}>
              <Typography variant="h5">Add comment</Typography>
              <TextField
                onChange={e => setComment(e.target.value)}
                value={comment}
                minRows={3}
                placeholder="Add a comment..."
                fullWidth
              />
              <Box sx={{ pt: 2, textAlign: 'center' }}>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ px: 3, mb: 2, borderRadius: '25px' }}
                  onClick={addComment}>
                  Comment
                </Button>
              </Box>
            </Box>
          ) : (
            <Link to="/login"> Log In to add a comment</Link>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default SingleBlog;
