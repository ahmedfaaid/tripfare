'use client';
import Copyright from '@/components/copyright';
import { AuthContext } from '@/context/auth';
import { loginSchema } from '@/lib/forms';
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Link,
  TextField,
  Typography
} from '@mui/material';
import { red } from '@mui/material/colors';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';

export default function Login() {
  const {
    authContext: { login }
  } = useContext(AuthContext);
  const router = useRouter();

  const { handleSubmit, handleChange, values, touched, errors, status } =
    useFormik({
      initialValues: {
        email: '',
        password: ''
      },
      initialStatus: null,
      validationSchema: loginSchema,
      onSubmit: async (values, { setStatus }) => {
        const res = await login(values);

        if (!res.ok) {
          setStatus({ response: res.response.message });
        } else {
          setStatus(null);
          router.push('/');
        }
      }
    });

  return (
    <Box
      component='form'
      sx={{ height: '100%', width: '100%' }}
      onSubmit={handleSubmit}
    >
      <Typography
        component='h2'
        variant='h4'
        sx={{ textAlign: 'center', color: 'soot', marginBottom: 4 }}
      >
        Login
      </Typography>
      {status && (
        <Typography
          sx={{
            textAlign: 'center',
            color: red[300],
            marginTop: 2,
            marginBottom: 2
          }}
        >
          {status.response}
        </Typography>
      )}
      <Box>
        <Box>
          <TextField
            id='email'
            name='email'
            label='Email Address'
            variant='outlined'
            fullWidth
            color='tripfare'
            required
            autoComplete='email'
            onChange={handleChange}
            value={values.email}
          />
          {touched.email && errors.email && (
            <Typography
              sx={{
                color: red[300],
                marginTop: 1
              }}
            >
              {errors.email}
            </Typography>
          )}
        </Box>
        <Box>
          <TextField
            id='password'
            name='password'
            label='Password'
            type='password'
            variant='outlined'
            sx={{
              marginTop: 4
            }}
            fullWidth
            color='tripfare'
            required
            onChange={handleChange}
            value={values.password}
          />
          {touched.password && errors.password && (
            <Typography
              sx={{
                color: red[300],
                marginTop: 1
              }}
            >
              {errors.password}
            </Typography>
          )}
        </Box>
        <Box sx={{ marginTop: 3 }}>
          <FormControlLabel
            control={<Checkbox value='remember' color='tripfare' />}
            label='Remember me'
          />
        </Box>
        <Box sx={{ marginTop: 2 }}>
          <Button
            type='submit'
            color='tripfare'
            variant='contained'
            sx={{ color: 'white' }}
            fullWidth
          >
            Login
          </Button>
        </Box>
        <Grid container sx={{ marginTop: 3, color: 'tripfare' }}>
          <Grid item xs>
            <Link href='#' variant='body' sx={{ color: 'inherit' }}>
              Forgot password?
            </Link>
          </Grid>
          <Grid item>
            <Link href='#' variant='body' sx={{ color: 'inherit' }}>
              Don&apos;t have an account? Sign Up
            </Link>
          </Grid>
        </Grid>
      </Box>
      <Copyright sx={{ marginTop: 4 }} />
    </Box>
  );
}
