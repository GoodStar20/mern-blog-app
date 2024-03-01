import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography
} from '@mui/material';
import { getFirstChar } from '../lib/utilities';

const CommentList = ({ name, text }) => {
  return (
    <List sx={{ width: '100%' }}>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar sx={{ bgcolor: 'green' }} aria-label="recipe">
            {getFirstChar(name)}
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={name}
          secondary={
            <Typography
              sx={{ display: 'inline' }}
              component="span"
              variant="body2"
              color="text.primary">
              {text}
            </Typography>
          }
        />
      </ListItem>
    </List>
  );
};

export default CommentList;
