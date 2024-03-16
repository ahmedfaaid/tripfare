'use client';
import { loginAction } from '@/app/actions';
import Copyright from '@/components/copyright';
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

export default function Login() {
  return (
    <Box
      component='form'
      action={loginAction}
      sx={{ height: '100%', width: '100%' }}
    >
      <Typography
        component='h2'
        variant='h4'
        sx={{ textAlign: 'center', color: 'soot', marginBottom: 4 }}
      >
        Login
      </Typography>
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
          />
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
          />
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
