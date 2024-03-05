import { Box, Button, TextField } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Dropzone from 'react-dropzone';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { createBlogAction } from '../../redux/actions/blogAction';

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

const CreateBlog = ({ onClose }) => {
  const dispatch = useDispatch();
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
      title: '',
      content: '',
      image: null
    },

    validationSchema: validationSchema,
    onSubmit: (values, actions) => {
      createNewBlog(values);
      actions.resetForm();
    }
  });

  const createNewBlog = async values => {
    dispatch(createBlogAction(values));
    onClose();
  };

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
            value={values.content}
            fullWidth
            placeholder={'Write the blog content...'}
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
                <input name="banner" {...getInputProps()} />
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
                      Drag and Drop here or click to choose
                    </p>
                  </>
                ) : (
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-around',
                      alignItems: 'center'
                    }}>
                    <img
                      style={{ maxWidth: '300px' }}
                      src={values.image}
                      alt=""
                    />
                  </Box>
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
            Create blog
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default CreateBlog;
