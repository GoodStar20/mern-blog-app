import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import CreateBlog from './CreateBlog';
import EditBlog from './EditBlog';

const BlogModal = ({ blogId, isOpen, setIsOpen }) => {
  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <Dialog
      fullWidth={true}
      maxWidth={'md'}
      open={isOpen}
      onClose={handleClose}>
      <DialogTitle>{blogId ? 'Update' : 'Create'} Blog</DialogTitle>
      <DialogContent>
        {blogId ? (
          <EditBlog id={blogId} onClose={handleClose} />
        ) : (
          <CreateBlog onClose={handleClose} />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default BlogModal;
