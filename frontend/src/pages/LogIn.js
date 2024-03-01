import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Avatar, Box, TextField, Button } from '@mui/material';
import LockClockOutlined from '@mui/icons-material/LockClockOutlined';
import { useFormik } from 'formik';
import * as yup from 'yup';

import { userSignInAction } from '../redux/actions/userAction';

const validationSchema = yup.object({
  email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string('Enter your password')
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required')
});

const LogIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector(state => state.user);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: validationSchema,
    onSubmit: (values, actions) => {
      dispatch(userSignInAction(values));
      actions.resetForm();
    }
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin/dashboard');
    }
  }, [isAuthenticated, navigate]);

  return (
    <Box
      sx={{
        height: '70vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'primary.white'
      }}>
      <Box
        onSubmit={formik.handleSubmit}
        component="form"
        className="form_style border-style">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%'
          }}>
          <Avatar sx={{ m: 1, bgcolor: 'primary.main', mb: 3 }}>
            <LockClockOutlined />
          </Avatar>
          <TextField
            sx={{
              mb: 3,
              '& .MuiInputBase-root': {
                color: 'text.secondary'
              },
              fieldset: { borderColor: 'rgb(231, 235, 240)' }
            }}
            fullWidth
            id="email"
            label="E-mail"
            name="email"
            InputLabelProps={{
              shrink: true
            }}
            placeholder="E-mail"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            sx={{
              mb: 3,
              '& .MuiInputBase-root': {
                color: 'text.secondary'
              },
              fieldset: { borderColor: 'rgb(231, 235, 240)' }
            }}
            fullWidth
            id="password"
            name="password"
            label="Password"
            type="password"
            InputLabelProps={{
              shrink: true
            }}
            placeholder="Password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />

          <Button fullWidth variant="contained" type="submit">
            Log In
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default LogIn;
