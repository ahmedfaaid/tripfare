'use client';
import Trix from '@/components/textEditor';
import { AuthContext } from '@/context/auth';
import { postSchema } from '@/lib/forms';
import { Regions } from '@/lib/locations';
import { generateYears } from '@/utils/fns';
import { Add, Image } from '@mui/icons-material';
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography
} from '@mui/material';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import { useContext, useEffect } from 'react';

const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec'
];

export default function Create() {
  const { loading, user } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (loading) {
      return;
    }

    if (!loading && !user) {
      router.replace('/login?redirect=posts/create');
    }
  }, [loading, user, router]);

  const { handleSubmit, handleChange, values, touched, errors, status } =
    useFormik({
      initialValues: {
        title: '',
        region: 'North America',
        country: '',
        city: '',
        details: '',
        media: [],
        length_of_stay: {
          num: 1,
          period: 'days'
        },
        date_travelled: {
          month: 'Jan',
          year: new Date().getFullYear()
        },
        size_of_group: 1,
        total_budget: 0,
        budget: {
          accommodation: 0,
          food_drinks: 0,
          activities: 0,
          transportation: 0
        }
      },
      initialStatus: null,
      enableReinitialize: true,
      validationSchema: postSchema,
      onSubmit: async (values, { setStatus }) => {
        console.log({ values });
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
        Create a post
      </Typography>
      <Box sx={{ marginTop: 2 }}>
        <Box>
          <TextField
            id='title'
            name='title'
            label='Title'
            variant='outlined'
            fullWidth
            color='tripfare'
            required
            onChange={handleChange}
            value={values.title}
            error={touched.title && errors.title}
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
          <FormControl
            sx={{ width: '30%' }}
            variant='outlined'
            color='tripfare'
            required
            error={touched.region && errors.region}
          >
            <InputLabel id='region-select'>Region</InputLabel>
            <Select
              labelId='region-select'
              id='region'
              name='region'
              label='Region'
              value={values.region}
              onChange={handleChange}
            >
              {Regions.map((region) => (
                <MenuItem value={region} key={region}>
                  {region}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            id='country'
            name='country'
            label='Country'
            variant='outlined'
            fullWidth
            color='tripfare'
            required
            onChange={handleChange}
            value={values.country}
            error={touched.country && errors.country}
            sx={{ width: '30%' }}
          />
          <TextField
            id='city'
            name='city'
            label='City'
            variant='outlined'
            fullWidth
            color='tripfare'
            required
            onChange={handleChange}
            value={values.city}
            error={touched.city && errors.city}
            sx={{ width: '30%' }}
          />
        </Box>
        <Box
          sx={{
            marginTop: 4,
            height: 300
          }}
        >
          <Trix
            id='details'
            name='details'
            defaultValue={values.details}
            onChange={handleChange}
            placeholder='Share trip details here...'
            className='editor'
          />
        </Box>
        <Grid container sx={{ marginTop: 8 }}>
          <Grid item xs={12} sm={4}>
            <input
              id='files'
              name='files'
              type='file'
              className='upload-attachment-input'
            />
            <label htmlFor='files' className='upload-attachment-btn'>
              <Image alt='Image icon' />
              <span>Add Image & Video</span>
            </label>
          </Grid>
          <Grid item xs={12} sm={8}></Grid>
        </Grid>
        <Box
          sx={{
            marginTop: 4
          }}
        >
          <Box
            component='fieldset'
            sx={{
              border: 'none',
              padding: 0,
              margin: 0
            }}
          >
            <legend className='fieldset-legend-required'>
              How long did you stay?
            </legend>
            <TextField
              id='length_of_stay.num'
              name='length_of_stay.num'
              type='number'
              value={values.length_of_stay.num}
              required
              onChange={handleChange}
              sx={{
                marginTop: 2
              }}
              InputLabelProps={{
                sx: {
                  display: 'none'
                }
              }}
            />
            <FormControl
              sx={{
                width: 150,
                marginLeft: 5,
                marginTop: 2
              }}
            >
              <Select
                id='length_of_stay.period'
                name='length_of_stay.period'
                value={values.length_of_stay.period}
                onChange={handleChange}
              >
                <MenuItem value='days'>Day(s)</MenuItem>
                <MenuItem value='weeks'>Week(s)</MenuItem>
                <MenuItem value='months'>Month(s)</MenuItem>
                <MenuItem value='years'>Year(s)</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>
        <Grid
          container
          sx={{
            marginTop: 4
          }}
          spacing={2}
        >
          <Grid item xs={12} sm={6}>
            <Box
              component='fieldset'
              sx={{ border: 'none', padding: 0, margin: 0 }}
            >
              <legend className='fieldset-legend-required'>
                Select month and year travelled
              </legend>
              <FormControl
                sx={{
                  width: 150,
                  marginTop: 2
                }}
              >
                <Select
                  id='date_travelled.month'
                  name='date_travelled.month'
                  value={values.date_travelled.month}
                  onChange={handleChange}
                >
                  {months.map((month) => (
                    <MenuItem value={month} key={month}>
                      {month}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl
                sx={{
                  width: 150,
                  marginLeft: 5,
                  marginTop: 2
                }}
              >
                <Select
                  id='date_travelled.year'
                  name='date_travelled.year'
                  value={values.date_travelled.year}
                  onChange={handleChange}
                >
                  {generateYears().map((year) => (
                    <MenuItem value={year} key={year}>
                      {year}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box
              component='fieldset'
              sx={{ border: 'none', padding: 0, margin: 0 }}
            >
              <legend className='fieldset-legend-required'>
                Select size of group
              </legend>
              <TextField
                id='size_of_group'
                name='size_of_group'
                type='number'
                value={values.size_of_group}
                required
                onChange={handleChange}
                sx={{ marginTop: 2 }}
              />
            </Box>
          </Grid>
        </Grid>
        <Box sx={{ marginTop: 4 }}>
          <Typography
            variant='h4'
            sx={{
              color: 'rgb(63, 136, 174)',
              fontSize: 24
            }}
          >
            Budgeting
          </Typography>
          <Box sx={{ marginTop: 4 }}>
            <InputLabel
              htmlFor='total_budget'
              sx={{ color: 'soot.main' }}
              required
            >
              Total budget
            </InputLabel>
            <TextField
              id='total_budget'
              name='total_budget'
              type='number'
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>$</InputAdornment>
                )
              }}
              sx={{ marginTop: 2 }}
            />
          </Box>
          <Grid container sx={{ marginTop: 4 }} spacing={2}>
            <Grid item xs={12} sm={3}>
              <InputLabel
                htmlFor='budget.accommodation'
                sx={{ color: 'soot.main' }}
                required
              >
                Accommodation
              </InputLabel>
              <TextField
                id='budget.accommodation'
                name='budget.accommodation'
                type='number'
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>$</InputAdornment>
                  )
                }}
                sx={{ marginTop: 2 }}
              />
              <Button
                variant='contained'
                sx={{
                  marginTop: 2,
                  borderRadius: 30,
                  backgroundColor: '#EE8643',

                  ':hover': {
                    backgroundColor: '#ec782d'
                  }
                }}
                startIcon={<Add />}
              >
                Add a place
              </Button>
            </Grid>
            <Grid item xs={12} sm={3}>
              <InputLabel
                htmlFor='budget.food_drinks'
                sx={{ color: 'soot.main' }}
                required
              >
                Food and Drinks
              </InputLabel>
              <TextField
                id='budget.food_drinks'
                name='budget.food_drinks'
                type='number'
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>$</InputAdornment>
                  )
                }}
                sx={{ marginTop: 2 }}
              />
              <Button
                variant='contained'
                sx={{
                  marginTop: 2,
                  borderRadius: 30,
                  backgroundColor: '#EE8643',

                  ':hover': {
                    backgroundColor: '#ec782d'
                  }
                }}
                startIcon={<Add />}
              >
                Add a place
              </Button>
            </Grid>
            <Grid item xs={12} sm={3}>
              <InputLabel
                htmlFor='budget.activities'
                sx={{ color: 'soot.main' }}
                required
              >
                Activities
              </InputLabel>
              <TextField
                id='budget.activities'
                name='budget.activities'
                type='number'
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>$</InputAdornment>
                  )
                }}
                sx={{ marginTop: 2 }}
              />
              <Button
                variant='contained'
                sx={{
                  marginTop: 2,
                  borderRadius: 30,
                  backgroundColor: '#EE8643',

                  ':hover': {
                    backgroundColor: '#ec782d'
                  }
                }}
                startIcon={<Add />}
              >
                Add a place
              </Button>
            </Grid>
            <Grid item xs={12} sm={3}>
              <InputLabel
                htmlFor='budget.transportation'
                sx={{ color: 'soot.main' }}
                required
              >
                Transportation
              </InputLabel>
              <TextField
                id='budget.transportation'
                name='budget.transportation'
                type='number'
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>$</InputAdornment>
                  )
                }}
                sx={{ marginTop: 2 }}
              />
              <Button
                variant='contained'
                sx={{
                  marginTop: 2,
                  borderRadius: 30,
                  backgroundColor: '#EE8643',

                  ':hover': {
                    backgroundColor: '#ec782d'
                  }
                }}
                startIcon={<Add />}
              >
                Add a place
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Box
        sx={{
          marginTop: 4,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end'
        }}
      >
        <Button variant='outlined' color='soot'>
          Cancel
        </Button>
        <Button
          variant='outlined'
          color='tripfare'
          sx={{
            marginLeft: 4
          }}
        >
          Post
        </Button>
      </Box>
    </Box>
  );
}
