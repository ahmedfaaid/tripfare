'use client';
import { AuthContext } from '@/context/auth';
import { registerSchema } from '@/lib/forms';
import { US_States } from '@/lib/locations';
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography
} from '@mui/material';
import { red } from '@mui/material/colors';
import { useFormik } from 'formik';
import { useContext, useState } from 'react';

export default function Register() {
  const {
    authContext: { register }
  } = useContext(AuthContext);
  const [checked, setChecked] = useState(false);

  const { handleSubmit, handleChange, values, touched, errors, status } =
    useFormik({
      initialValues: {
        first_name: '',
        last_name: '',
        username: '',
        password: '',
        confirm_password: '',
        date_of_birth: '1990-01-01',
        occupation: '',
        gender: '',
        address: {
          line_1: '',
          line_2: '',
          city: '',
          state: '',
          country: 'United States of America'
        },
        profile_picture: null
      },
      initialStatus: null,
      enableReinitialize: true,
      validationSchema: registerSchema,
      onSubmit: async (values, { setStatus }) => {
        const res = await register(values);

        if (!res.ok) {
          setStatus({ response: res.response });
        } else {
          setStatus(null);
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
        Register
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
      <Box sx={{ marginTop: 2 }}>
        <Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <TextField
              id='first_name'
              name='first_name'
              label='First Name'
              variant='outlined'
              color='tripfare'
              required
              onChange={handleChange}
              value={values.first_name}
              sx={{ width: '45%' }}
            />
            <TextField
              id='last_name'
              name='last_name'
              label='Last Name'
              variant='outlined'
              color='tripfare'
              required
              onChange={handleChange}
              value={values.last_name}
              sx={{ width: '45%' }}
            />
          </Box>
          {touched.first_name && errors.first_name && (
            <Typography
              sx={{
                color: red[300],
                marginTop: 1
              }}
            >
              {errors.first_name}
            </Typography>
          )}
          {touched.last_name && errors.last_name && (
            <Typography
              sx={{
                color: red[300],
                marginTop: 1
              }}
            >
              {errors.last_name}
            </Typography>
          )}
        </Box>
        <Box sx={{ marginTop: 4 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
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
              sx={{ width: '45%' }}
            />
            <TextField
              id='username'
              name='username'
              label='Username'
              variant='outlined'
              fullWidth
              color='tripfare'
              required
              onChange={handleChange}
              value={values.username}
              sx={{ width: '45%' }}
            />
          </Box>
        </Box>
        <Box
          sx={{
            marginTop: 4,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <TextField
            id='password'
            name='password'
            label='Password'
            type='password'
            variant='outlined'
            fullWidth
            color='tripfare'
            required
            onChange={handleChange}
            value={values.password}
            sx={{ width: '45%' }}
          />
          <TextField
            id='confirm_password'
            name='confirm_password'
            label='Confirm Password'
            type='password'
            variant='outlined'
            fullWidth
            color='tripfare'
            required
            onChange={handleChange}
            value={values.confirm_password}
            sx={{ width: '45%' }}
          />
        </Box>
        <Box
          sx={{
            marginTop: 4,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <TextField
            id='date_of_birth'
            name='date_of_birth'
            label='Date of Birth'
            type='date'
            variant='outlined'
            color='tripfare'
            required
            onChange={handleChange}
            value={values.date_of_birth}
            sx={{ width: '30%' }}
          />
          <TextField
            id='occupation'
            name='occupation'
            label='Occupation'
            type='text'
            variant='outlined'
            color='tripfare'
            required
            onChange={handleChange}
            value={values.occupation}
            sx={{ width: '30%' }}
          />
          <FormControl
            sx={{
              width: '30%'
            }}
            variant='outlined'
            color='tripfare'
            required
          >
            <InputLabel id='gender-select'>Gender</InputLabel>
            <Select
              labelId='gender-select'
              id='gender'
              name='gender'
              value={values.gender}
              label='Gender'
              onChange={handleChange}
            >
              <MenuItem value='male'>Male</MenuItem>
              <MenuItem value='female'>Female</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box
          sx={{
            marginTop: 4
          }}
        >
          <TextField
            id='address.line_1'
            name='address.line_1'
            label='Address 1'
            variant='outlined'
            fullWidth
            color='tripfare'
            required
            onChange={handleChange}
            value={values.address.line_1}
          />
        </Box>
        <Box
          sx={{
            marginTop: 4
          }}
        >
          <TextField
            id='address.line_2'
            name='address.line_2'
            label='Address 2'
            variant='outlined'
            fullWidth
            color='tripfare'
            onChange={handleChange}
            value={values.address.line_2}
          />
        </Box>
        <Box
          sx={{
            marginTop: 4,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <TextField
            id='address.city'
            name='address.city'
            label='City'
            variant='outlined'
            color='tripfare'
            required
            onChange={handleChange}
            value={values.address.city}
            sx={{ width: '30%' }}
          />
          <FormControl
            sx={{
              width: '30%'
            }}
            variant='outlined'
            color='tripfare'
            required
          >
            <InputLabel id='address-state'>State</InputLabel>
            <Select
              labelId='address-state'
              id='address.state'
              name='address.state'
              value={values.address.state}
              label='State'
              onChange={handleChange}
            >
              {US_States.map((state) => (
                <MenuItem key={state.name} value={state.name}>
                  {state.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            id='country'
            name='country'
            label='Country'
            select
            variant='outlined'
            color='tripfare'
            required
            onChange={handleChange}
            value={values.address.country}
            disabled
            sx={{ width: '30%' }}
          >
            <MenuItem value='United States of America'>
              United States of America
            </MenuItem>
          </TextField>
        </Box>
      </Box>
      <Box
        sx={{
          marginTop: 4
        }}
      >
        <FormControlLabel
          control={
            <Checkbox
              color='tripfare'
              checked={checked}
              onChange={() => setChecked(!checked)}
            />
          }
          label='I agree to the Terms of Service and Privacy Policy.'
          required
        />
      </Box>
      <Box sx={{ marginTop: 4 }}>
        <Button
          type='submit'
          color='tripfare'
          variant='contained'
          sx={{ color: 'white' }}
          fullWidth
        >
          Register
        </Button>
      </Box>
    </Box>
  );
}
