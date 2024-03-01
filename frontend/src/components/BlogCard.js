import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  Avatar,
  Box,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  IconButton,
  Typography
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CommentIcon from '@mui/icons-material/Comment';

import { getFirstChar } from '../lib/utilities';
import { addLikeAction, removeLikeAction } from '../redux/actions/blogAction';
import defaultImage from '../images/blog.jpg';

const BlogCard = ({
  id,
  title,
  posterName,
  subheader,
  image,
  content,
  comments,
  likes,
  likesId
}) => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector(state => state.user);

  const addLike = async () => {
    dispatch(addLikeAction(id));
  };

  const removeLike = async () => {
    dispatch(removeLikeAction(id));
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: 'red' }} aria-label="recipe">
            {getFirstChar(posterName)}
          </Avatar>
        }
        title={title}
        subheader={subheader}
      />
      <Link to={`/blog/${id}`}>
        <CardMedia
          component="img"
          height="194"
          image={image || defaultImage}
          alt="blog image"
        />
      </Link>
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {content.split(' ').slice(0, 10).join(' ') + '...'}
        </Typography>
      </CardContent>
      <CardActions>
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between'
          }}>
          <Box>
            {likesId.includes(userInfo && userInfo.id) ? (
              <IconButton onClick={removeLike} aria-label="add to favorites">
                <FavoriteIcon sx={{ color: 'red' }} />
              </IconButton>
            ) : (
              <IconButton onClick={addLike} aria-label="add to favorites">
                <FavoriteBorderIcon sx={{ color: 'red' }} />
              </IconButton>
            )}
            {likes} Like(s)
          </Box>
          <Box>
            {comments}
            <IconButton aria-label="comment">
              <CommentIcon />
            </IconButton>
          </Box>
        </Box>
      </CardActions>
    </Card>
  );
};

export default BlogCard;
