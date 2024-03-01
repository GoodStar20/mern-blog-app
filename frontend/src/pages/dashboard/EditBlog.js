import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, TextField } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Dropzone from 'react-dropzone';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import {
  editBlogAction,
  getSingleBlogAction
} from '../../redux/actions/blogAction';

const validationSchema = yup.object({
  title: yup
    .string('Add a blog title')
    .min(4, 'text content should havea minimum of 4 characters ')
    .required('Blog title is required'),
  content: yup
    .string('Add text content')
    .min(10, 'text content should havea minimum of 10 characters ')
    .required('text content is required')
});

const EditBlog = ({ id, onClose }) => {
  const dispatch = useDispatch();
  const { singleBlog } = useSelector(state => state.blog);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imagePreview, setImagePreview] = useState('');

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue
  } = useFormik({
    initialValues: {
      title,
      content,
      image: ''
    },

    validationSchema: validationSchema,
    enableReinitialize: true,
    onSubmit: (values, actions) => {
      updateBlog(values);
      actions.resetForm();
    }
  });

  const updateBlog = async values => {
    dispatch(editBlogAction(id, values));
    onClose();
  };

  useEffect(() => {
    if (singleBlog) {
      setTitle(singleBlog.title);
      setContent(singleBlog.content);
      setImagePreview(singleBlog.image?.url);
    }
  }, [singleBlog]);

  useEffect(() => {
    dispatch(getSingleBlogAction(id));
    //eslint-disable-next-line
  }, []);

  return (
    <Box sx={{ bgcolor: 'white', padding: '20px' }}>
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
        <TextField
          sx={{ mb: 3 }}
          fullWidth
          id="title"
          label="Blog title"
          name="title"
          InputLabelProps={{
            shrink: true
          }}
          placeholder="Blog title"
          value={values.title}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.title && Boolean(errors.title)}
          helperText={touched.title && errors.title}
        />

        <Box sx={{ mb: 3 }}>
          <TextField
            label="Content"
            multiline
            maxRows={5}
            minRows={3}
            fullWidth
            placeholder={'Write the blog content...'}
            value={values.content}
            onChange={e => setFieldValue('content', e.target.value)}
          />
          <Box
            component="span"
            sx={{ color: '#d32f2f', fontSize: '12px', pl: 2 }}>
            {touched.content && errors.content}
          </Box>
        </Box>

        <Box border="2px dashed blue" sx={{ p: 1 }}>
          <Dropzone
            acceptedFiles=".jpg,.jpeg,.png"
            multiple={false}
            onDrop={acceptedFiles =>
              acceptedFiles.forEach(file => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onloadend = () => {
                  setFieldValue('image', reader.result);
                };
              })
            }>
            {({ getRootProps, getInputProps, isDragActive }) => (
              <Box
                {...getRootProps()}
                p="1rem"
                sx={{
                  '&:hover': { cursor: 'pointer' },
                  bgcolor: isDragActive ? '#cceffc' : '#fafafa'
                }}>
                <input name="image" {...getInputProps()} />
                {isDragActive ? (
                  <>
                    <p style={{ textAlign: 'center' }}>
                      <CloudUploadIcon sx={{ color: 'primary.main', mr: 2 }} />
                    </p>
                    <p style={{ textAlign: 'center', fontSize: '12px' }}>
                      Drop here!
                    </p>
                  </>
                ) : values.image === null ? (
                  <>
                    <p style={{ textAlign: 'center' }}>
                      <CloudUploadIcon sx={{ color: 'primary.main', mr: 2 }} />
                    </p>
                    <p style={{ textAlign: 'center', fontSize: '12px' }}>
                      Drag and Drop image here or click to choose
                    </p>
                  </>
                ) : (
                  <>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-around',
                        alignItems: 'center'
                      }}>
                      <Box>
                        <img
                          style={{ maxWidth: '100px' }}
                          src={
                            values.image === '' ? imagePreview : values.image
                          }
                          alt=""
                        />
                      </Box>
                    </Box>
                  </>
                )}
              </Box>
            )}
          </Dropzone>
        </Box>
        <Box sx={{ textAlign: 'center' }}>
          <Button
            type="submit"
            variant="contained"
            elevation={0}
            sx={{ mt: 3, px: 3, mb: 2, borderRadius: '25px' }}>
            Update blog
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default EditBlog;
